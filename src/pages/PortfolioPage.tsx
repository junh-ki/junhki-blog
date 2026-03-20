import { useEffect } from 'react';

export default function PortfolioPage(): JSX.Element {
  useEffect((): void => {
    document.title = 'Portfolio | JunhKi';
  }, []);

  return (
    <div className="container pb-4">
      <section className="cv-section shadow-sm border rounded-3 p-4 p-md-5 mb-4">
        <h2 className="mb-2">Professional Summary</h2>
        <p className="text-secondary mb-0">
          Software engineer with 5+ years of experience delivering backend and full-stack systems across insurance, travel, automotive, and startup environments. Strong focus on Java backend systems (Quarkus and Spring Boot), multi-tenant cloud-native architecture, and long-term maintainability through clean engineering practices. Experienced with PostgreSQL/jOOQ data access and React/TypeScript frontend delivery.
        </p>
      </section>

      <section className="cv-section shadow-sm border rounded-3 p-4 p-md-5 mb-4">
        <h3 className="mb-4">Experience</h3>
        <div className="cv-timeline">
          <article className="cv-timeline-item">
            <div className="cv-timeline-meta">Sep 2025 - Present</div>
            <h5 className="mb-1">Software Engineer - KoSyMa GmbH</h5>
            <p className="text-secondary mb-0">Delivered a multi-tenant backend/frontend suite with Matrix + Gematik specification compliance using Quarkus. Migrated S3-backed single-tenancy persistence to PostgreSQL with jOOQ/Flyway, improved Docker/Kubernetes deployments, built React/TypeScript web clients for user and administration flows, and strengthened reliability with Playwright-driven verification using the Gematik specification test suite and a custom test driver. Mentored developers and improved delivery velocity with local debug/test automation tools and weekly engineering talks.</p>
          </article>
          <article className="cv-timeline-item">
            <div className="cv-timeline-meta">Apr 2024 - Sep 2025</div>
            <h5 className="mb-1">Java Fullstack Developer - HDI AG</h5>
            <p className="text-secondary mb-0">Built global insurance platform features with Spring Boot, led AI-assisted legacy document migration, and refactored DTO/data-access layers for scalability and maintainability.</p>
          </article>
          <article className="cv-timeline-item">
            <div className="cv-timeline-meta">Jun 2021 - Apr 2024</div>
            <h5 className="mb-1">Java Backend Developer - Holidu GmbH</h5>
            <p className="text-secondary mb-0">Developed SEO platform features with Spring Boot, async keyword/ads data pipelines, internal CMS tooling, and observability systems. Supported migration from monolith to microservices.</p>
          </article>
          <article className="cv-timeline-item">
            <div className="cv-timeline-meta">Jul 2020 - May 2021</div>
            <h5 className="mb-1">Master&apos;s Thesis Intern - Robert Bosch GmbH</h5>
            <p className="text-secondary mb-0">Implemented an anti-tampering diagnostic PoC from CAN data capture to cloud visualization and contributed to an award-winning mobility paper.</p>
          </article>
          <article className="cv-timeline-item">
            <div className="cv-timeline-meta">Mar 2019 - Mar 2020</div>
            <h5 className="mb-1">Research Assistant - Fachhochschule Dortmund</h5>
            <p className="text-secondary mb-0">Developed analysis tooling for real-time automotive systems, participated in Google Summer of Code 2019, and co-authored conference publications.</p>
          </article>
        </div>
      </section>

      <section className="cv-section shadow-sm border rounded-3 p-4 p-md-5 mb-4">
        <h3 className="mb-4">Core Skills</h3>
        <div className="row g-3">
          <div className="col-md-6 col-lg-3">
            <div className="cv-skill-card">
              <h6>Backend</h6>
              <p className="text-secondary mb-0">Java, Spring Boot, Quarkus, jOOQ, Flyway, Kafka, JobRunr, Maven/Gradle</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="cv-skill-card">
              <h6>Frontend</h6>
              <p className="text-secondary mb-0">React, TypeScript, JavaScript, Angular/Nx, Playwright, Cypress</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="cv-skill-card">
              <h6>Cloud and DevOps</h6>
              <p className="text-secondary mb-0">AWS, AWS CDK, Azure, Docker, Kubernetes, Helm, Jenkins, GitHub Actions, ArgoCD</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="cv-skill-card">
              <h6>Data and Observability</h6>
              <p className="text-secondary mb-0">PostgreSQL, Redis, Elasticsearch, Grafana, Kibana, Logstash</p>
            </div>
          </div>
        </div>
      </section>

      <div className="row g-3">
        <section className="col-lg-6">
          <div className="cv-section shadow-sm border rounded-3 p-4 h-100">
            <h4 className="mb-3">Education</h4>
            <div className="mb-3">
              <h6 className="mb-1">M.Eng in Embedded Systems</h6>
              <p className="text-secondary mb-1">Fachhochschule Dortmund, Germany</p>
              <small className="text-secondary">Oct 2018 - Apr 2021 | CGPA 1.6 (German scale)</small>
            </div>
            <div>
              <h6 className="mb-1">B.Sc in Mechatronics Engineering</h6>
              <p className="text-secondary mb-1">Korea Polytechnic University, South Korea</p>
              <small className="text-secondary">Mar 2010 - Feb 2018 | CGPA 3.5 (Korean scale)</small>
            </div>
          </div>
        </section>
        <section className="col-lg-6">
          <div className="cv-section shadow-sm border rounded-3 p-4 h-100">
            <h4 className="mb-3">Publications and Honors</h4>
            <ul className="mb-0 ps-3">
              <li className="mb-2">
                Eclipse KUKSA.val for SCR Anti-Tampering Monitoring in Heavy Vehicles (2021)
              </li>
              <li className="mb-2">
                CPU-GPU Response Time and Mapping Analysis for High-Performance Automotive Systems (2019)
              </li>
              <li className="mb-0">
                Best Paper Award - Eclipse Foundation SAAM Mobility (2021)
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}


