import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import BrandLogo from "./brandlogo";
import { useEffect, useState } from "react";

function Navbar() {
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const updateRole = () => {
            setRole(localStorage.getItem("role"));
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener("authChange", updateRole);

        return () => {
            window.removeEventListener("authChange", updateRole);
        };
    }, []);

    function closeMenu() {
        setMenuOpen(false);
    }

    function HandleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.dispatchEvent(new Event("authChange"));
        setMenuOpen(false);
        navigate("/");
    }

    const isJobseeker = token && role?.toLowerCase() === "jobseeker";
    const isRecruiter = token && role?.toLowerCase() === "recruiter";

    const navLinkClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link
                    to="/"
                    className="navbar-brand"
                    onClick={closeMenu}
                    aria-label="NEXHIRE home"
                >
                    <BrandLogo variant="light" />
                </Link>

                <button
                    type="button"
                    className="nav-toggle"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="primary-navigation"
                    onClick={() => setMenuOpen((previous) => !previous)}
                >
                    <span className="nav-toggle-bars" />
                </button>

                <div
                    id="primary-navigation"
                    className={`navbar-menu ${menuOpen ? "open" : ""}`}
                    onClick={(event) => {
                        if (event.target.closest?.("a")) {
                            closeMenu();
                        }
                    }}
                >
                    <div className="navbar-group">
                        <NavLink to="/" end className={navLinkClass}>
                            Home
                        </NavLink>

                        {isJobseeker && (
                            <NavLink to="/myapplication" className={navLinkClass}>
                                My Applications
                            </NavLink>
                        )}

                        {isRecruiter && (
                            <>
                                <NavLink to="/post-job" className={navLinkClass}>
                                    Post a Job
                                </NavLink>
                                <NavLink to="/my-jobs" className={navLinkClass}>
                                    My Posted Jobs
                                </NavLink>
                                <NavLink to="/applicants" className={navLinkClass}>
                                    Applicants
                                </NavLink>
                            </>
                        )}
                    </div>

                    <div className="navbar-actions">
                        {token ? (
                            <button
                                type="button"
                                onClick={HandleLogout}
                                className="nav-btn nav-btn-outline"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="nav-btn nav-btn-ghost">
                                    Login
                                </Link>
                                <Link to="/register" className="nav-btn nav-btn-primary">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
