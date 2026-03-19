export default function Header(): JSX.Element {
  return (
    <div className="jumbotron" style={{ position: 'relative', padding: '2rem 1rem', backgroundColor: '#e9ecef' }}>
      <div className="text-center">
        <h1 className="display-4">Junhyung Ki</h1>
        <h3>Software Developer</h3>
      </div>
      <div style={{ position: 'absolute', bottom: 5, right: 10 }}>
        <a href="https://www.linkedin.com/in/junh-ki" target="_blank" rel="noreferrer">
          <img src="assets/logo/linkedin.svg" width={24} height={24} className="rounded-circle me-2" alt="LinkedIn" />
        </a>
        <a href="https://github.com/junh-ki" target="_blank" rel="noreferrer">
          <img src="assets/logo/github.svg" width={24} height={24} className="rounded-circle me-2" alt="GitHub" />
        </a>
        <a href="https://gravatar.com/junhki" target="_blank" rel="noreferrer">
          <img src="assets/logo/gravatar.svg" width={24} height={24} className="rounded-circle me-2" alt="Gravatar" />
        </a>
      </div>
    </div>
  );
}

