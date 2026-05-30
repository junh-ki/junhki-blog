import { NavLink } from 'react-router-dom';
import { JSX } from "react";

export default function Nav(): JSX.Element {
  return (
    <nav className="navbar-expand-md border-bottom mb-3">
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <NavLink
              to="/home"
              className={({ isActive }): string => (isActive ? 'nav-link nav-link-active' : 'nav-link nav-link-idle')}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/portfolio"
              className={({ isActive }): string => (isActive ? 'nav-link nav-link-active' : 'nav-link nav-link-idle')}
            >
              Portfolio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/lab"
              className={({ isActive }): string => (isActive ? 'nav-link nav-link-active' : 'nav-link nav-link-idle')}
            >
              Lab &amp; Notes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }): string => (isActive ? 'nav-link nav-link-active' : 'nav-link nav-link-idle')}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

