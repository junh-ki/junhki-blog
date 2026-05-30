export type LabSection = {
  heading: string;
  body: string;
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
    slug: 'stock-orders-api',
    title: 'Reliable Order Processing with the Transactional Outbox Pattern',
    publishedAt: '2026-05-01',
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
    publishedAt: '2026-04-01',
    readTime: '8 min read',
    excerpt:
      'Exploring the data modeling challenges of a real scheduling API: timeslot auto-merge, slot splitting on booking, and race-safe concurrent writes.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Flyway', 'Docker', 'Spring Data JPA', 'MapStruct', 'OpenAPI'],
    githubUrl: 'https://github.com/junh-ki/meeting-scheduler',
    content: {
      intro:
        'I wanted to build a scheduling API that goes beyond thin CRUD. One that models calendar reality: contiguous availability, automatic merge when adjacent slots are published, clean slot restoration when a meeting is cancelled, and safety under concurrent writes. The result is a Spring Boot REST API backed by PostgreSQL, with Flyway migrations and a layered domain design.',
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
          heading: 'Concurrency Design',
          body: 'Two layers protect against concurrent slot writes for the same user. First, a pessimistic write lock (SELECT FOR UPDATE) is taken on the user row at timeslot creation time, serialising all slot writes per user so the overlap check is race-free. Second, UNIQUE constraints on (owner_id, start_time, end_time) in timeslot and (organizer_id, start_time, end_time) in meeting serve as a last-resort safety net for any request that slips through the application-level check.\n\nIndexes on timeslot(owner_id, start_time, end_time) and timeslot(owner_id, status) keep availability queries fast regardless of total row count.',
        },
        {
          heading: 'Tech Stack',
          body: 'Java 21 · Spring Boot 4 · Spring Data JPA · PostgreSQL · Flyway · MapStruct · Lombok · springdoc-openapi · Docker',
        },
      ],
    },
  },
  {
    slug: 'spring-ai-lab',
    title: 'LLM Pipelines with Spring AI and Langfuse',
    publishedAt: '2026-03-01',
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
    publishedAt: '2021-06-01',
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
