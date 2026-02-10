import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Dashboard", to: "/" },
  { label: "Inventory", to: "/inventory" },
  { label: "Orders", to: "/orders" },
  { label: "Customers", to: "/customers" },
  { label: "Reports", to: "/reports" }
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="nav-shell">
      <nav className="nav-bar">
        <Link to="/" className="nav-brand">
          <span className="brand-mark">RE</span>
          <span className="brand-copy">
            <span className="brand-name">RetailEase</span>
            <span className="brand-tag">Retail Command Center</span>
          </span>
        </Link>

        <div className="nav-links" aria-label="Primary">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link${isActive ? " nav-link-active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name">👤 {user.name}</span>
              <button
                onClick={handleLogout}
                className="auth-btn logout-btn"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="auth-btn login-btn"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
