type HeaderProps = {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
};

export default function Header({ isDarkTheme, onToggleTheme }: HeaderProps): JSX.Element {
  return (
    <div className="site-header">
      <div className="container py-4 position-relative">
        <div className="text-center">
          <h1 className="display-5 fw-bold mb-1">Junhyung Ki</h1>
          <p className="text-secondary mb-0">Software Engineer</p>
        </div>
      </div>
      <div className="social-links">
        <button className="btn btn-sm theme-toggle-btn me-2" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDarkTheme ? 'Light' : 'Dark'}
        </button>
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

