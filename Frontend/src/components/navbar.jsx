import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/pos", label: "POS" },
  { to: "/inventory", label: "Inventory" },
  { to: "/products", label: "Products" },
  { to: "/reports", label: "Reports" },
];

export default function Navbar() {
  return (
    <header className="nav-header">
      <div className="app-shell">
        <nav className="nav-shell">
          <Link to="/" className="nav-brand">
            <span className="nav-mark">KS</span>
            <div className="nav-copy">
              <span>Khaye's Store</span>
              <small>Sari-Sari Store</small>
            </div>
          </Link>

          <div className="nav-links">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  ["nav-link", isActive ? "active" : ""].filter(Boolean).join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-status">
            <span />
            Online
          </div>
        </nav>
      </div>
    </header>
  );
}
