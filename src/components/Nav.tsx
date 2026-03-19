import { NavLink } from 'react-router-dom';

export default function Nav(): JSX.Element {
  return (
    <nav className="navbar-expand-md border-bottom mb-3">
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <NavLink
              to="/home"
              className={({ isActive }): string => (isActive ? 'nav-link text-dark' : 'nav-link text-secondary')}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/portfolio"
              className={({ isActive }): string => (isActive ? 'nav-link text-dark' : 'nav-link text-secondary')}
            >
              Portfolio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/blog"
              className={({ isActive }): string => (isActive ? 'nav-link text-dark' : 'nav-link text-secondary')}
            >
              Blog
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }): string => (isActive ? 'nav-link text-dark' : 'nav-link text-secondary')}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

