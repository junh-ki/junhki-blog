# Infrastructure Migration Plan

Transition from GoDaddy-managed DNS + GitHub Pages to a fully AWS-provisioned, multi-domain, eventually dynamic stack.

---

## Repository Strategy

### Why two repos, not one

A monorepo (frontend + backend + Terraform all here) is technically possible, but it would force you to make this repo **private** to protect infrastructure details (AWS account IDs, ARNs, resource names) and backend logic.
That defeats the purpose of a public portfolio.

The recommended split:

| Repo | Visibility | Contents |
|------|------------|----------|
| `junhki-blog` (this repo) | **Public** | React/Vite frontend, GitHub Actions for S3 deploy |
| `junhki-infra` (new repo) | **Private** | Terraform (DNS, CDN, cert, backend) + Lambda source code |

Terraform and Lambda live together in `junhki-infra` because Terraform is what packages and deploys the Lambda; they are tightly coupled.
Keeping them in the same repo means one `terraform apply` handles both infrastructure and the function code, with no cross-repo coordination needed.

### `junhki-infra` layout

```
junhki-infra/
  lambda/
    handler.go          # or handler.java / handler.js
    go.mod
    Makefile            # builds the zip artifact Terraform uploads
  terraform/
    main.tf
    variables.tf
    outputs.tf
    terraform.tfvars    # gitignored, holds secrets/account-specific values
    modules/
      dns/              # Route 53 hosted zones + records
      cert/             # ACM certificate + DNS validation
      cdn/              # S3 bucket, OAC, CloudFront distribution
      api/              # API Gateway, Lambda function, IAM roles
      db/               # DynamoDB tables (Phase 3)
  .github/
    workflows/
      deploy.yml        # terraform plan on PR, terraform apply on merge to main
```

### How the two repos interact

```
junhki-blog (public)          junhki-infra (private)
      |                               |
      | npm run build                 | terraform apply
      | → docs/                       | → provisions S3 bucket, CloudFront,
      |                               |   Route 53, ACM, Lambda, API Gateway
      | GitHub Actions                |
      | → aws s3 sync docs/ s3://...  | GitHub Actions
      |   (needs bucket name from     | → terraform plan (on PR)
      |    infra outputs)             | → terraform apply (on merge)
```

The only coupling between the two repos is the S3 bucket name and CloudFront distribution ID, which `junhki-infra` exposes as Terraform outputs.
Store those as GitHub Actions secrets in `junhki-blog`.

---

## Current State

| Concern      | Provider       | Detail                              |
|--------------|----------------|-------------------------------------|
| Hosting      | GitHub Pages   | `docs/` folder, CNAME = www.junhki.de |
| DNS          | GoDaddy        | A/CNAME records for www.junhki.de   |
| TLS          | GitHub Pages   | Auto-provisioned, single domain     |
| Domains held | GoDaddy        | junhki.de (confirmed active)        |

---

## Target State

| Concern      | Provider            | Detail                                               |
|--------------|---------------------|------------------------------------------------------|
| Hosting      | S3 + CloudFront     | Single origin, 6 domain aliases, HTTPS everywhere    |
| DNS          | AWS Route 53        | Hosted zones for .de, .com                          |
| TLS          | AWS ACM             | Wildcard/multi-SAN cert, auto-renewed                |
| Backend      | API Gateway + ECS   | Added in Phase 3 when dynamic features are needed    |
| IaC          | Terraform           | Manages all AWS resources from Phase 2 onward        |

### Domains to enable

```
https://junhki.de          https://www.junhki.de
https://junhki.com         https://www.junhki.com
```

All non-www variants redirect to their `www` counterpart (or vice versa; choose one canonical form and redirect the other).

---

## Phase 1: DNS Migration to AWS Route 53

**Goal:** Replace GoDaddy name servers with Route 53.
No hosting change yet; GitHub Pages keeps serving the site.

### 1.1 Create Route 53 hosted zones

Create one public hosted zone per domain.
Route 53 will generate four name server (NS) records per zone; note them down.

```
junhki.de       → Hosted Zone
junhki.com      → Hosted Zone   (register or transfer via Route 53 Registrar)
```

### 1.2 Update nameservers at each registrar

| Domain      | Registrar action                                      |
|-------------|-------------------------------------------------------|
| junhki.de   | GoDaddy → Domains → DNS → Nameservers → Custom → paste Route 53 NS |
| junhki.com  | Transfer to Route 53 registrar **or** same nameserver swap at GoDaddy |

Propagation takes up to 48 hours.
Verify with:
```bash
dig NS junhki.de +short
dig NS junhki.com +short
```

### 1.3 Recreate existing DNS records in Route 53

While GitHub Pages is still the host, recreate whatever GoDaddy had:

```
Type  Name            Value
A     @               185.199.108.153   (GitHub Pages IPs, all four)
A     @               185.199.109.153
A     @               185.199.110.153
A     @               185.199.111.153
CNAME www             <github-username>.github.io
```

GitHub Pages will continue to serve `www.junhki.de` without interruption.

---

## Phase 2: Multi-Domain Static Hosting on S3 + CloudFront

**Goal:** Move away from GitHub Pages, host the `docs/` build on S3, front it with CloudFront, and attach all six domain aliases.
GitHub Pages cannot serve multiple custom domains from a single repo, so CloudFront is the switch-point.

### 2.1 S3: origin bucket

- Create a private S3 bucket (e.g. `junhki-blog-origin`). No public access.
- Upload the contents of `docs/` to the bucket.
- Do **not** enable S3 static website hosting; CloudFront will serve directly via Origin Access Control (OAC).

CI/CD sync command (add to GitHub Actions after the existing build step):
```bash
aws s3 sync docs/ s3://junhki-blog-origin/ --delete
```

### 2.2 ACM certificate

ACM certificates used by CloudFront **must** be in `us-east-1`.

Request a single certificate with these SANs:
```
junhki.de        www.junhki.de
junhki.com       www.junhki.com
```

Use DNS validation.
ACM will give you CNAME records; add them to the Route 53 hosted zones (one record per domain).
ACM auto-renews as long as those CNAME records exist.

### 2.3 CloudFront distribution

| Setting                  | Value                                          |
|--------------------------|------------------------------------------------|
| Origin                   | S3 bucket via OAC                              |
| Alternate domain names   | All four domains listed above                  |
| SSL certificate          | The ACM cert from 2.2                          |
| Default root object      | `index.html`                                   |
| Error pages (403, 404)   | Redirect to `/index.html` with 200 status       |
| Price class              | Use All Edge Locations (or Europe + NA only to cut cost) |
| HTTP → HTTPS             | Redirect all HTTP to HTTPS                     |

The 403/404 → `index.html` override is needed so that HashRouter deep-links (`#/blog`, `#/portfolio`, etc.) survive a direct URL load or refresh.

### 2.4 Route 53: point all zones to CloudFront

In each hosted zone, add an alias A record and alias AAAA record pointing to the CloudFront distribution domain (`d<id>.cloudfront.net`).

```
junhki.de      A  ALIAS  d<id>.cloudfront.net
www.junhki.de  A  ALIAS  d<id>.cloudfront.net

junhki.com     A  ALIAS  d<id>.cloudfront.net
www.junhki.com A  ALIAS  d<id>.cloudfront.net
```

Alias records are free and resolve at AWS anycast speed.
Do not use CNAME for apex domains (e.g. `junhki.de`); Route 53 alias is the correct alternative.

### 2.5 Canonical-domain redirect

Decide on one canonical form (e.g. `www.junhki.de`). For the non-canonical domains you can either:

- **CloudFront Function (recommended):** A lightweight JS function on the viewer request event that issues a 301 to the canonical domain. Attach it to the same distribution.
- **Separate CloudFront distributions:** One per apex domain that only does a redirect. More overhead, but cleaner separation.

### 2.6 Remove the GitHub Pages CNAME and custom domain

Once CloudFront is serving all domains correctly, remove the custom domain from the GitHub Pages repo settings.
The `docs/CNAME` file and `public/CNAME` file can be deleted from the repo.

### 2.7 Terraform: IaC for Phase 2

All resources below live in `junhki-infra/terraform/`.

**Bootstrap (one-time, done manually before `terraform init`):**

```bash
# Create the state bucket and lock table (never managed by Terraform itself)
aws s3api create-bucket --bucket junhki-tf-state --region eu-central-1 \
  --create-bucket-configuration LocationConstraint=eu-central-1
aws s3api put-bucket-versioning --bucket junhki-tf-state \
  --versioning-configuration Status=Enabled
aws dynamodb create-table --table-name junhki-tf-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST --region eu-central-1
```

**`terraform/main.tf`: provider and backend config**

```hcl
terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket         = "junhki-tf-state"
    key            = "blog/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "junhki-tf-locks"
    encrypt        = true
  }
}

# Default provider for most resources (eu-central-1 is closest to .de audience)
provider "aws" {
  region = "eu-central-1"
}

# ACM and CloudFront require us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
```

**Key resources per module:**

| Module | Main resources |
|--------|----------------|
| `dns/` | `aws_route53_zone` (x2), `aws_route53_record` for alias A records |
| `cert/` | `aws_acm_certificate` (in us-east-1), `aws_route53_record` for DNS validation, `aws_acm_certificate_validation` |
| `cdn/` | `aws_s3_bucket`, `aws_cloudfront_origin_access_control`, `aws_cloudfront_distribution`, `aws_s3_bucket_policy` |

**`terraform/outputs.tf`: values consumed by `junhki-blog` CI**

```hcl
output "s3_bucket_name" {
  value = module.cdn.bucket_name
}

output "cloudfront_distribution_id" {
  value = module.cdn.distribution_id
}
```

**GitHub Actions in `junhki-blog` reads these as secrets:**

```yaml
- name: Deploy to S3
  run: aws s3 sync docs/ s3://${{ secrets.S3_BUCKET_NAME }}/ --delete

- name: Invalidate CloudFront cache
  run: |
    aws cloudfront create-invalidation \
      --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
      --paths "/*"
```

---

## Phase 3: Dynamic Backend

**Goal:** Add a backend so content (blog posts, comments, contact form, etc.) can be served dynamically without a static rebuild.

### Option A - Lightweight: API Gateway + Lambda (serverless)

Best for: comment system, contact form, Spring AI integration, low-to-moderate traffic.

```
Browser → CloudFront → /api/* → API Gateway → Lambda (Go or Java Spring)
                     ↘ /* → S3 origin (static assets)
```

- Add a second CloudFront origin pointing to the API Gateway invoke URL.
- Use a Cache Behavior for `/api/*` with `Cache-Control: no-cache` to bypass CloudFront caching for API calls.
- Lambda cold starts can be reduced with Provisioned Concurrency or by switching to Lambda SnapStart (Java) or keeping the handler in Go.

### Option B - Full server: ECS Fargate

Best for: when the Go backend needs persistent connections, WebSockets, or more control than Lambda allows.

```
Browser → CloudFront → /api/* → ALB → ECS Fargate (Go / Spring Boot)
                     ↘ /* → S3 origin (static assets)
```

- Application Load Balancer (ALB) fronts the ECS service.
- CloudFront origin group or path-based behavior routes `/api/*` to the ALB.
- ECS task definition pulls from ECR; deploy via GitHub Actions on push to main.

### 3.1 Database

| Use case              | Recommendation                          |
|-----------------------|-----------------------------------------|
| Blog posts (metadata) | DynamoDB (serverless, pay-per-request)  |
| Comments              | DynamoDB or RDS PostgreSQL              |
| Full-text search      | OpenSearch Serverless or DynamoDB + GSI |

### 3.2 Auth (if needed for admin)

AWS Cognito User Pool + JWT verification in the backend, or a simple API key passed via `Authorization` header for low-security admin operations.

### 3.3 Terraform additions for Phase 3

```
infra/terraform/modules/
  backend/    # ECS cluster, task def, ALB, ECR repo  (Option B)
  api/        # API Gateway, Lambda, IAM roles         (Option A)
  db/         # DynamoDB tables or RDS cluster
  auth/       # Cognito user pool (optional)
```

---

## Phase 4: Observability and Hardening

Once the dynamic stack is live:

- **CloudFront access logs** → S3 → Athena (query traffic patterns)
- **CloudWatch alarms** on 5xx error rate and Lambda/ECS latency
- **WAF** on the CloudFront distribution (at minimum: rate limiting, geo-block
  if needed, OWASP managed rules)
- **Route 53 health checks** with failover routing if multi-region is ever added
- **Cost alerts** via AWS Budgets

---

## Migration Checklist

### Phase 1
- [ ] Create Route 53 hosted zone for junhki.de
- [ ] Create Route 53 hosted zone for junhki.com
- [ ] Recreate existing DNS records in both zones
- [ ] Update nameservers at GoDaddy (junhki.de, junhki.com)
- [ ] Verify propagation with `dig NS` for both domains

### Phase 2
- [ ] Create S3 origin bucket (private, OAC)
- [ ] Request ACM certificate in us-east-1 with all 4 SANs
- [ ] Add ACM DNS validation CNAME records to Route 53
- [ ] Create CloudFront distribution with S3 origin
- [ ] Attach all 4 alternate domain names to distribution
- [ ] Add Route 53 alias A records for all 4 domains
- [ ] Implement canonical-domain redirect (CloudFront Function)
- [ ] Update GitHub Actions to sync `docs/` to S3 after build
- [ ] Smoke-test all 4 URLs
- [ ] Remove GitHub Pages custom domain and CNAME files
- [ ] Write Terraform for all Phase 2 resources
- [ ] Import or recreate resources under Terraform state

### Phase 3
- [ ] Choose backend model (Lambda vs ECS)
- [ ] Scaffold backend project (Go or Spring Boot)
- [ ] Add `/api/*` behavior to CloudFront
- [ ] Set up DynamoDB or RDS
- [ ] Add GitHub Actions workflow for backend deploy
- [ ] Write Terraform for all Phase 3 resources

### Phase 4
- [ ] Enable CloudFront access logs
- [ ] Set up CloudWatch alarms (5xx, latency)
- [ ] Attach WAF to CloudFront
- [ ] Configure AWS Budgets alert

---

## Cost Estimates (rough, monthly)

| Service              | Phase 2           | Phase 3 (Option A) | Phase 3 (Option B) |
|----------------------|-------------------|--------------------|--------------------|
| Route 53 hosted zones| $1.50 x 2 = $3.00 | $3.00              | $3.00              |
| Route 53 queries     | ~$0.10            | ~$0.10             | ~$0.10             |
| S3 storage + requests| < $1              | < $1               | < $1               |
| CloudFront           | < $1 (low traffic)| < $1               | < $1               |
| ACM                  | Free              | Free               | Free               |
| Lambda / ECS Fargate | -                 | Pay-per-request    | ~$10-30            |
| DynamoDB             | -                 | ~$0-5              | ~$0-5              |
| **Total**            | **~$6/mo**        | **~$7-12/mo**      | **~$17-40/mo**     |

Traffic is currently low so all estimates sit near the lower bound.
