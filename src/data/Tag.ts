export type TagModel = {
  key: string;
  color: string;
};

export const Tag: Record<string, TagModel> = {
  TYPESCRIPT: { key: 'TypeScript', color: 'darkred' },
  JAVASCRIPT: { key: 'JavaScript', color: 'orange' },
  JAVA: { key: 'Java', color: 'orange' },
  GO: { key: 'Go', color: 'grey' },
  PYTHON: { key: 'Python', color: 'pink' },
  NODEJS: { key: 'Node.JS', color: 'brown' },
  CSHARP: { key: 'C#', color: 'green' },
  ASPNET: { key: 'ASP.NET', color: 'purple' },
  ANGULAR: { key: 'Angular', color: 'red' },
  REACT: { key: 'React', color: 'darkred' },
  VUE: { key: 'VUE', color: 'crimson' },
  SPRING: { key: 'Spring Boot', color: 'firebrick' },
  DJANGO: { key: 'Django', color: 'darkgreen' },
  FASTAPI: { key: 'FastAPI', color: 'teal' },
  REDIS: { key: 'Redis', color: 'crimson' },
  POSTGRESQL: { key: 'PostgreSQL', color: 'steelblue' },
  FLYWAY: { key: 'Flyway', color: 'darkorange' },
  DOCKER: { key: 'Docker', color: 'dodgerblue' },
  SPRING_AI: { key: 'Spring AI', color: 'forestgreen' },
  LANGFUSE: { key: 'Langfuse', color: 'purple' },
  SQLALCHEMY: { key: 'SQLAlchemy', color: 'darkslategray' },
  ALEMBIC: { key: 'Alembic', color: 'slategray' },
  QUARKUS: { key: 'Quarkus', color: 'darkblue' },
  INFLUXDB: { key: 'InfluxDB', color: 'blueviolet' },
  GRAFANA: { key: 'Grafana', color: 'darkorange' },
  OPENAPI: { key: 'OpenAPI', color: 'darkgreen' },
};

