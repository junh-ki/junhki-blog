import { useEffect } from 'react';

export default function ContactPage(): JSX.Element {
  useEffect((): void => {
    document.title = 'Contact | JunhKi';
  }, []);

  return (
    <div className="container">
      <div className="text-center border mb-5 shadow-rounded">
        <h1>Contact</h1>
        <p>
          I can be reached via{' '}
          <a href="https://www.linkedin.com/in/junh-ki/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </p>
        <p>Feel free to visit any of the following platforms:</p>
      </div>
      <div className="list-group shadow">
        <a
          href="https://www.linkedin.com/in/junh-ki"
          target="_blank"
          rel="noreferrer"
          className="list-group-item list-group-item-action d-flex gap-3 py-3"
        >
          <img src="assets/logo/linkedin.svg" width={32} height={32} className="rounded-circle flex-shrink-0 me-5" alt="LinkedIn" />
          <h3 className="mb-0">LinkedIn</h3>
        </a>
        <a
          href="https://github.com/junh-ki"
          target="_blank"
          rel="noreferrer"
          className="list-group-item list-group-item-action d-flex gap-3 py-3"
        >
          <img src="assets/logo/github.svg" width={32} height={32} className="rounded-circle flex-shrink-0 me-5" alt="GitHub" />
          <h3 className="mb-0">GitHub</h3>
        </a>
        <a
          href="https://gravatar.com/junhki"
          target="_blank"
          rel="noreferrer"
          className="list-group-item list-group-item-action d-flex gap-3 py-3"
        >
          <img src="assets/logo/gravatar.svg" width={32} height={32} className="rounded-circle flex-shrink-0 me-5" alt="Gravatar" />
          <h3 className="mb-0">Gravatar</h3>
        </a>
      </div>
    </div>
  );
}


