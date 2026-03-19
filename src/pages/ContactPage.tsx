import { useEffect } from 'react';

export default function ContactPage(): JSX.Element {
  useEffect((): void => {
    document.title = 'Contact | JunhKi';
  }, []);

  return (
    <div className="container pb-4">
      <div className="contact-hero border rounded-3 p-4 p-md-5 shadow-sm mb-4">
        <h1 className="mb-3">Let&apos;s build something meaningful.</h1>
        <p className="lead mb-0 text-secondary">
          I am open to software engineering opportunities, especially fullstack or backend roles, and product teams where reliability and quality matter.
        </p>
      </div>
      <div className="list-group shadow-sm rounded-3 overflow-hidden">
        <a
          href="https://www.linkedin.com/in/junh-ki"
          target="_blank"
          rel="noreferrer"
          className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
        >
          <img src="assets/logo/linkedin.svg" width={32} height={32} className="rounded-circle flex-shrink-0 me-5" alt="LinkedIn" />
          <div>
            <h5 className="mb-0">LinkedIn</h5>
            <small className="text-secondary">Professional background and career updates</small>
          </div>
        </a>
        <a
          href="https://github.com/junh-ki"
          target="_blank"
          rel="noreferrer"
          className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
        >
          <img src="assets/logo/github.svg" width={32} height={32} className="rounded-circle flex-shrink-0 me-5" alt="GitHub" />
          <div>
            <h5 className="mb-0">GitHub</h5>
            <small className="text-secondary">Code samples and project repositories</small>
          </div>
        </a>
        <a
          href="https://gravatar.com/junhki"
          target="_blank"
          rel="noreferrer"
          className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
        >
          <img src="assets/logo/gravatar.svg" width={32} height={32} className="rounded-circle flex-shrink-0 me-5" alt="Gravatar" />
          <div>
            <h5 className="mb-0">Gravatar</h5>
            <small className="text-secondary">Public profile and identity references</small>
          </div>
        </a>
      </div>
    </div>
  );
}


