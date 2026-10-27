import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "");

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">Employee App</span>
        <ul className="navbar-nav ms-auto flex-row gap-3">
          <li className="nav-item">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/employee-form" className={linkClass}>Employee Form</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
