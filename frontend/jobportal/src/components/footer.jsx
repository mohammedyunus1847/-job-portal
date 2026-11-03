import { Link } from "react-router-dom";
import BrandLogo from "./brandlogo";
import "../styles/footer.css";

const exploreLinks = [
    { label: "Find Jobs", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Browse Opportunities", to: "/" },
];

const recruiterLinks = [
    { label: "Post a Job", to: "/post-job" },
    { label: "Manage Jobs", to: "/my-jobs" },
    { label: "View Applicants", to: "/applicants" },
];

const founderLinks = [
    {
        label: "GitHub",
        href: "https://github.com/mohammedyunus1847",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path
                    d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/yunus-mohammed-b3052b2ba",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path
                    d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.64h.05c.53-1 1.82-2.06 3.75-2.06C21.1 8.58 22 11 22 14.3V21h-4v-5.94c0-1.42-.03-3.24-1.98-3.24-1.98 0-2.28 1.55-2.28 3.14V21h-4V9Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        label: "Portfolio",
        href: "https://portfolio-db2j8okg7-yunus-8415.vercel.app",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                />
                <path
                    d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link
                            to="/"
                            className="footer-logo"
                            aria-label="NEXHIRE home"
                        >
                            <BrandLogo variant="light" />
                        </Link>

                        <p className="footer-tagline">
                            Find your next opportunity.
                        </p>
                        <p className="footer-description">
                            NEXHIRE connects ambitious talent with opportunities
                            that move careers forward.
                        </p>
                    </div>

                    <nav className="footer-column" aria-label="Explore">
                        <h2 className="footer-heading">Explore</h2>
                        <ul className="footer-links">
                            {exploreLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.to} className="footer-link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav className="footer-column" aria-label="For recruiters">
                        <h2 className="footer-heading">For Recruiters</h2>
                        <ul className="footer-links">
                            {recruiterLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.to} className="footer-link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="footer-column footer-founder">
                        <h2 className="footer-heading">Founder</h2>
                        <p className="footer-founder-name">Yunus A.</p>
                        <p className="footer-founder-role">
                            Founder &amp; Developer
                        </p>

                        <ul className="footer-socials">
                            {founderLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="footer-social"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.icon}
                                        {link.label}
                                        <span className="sr-only">
                                            {" "}
                                            (opens in a new tab)
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        &copy; 2026 NEXHIRE. Built with passion by Yunus A.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
