export type LabTable = {
  headers: string[];
  rows: string[][];
};

export type LabSection = {
  heading: string;
  body: string;
  table?: LabTable;
  imageUrl?: string;
  imageAlt?: string;
};

export type LabPost = {
  slug: string;
  title: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  githubUrl: string;
  cardImageUrl?: string;
  cardImageAlt?: string;
  docUrl?: string;
  pubUrl?: string;
  content: {
    intro: string;
    sections: LabSection[];
  };
};

export const labPosts: LabPost[] = [
  {
    slug: 'jpa-benchmark',
    title: 'JPA Query Approaches: Method Name vs @Query vs Specification vs EntityManager',
    publishedAt: 'June 07, 2026',
    readTime: '12 min read',
    excerpt:
      'Spring Data JPA gives you four ways to query a database. This project runs all four against the same optional-filter problem, benchmarks them under load, and explains the proxy chain that determines who wins.',
    tags: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'HikariCP', 'PostgreSQL', 'Flyway', 'MapStruct', 'k6', 'Docker'],
    githubUrl: 'https://github.com/junh-ki/jpa-benchmark',
    cardImageUrl: '/assets/projects/jpa-benchmark-arch.png',
    cardImageAlt: 'Spring Data JPA proxy chain diagram',
    content: {
      intro:
        'Spring Data JPA offers four distinct ways to query a database, and most tutorials stop at the first one that works. This project takes all four approaches, runs them against the same problem, and measures what actually happens under load. The question driving it: when you call a Spring Data repository method, what exactly fires? And does the answer change when your query has optional filters?',
      sections: [
        {
          heading: 'The Problem: Optional Filters',
          body: 'All four approaches solve the same query: search product records with up to three optional filters.\n\ncategory, maxPrice, and inStock can each be omitted independently. That "any param might be null" constraint is where the approaches diverge and where the interesting trade-offs appear. The data model is a single product table seeded with 25 rows across five categories: Electronics, Sports, Clothing, Books, Food.\n\nThe same endpoint shape, the same SQL result, but four different paths to get there. Choosing the wrong one for the wrong reason is one of the more common Spring Data pitfalls.',
        },
        {
          heading: 'How Spring Data JPA Routes Every Query',
          body: 'Before looking at individual approaches, it helps to understand what Spring Data is actually doing when you declare a repository interface.\n\nYou never write an implementation of ProductRepository. You declare an interface, and at startup Spring Data generates one using a JDK dynamic proxy. That proxy wraps SimpleJpaRepository, which is Spring Data\'s concrete implementation of JpaRepository.\n\nEvery call to a Spring Data repository method goes through this proxy chain: your interface call -> Spring Data proxy -> SimpleJpaRepository -> EntityManager -> Hibernate -> HikariCP -> PostgreSQL.\n\nAll four approaches reach EntityManager -- it is the single execution point for every JPA query. The approaches only differ in how much work is done before they get there and which layers are traversed. That difference is exactly what shows up in the benchmark numbers.',
          table: {
            headers: ['Approach', 'Hibernate', 'EntityManager', 'Spring Data Proxy', 'SimpleJpaRepository', 'Summary'],
            rows: [
              ['Method Name', 'yes', 'yes', 'yes', 'yes', 'Zero boilerplate for simple queries but requires up to 2^N methods when filters are optional.'],
              ['@Query JPQL', 'yes', 'yes', 'yes', 'yes', 'Single method handles all filter combinations but sends a fixed SQL shape regardless of which params are null.'],
              ['Specification', 'yes', 'yes', 'yes', 'yes', 'Precisely shaped SQL with composable and testable predicates but pays the SimpleJpaRepository overhead on every call.'],
              ['EntityManager', 'yes', 'yes', 'yes', 'no', 'Direct Criteria API with no SimpleJpaRepository overhead but verbose and loses Spring Data conveniences.'],
            ],
          },
          imageUrl: '/assets/projects/jpa-benchmark-arch.png',
          imageAlt: 'Spring Data JPA proxy chain for all four query approaches',
        },
        {
          heading: 'Four Approaches to the Same Query',
          body: 'Method name derivation has Spring Data parse the method name at startup and generate a query from it. No SQL, no JPQL, no manual predicate construction. For three optional filters that means 2^3 = 8 method variants plus service branching logic to call the right one. The query is pre-compiled at startup so runtime cost is just parameter binding. Best for simple, fixed queries.\n\n@Query (JPQL) uses a single annotated JPQL string with IS NULL OR conditions so all three filters are optional without branching. One method, one query, handles all combinations. The trade-off: the query planner always sees all three conditions regardless of how many are actually active, so it cannot build a filter-specific execution plan.\n\nSpecification wraps the JPA Criteria API in composable predicates. Only non-null filters produce predicates, so the SQL sent to PostgreSQL contains exactly the conditions that are active. Each predicate is independently unit-testable and reusable. The cost: every findAll(Specification) call routes through SimpleJpaRepository, which creates a CriteriaBuilder and CriteriaQuery internally before delegating to Hibernate.\n\nEntityManager exposes the layer that Specification and Spring Data delegate to internally. The Criteria API logic lives in a custom repository fragment (ProductRepositoryCustomImpl). No SimpleJpaRepository overhead, no Specification wrapper, direct Hibernate execution. The SQL shape is precisely tailored like Specification but without the proxy layer. Verbose -- the same four lines with Specification is twelve lines here -- but the thinnest possible path from service call to SQL.',
        },
        {
          heading: 'Benchmark Results: What Actually Happened',
          body: 'The k6 load test runs each approach as an independent scenario after a shared warmup phase (10 VUs, 20s per scenario, filters: category=Electronics&inStock=true).\n\nMethod name beating EntityManager is the surprising result. Both produce equivalent SQL. The difference is Java overhead per call: method name does none at runtime (query pre-compiled at startup, cost is just parameter binding), while EntityManager allocates a CriteriaBuilder, CriteriaQuery, Root, and List<Predicate> on every single invocation. That object construction accumulates across thousands of requests.\n\nSpecification being slowest follows directly from the proxy chain. Every findAll(Specification) call goes through SimpleJpaRepository, which runs its own CriteriaBuilder + CriteriaQuery setup before calling spec.toPredicate(). EntityManager skips that layer entirely.\n\nThe sequential /benchmark endpoint tells a different story: method name appears 4x slower than entityManager because it always runs first on a cold JVM. The k6 test with independent warmup-corrected scenarios cuts that gap to under 0.7ms. This is a useful illustration of why microbenchmarks without warmup phases are misleading.',
          table: {
            headers: ['Approach', 'avg', 'p90', 'p95'],
            rows: [
              ['methodName', '1.04ms', '1.41ms', '1.61ms'],
              ['jpqlQuery', '1.25ms', '1.81ms', '2.03ms'],
              ['entityManager', '1.29ms', '1.75ms', '2.06ms'],
              ['specification', '1.70ms', '2.02ms', '2.24ms'],
            ],
          },
        },
        {
          heading: 'Tech Stack',
          body: 'Java 21 · Spring Boot 4.0.6 · Spring Framework 7.0.7 · Spring Data JPA · Hibernate 7.2.12 · HikariCP 7.0.2 · PostgreSQL 17 · Flyway 11 · MapStruct · k6 · Docker',
        },
      ],
    },
  },
  {
    slug: 'stock-orders-api',
    title: 'Reliable Order Processing with the Transactional Outbox Pattern',
    publishedAt: 'May 27, 2026',
    readTime: '10 min read',
    excerpt:
      'Building a stock order API where every accepted order is guaranteed to eventually reach the exchange, without coupling endpoint reliability to exchange availability.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'SQLAlchemy', 'Alembic', 'Pydantic', 'pytest'],
    githubUrl: 'https://github.com/junh-ki/stock-orders-api',
    cardImageUrl: '/assets/projects/stock-orders-arch.png',
    cardImageAlt: 'Stock Orders API architecture diagram',
    content: {
      intro:
        'I built this project to explore the Transactional Outbox Pattern end-to-end. The scenario is a stock order API that must guarantee every accepted order eventually reaches an external exchange, even under exchange failures, while keeping the POST /orders endpoint fast and isolated from exchange latency. The stack is Python 3.13 and FastAPI, backed by PostgreSQL and Redis.',
      sections: [
        {
          heading: 'The Core Tension',
          body: 'Two requirements pull in opposite directions. The first: return 201 only when the order will be placed. The client needs a real guarantee. The second: exchange failures must not impact endpoint reliability. Calling the exchange synchronously would expose POST /orders to its latency and a simulated ~10% failure rate.\n\nCalling place_order synchronously satisfies neither. If the exchange fails you either block the client through retries or return 201 without a real guarantee. The answer is to decouple acceptance from execution.',
        },
        {
          heading: 'Transactional Outbox Pattern',
          body: 'The solution works in three steps. First, the order and a pending exchange_placement record are written atomically in a single PostgreSQL transaction, then 201 is returned. Second, a background consumer pops order IDs from a Redis sorted-set queue and calls place_order with tenacity retries (up to 3 attempts, exponential backoff, 1s/2s). Third, a recovery job runs every 15 seconds and re-enqueues any orders that are persisted in the database but absent from Redis, closing the crash window between COMMIT and ZADD.\n\nAs long as the database write succeeds, the order will eventually reach the exchange. The endpoint itself only fails if PostgreSQL is down.',
          imageUrl: '/assets/projects/stock-orders-arch.png',
          imageAlt: 'Stock Orders API architecture diagram',
        },
        {
          heading: 'Idempotency Design',
          body: 'Every POST /orders requires an Idempotency-Key header (UUID v4). The implementation mirrors Stripe\'s approach: SET NX idempotency:<uuid> "processing" EX 30 acts as an atomic first-writer-wins lock. Concurrent duplicates get a 409 Conflict immediately. After commit the lock is replaced with the real order_id (TTL 24h). A companion key stores a SHA-256 hash of the request body; reusing the same key with a different body returns 422.\n\nThe key is written to Redis before commit (after db.flush()) rather than after. Saving after commit leaves a crash window where the next retry would re-create the order.',
        },
        {
          heading: 'Concurrency and Pessimistic Locking',
          body: 'The recovery job can re-enqueue an order that the consumer already popped but has not yet committed. To prevent double processing, process_order_placement uses SELECT FOR UPDATE via SQLAlchemy\'s with_for_update(). The first thread locks the row and proceeds; the second blocks until the first commits, then sees status = completed and skips.\n\nThe background consumer itself is a pure dispatcher: it blocks on BZPOPMIN, submits the processing work to a ThreadPoolExecutor(max_workers=5), and loops back immediately. This keeps the consumer free to pop the next entry while exchange calls are in flight.',
        },
        {
          heading: 'Tech Stack',
          body: 'Python 3.13 · FastAPI · PostgreSQL · SQLAlchemy · Alembic · Redis · Pydantic · tenacity · pytest · Docker',
        },
      ],
    },
  },
  {
    slug: 'meeting-scheduler',
    title: 'Calendar Mechanics: Building a Meeting Scheduler API',
    publishedAt: 'June 04, 2026',
    readTime: '10 min read',
    excerpt:
      'A scheduling API with timeslot auto-merge, slot splitting on booking, race-safe concurrent writes, and async at-least-once notification delivery via the Transactional Outbox Pattern.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'Flyway', 'OpenFeign', 'Resilience4j', 'Spring Data JPA', 'MapStruct', 'OpenAPI'],
    githubUrl: 'https://github.com/junh-ki/meeting-scheduler',
    cardImageUrl: '/assets/projects/meeting-scheduler-arch.png',
    cardImageAlt: 'Meeting Scheduler architecture diagram',
    content: {
      intro:
        'I wanted to build a scheduling API that goes beyond thin CRUD. One that models calendar reality: contiguous availability, automatic merge when adjacent slots are published, clean slot restoration when a meeting is cancelled, and safety under concurrent writes. On top of that, meeting events trigger async notifications delivered with at-least-once guarantees using the Transactional Outbox Pattern. The result is a Spring Boot REST API backed by PostgreSQL and Redis, with Flyway migrations and a layered domain design.',
      sections: [
        {
          heading: 'Data Model: A Calendar Is Just a Collection of Timeslots',
          body: 'Rather than a separate calendar table (a one-to-one with the user that adds a join with no behavioural benefit), a user\'s calendar is simply their collection of timeslots. The schema stays flat, and the calendar view is a scoped query: GET /users/{id}/timeslots?status=FREE&from=...&to=... . All queries are filtered to a single owner_id, so there are no full-table scans.\n\nFour domain packages handle the core logic (timeslot, meeting, participant, and user), each with its own controller, service, repository, entity, mapper, and DTOs. Domain exceptions (NotFoundException, ConflictException, ForbiddenException) carry no HTTP dependency and are mapped centrally in a @RestControllerAdvice.',
        },
        {
          heading: 'Timeslot Merge and Slot Splitting',
          body: 'Two non-trivial behaviours drive the calendar mechanics.\n\nMerge on creation: when a new FREE slot is adjacent to or overlaps an existing FREE slot for the same user, they are automatically merged into one. This keeps the calendar contiguous. A single row represents a block of free time rather than a fragmented list of adjacent entries.\n\nSplit on booking: when a meeting is booked, each participant\'s covering FREE slot is split into up to three pieces: a FREE left remainder, a BOOKED slot for the exact meeting range, and a FREE right remainder. Meeting deletion reverses this: the BOOKED slot is restored to FREE and the same merge logic runs, returning each calendar to exactly the contiguous state it was in before the meeting was booked.',
        },
        {
          heading: 'Async Notification Delivery',
          body: 'When a meeting is created or deleted, a PENDING notification row is written to the database in the same transaction as the business operation. This ensures the intent to notify is never lost even if the application crashes immediately after commit. After the transaction commits, the service makes a best-effort enqueue into a Redis sorted set so consumers can process the notification right away.\n\nScheduled producers run every 10 seconds and re-enqueue any rows still in PENDING state, acting as a recovery net for Redis outages or missed fast-path enqueues. Consumers process each notification concurrently via a thread pool and mark it COMPLETED on success, or FAILED with the error message if the Feign call fails after Resilience4j retries (up to 3 attempts, exponential backoff). A FakeNotificationService stands in for the real downstream endpoint, making the full delivery flow testable locally without external dependencies.',
          imageUrl: '/assets/projects/meeting-scheduler-arch.png',
          imageAlt: 'Meeting Scheduler transactional outbox architecture diagram',
        },
        {
          heading: 'Concurrency Design',
          body: 'Three layers protect against concurrent slot operations.\n\nFirst, a pessimistic write lock (SELECT FOR UPDATE) on the user row at timeslot creation time serialises all slot writes per user so overlap checks are race-free. Second, timeslot deletion acquires a pessimistic write lock on the timeslot row itself, closing a window where a concurrent createMeeting could book the slot between the FREE status check and the deletion. Without the lock, the meeting would reference a deleted row. Third, UNIQUE constraints on (owner_id, start_time, end_time) in timeslot and (organizer_id, start_time, end_time) in meeting serve as a last-resort safety net for any request that slips through the application-level checks.\n\nIndexes on timeslot(owner_id, start_time, end_time) and timeslot(owner_id, status) keep availability queries fast regardless of total row count. Duplicate meeting detection runs before the N+1 timeslot availability checks, so conflicting requests fail fast without unnecessary database work.',
        },
        {
          heading: 'Tech Stack',
          body: 'Java 21 · Spring Boot 4 · Spring Data JPA · PostgreSQL · Flyway · Redis · Spring Data Redis · OpenFeign · Resilience4j · MapStruct · Lombok · springdoc-openapi · Docker',
        },
      ],
    },
  },
  {
    slug: 'spring-ai-lab',
    title: 'LLM Pipelines with Spring AI and Langfuse',
    publishedAt: 'April 23, 2026',
    readTime: '7 min read',
    excerpt:
      'A hands-on playground for Spring AI: wiring up chat memory, RAG pipelines, tool-using agents, and full LLM observability with Langfuse tracing.',
    tags: ['Java', 'Spring Boot', 'Spring AI', 'Langfuse', 'Docker', 'Ollama', 'OpenTelemetry', 'Redis'],
    githubUrl: 'https://github.com/junh-ki/spring-ai-lab',
    cardImageUrl: '/assets/projects/spring-ai-arch.png',
    cardImageAlt: 'Spring AI platform architecture overview',
    content: {
      intro:
        'I built this playground to move beyond reading the Spring AI docs and actually wire things up end-to-end: chat with conversation memory, RAG over PDF documents, a tool-using agent, and full LLM observability via Langfuse. The project runs entirely locally with Ollama and can switch to OpenAI or AWS Bedrock via Maven profiles without touching application code.',
      sections: [
        {
          heading: 'What I Explored',
          body: 'Four distinct capabilities are accessible over HTTP. Chat with memory (GET /ai/generate) uses MessageChatMemoryAdvisor so the same chatId shares conversation history across calls; a different chatId gets a fully isolated session. A RAG pipeline (GET /support) ingests PDFs into a vector store and returns grounded answers at query time. Poem generation (GET /poem) demonstrates a simple prompt template. A tool-using agent (GET /agent/chat) can call registered tools, like a flight lookup, as part of its response generation.\n\nAll endpoints are secured with Basic Auth in the dev profile (user/demo), keeping the setup self-contained and reproducible.',
        },
        {
          heading: 'LLM Observability with Langfuse',
          body: 'The Spring app emits OTLP spans via the Spring AI observation layer → Micrometer → OpenTelemetry SDK → BatchSpanProcessor, delivered over HTTP to a local Langfuse stack. Langfuse captures every model call (prompts, completions, tool invocations, retrievals, token counts, latencies) and surfaces them in a structured trace UI.\n\nThe full stack (Langfuse web and worker, PostgreSQL for metadata and prompts, ClickHouse for high-volume event data, MinIO for raw blobs, Redis as a queue) runs as a separate Docker Compose project. Keeping it isolated means trace data and project keys survive application restarts. This gave me a real sense of what production LLM observability looks like: not just log lines, but hierarchical spans grouped by conversation session.',
          imageUrl: '/assets/projects/spring-ai-arch.png',
          imageAlt: 'Spring AI platform architecture overview',
        },
        {
          heading: 'Provider Flexibility',
          body: 'Provider switching is handled via Maven profiles and environment variables, with no code changes needed. The default dev-ollama profile pulls Llama 3.2 (1b) and nomic-embed-text locally via Ollama, small enough to run within typical Docker RAM limits. Switching to prod-openai just requires setting OPENAI_API_KEY and the matching profile. AWS Bedrock (prod-bedrock) uses bedrock-converse with standard AWS credentials.\n\nThe start-demo.sh script automates the full local setup: it starts Redis and Ollama via Docker Compose, waits for both to be healthy, pulls the models, and launches the Spring app with the dev profile. Ctrl+C tears everything down cleanly.',
        },
        {
          heading: 'Tech Stack',
          body: 'Java 21 · Spring Boot · Spring AI · Langfuse · Ollama · Redis · OpenTelemetry · Micrometer · Docker',
        },
      ],
    },
  },
  {
    slug: 'dias-kuksa',
    title: 'Vehicle-to-Cloud Diagnostics with Eclipse KUKSA',
    publishedAt: 'June 15, 2021',
    readTime: '6 min read',
    excerpt:
      'An end-to-end system connecting in-vehicle CAN bus data to cloud-based visualization for NOx emission diagnostics, published at Eclipse Foundation SAAM Mobility 2021.',
    tags: ['Python', 'Java', 'Docker', 'Eclipse KUKSA', 'InfluxDB', 'Grafana', 'CAN bus', 'IoT'],
    githubUrl: 'https://github.com/junh-ki/dias_kuksa',
    cardImageUrl: '/assets/projects/dias-kuksa-arch.png',
    cardImageAlt: 'DIAS-KUKSA vehicle-to-cloud connectivity diagram',
    docUrl: 'https://dias-kuksa-doc.readthedocs.io/en/latest/',
    pubUrl: 'https://ceur-ws.org/Vol-3028/D2-02-ESAAMM_2021_paper_3.pdf',
    content: {
      intro:
        'I explored vehicle-to-cloud connectivity by building an end-to-end diagnostic system under the Eclipse KUKSA ecosystem. The system routes raw CAN bus signals from inside a vehicle through KUKSA.val to a cloud tier for real-time NOx anti-tampering analysis. The work was published at Eclipse Foundation SAAM Mobility 2021 and received the Best Paper Award.',
      sections: [
        {
          heading: 'Context: SCR Anti-Tampering in Heavy Vehicles',
          body: 'Selective Catalytic Reduction (SCR) systems reduce NOx emissions in diesel heavy vehicles. Tampering with these systems to pass inspections while emitting illegal levels of NOx is a known problem in commercial fleets. The DIAS project aimed to build diagnostic tooling that detects this tampering using existing vehicle telematics infrastructure, without requiring new hardware.',
        },
        {
          heading: 'Architecture: In-Vehicle to Cloud',
          body: 'The system has two tiers. In-vehicle: Eclipse KUKSA.val acts as the vehicle data broker. A J1939/DBC feeder parses raw CAN frames and publishes the decoded signals to KUKSA.val. A cloud feeder component then streams those signals to the cloud tier over MQTT/WebSocket.\n\nCloud tier: a Hono telemetry receiver collects the incoming vehicle signals, stores time-series data in InfluxDB, and exposes real-time anti-tampering dashboards via Grafana. The entire cloud stack runs containerised via Docker Compose for local development.\n\nA canplayer utility provides Python scripts to modify and replay recorded CAN trace log files, enabling development and testing without a physical vehicle on hand.',
          imageUrl: '/assets/projects/dias-kuksa-arch.png',
          imageAlt: 'DIAS-KUKSA vehicle-to-cloud connectivity diagram',
        },
        {
          heading: 'Research Outcome',
          body: 'The diagnostic proof-of-concept was presented at the Eclipse Foundation Software Architecture and AI for Mobility (SAAM) workshop in 2021. The paper "Eclipse KUKSA.val for SCR Anti-Tampering Monitoring in Heavy Vehicles" was published in CEUR-WS Vol. 3028 and received the Best Paper Award at the workshop.',
        },
        {
          heading: 'Tech Stack',
          body: 'Python · Java · Eclipse KUKSA.val · Docker · InfluxDB · Grafana · Eclipse Hono · CAN bus / J1939 / DBC',
        },
      ],
    },
  },
];
