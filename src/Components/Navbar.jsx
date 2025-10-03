import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "nav-link-active text-white px-3 py-1 rounded"
      : "nav-link hover:text-orange-600";

  const handleLogout = () => {
    // Clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    // Update parent state
    setUser(null);
    setIsOpen(false);

    navigate("/login");
  };

  return (
    <header className="nav-wrapper">
      <div className="nav-container">
        <div>
          <h1 className="nav-logo">Inner Pieces</h1>
          <p className="nav-tagline">Thoughts on Lifestyle & Mental Health</p>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <ul className="nav-link-list">
            <li>
              <NavLink to="/" className={navLinkClasses}>
                Home
              </NavLink>
            </li>

            {!user && (
              <>
                <li>
                  <NavLink to="/register" className={navLinkClasses}>
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className={navLinkClasses}>
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {user && user.userType === "admin" ? (
              <>
                <li>
                  <NavLink to="/blog" className={navLinkClasses}>
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin" className={navLinkClasses}>
                    Admin
                  </NavLink>
                </li>
                <li>
                  <button className={navLinkClasses} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              user && (
                <>
                  <li>
                    <NavLink to="/blog" className={navLinkClasses}>
                      Blog
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className={navLinkClasses}>
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className={navLinkClasses}>
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <button className={navLinkClasses} onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )
            )}
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button className="nav-mobile-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="nav-mobile-list p-6 space-y-4">
          <li>
            <NavLink
              to="/"
              className={navLinkClasses}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>

          {!user && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={navLinkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={navLinkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}

          {user && user.userType === "admin" ? (
            <>
              <li>
                <NavLink
                  to="/blog"
                  className={navLinkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  className={navLinkClasses}
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </NavLink>
              </li>
              <li>
                <button className={navLinkClasses} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            user && (
              <>
                <li>
                  <NavLink
                    to="/blog"
                    className={navLinkClasses}
                    onClick={() => setIsOpen(false)}
                  >
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={navLinkClasses}
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={navLinkClasses}
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <button className={navLinkClasses} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
