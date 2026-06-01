import { JSX } from 'react';

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer mt-4">
      <div className="container d-flex align-items-center justify-content-between flex-wrap gap-2 py-3">
        <small className="text-secondary">© {year} Junhyung Ki</small>
        <div className="d-flex gap-3">
          <a
            href="https://github.com/junh-ki"
            target="_blank"
            rel="noreferrer"
            className="text-secondary text-decoration-none footer-link"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/junh-ki"
            target="_blank"
            rel="noreferrer"
            className="text-secondary text-decoration-none footer-link"
          >
            LinkedIn
          </a>
          <a
            href="mailto:kijoonh91@gmail.com"
            className="text-secondary text-decoration-none footer-link"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
