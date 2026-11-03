import { Link } from "react-router-dom";
import BrandLogo from "../components/brandlogo";
import "../styles/about.css";

const jobseekerFeatures = [
    "Search roles by title, skills, and location",
    "Sort and browse current openings",
    "Review clear job details and requirements",
    "Apply to roles in a few clicks",
    "Track application status in one place",
];

const recruiterFeatures = [
    "Publish open roles in minutes",
    "Edit and manage posted jobs",
    "Review applicants for each role",
    "Update candidate statuses",
    "Keep hiring activity organized",
];

function FeatureList({ items }) {
    return (
        <ul className="about-feature-list">
            {items.map((item) => (
                <li key={item}>
                    <span className="about-feature-check" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="m5 12.5 4.5 4.5L19 7.5"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    {item}
                </li>
            ))}
        </ul>
    );
}

function About() {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="about-hero-mark" aria-hidden="true">
                    <BrandLogo variant="light" compact />
                </div>

                <div className="container about-hero-inner">
                    <span className="about-eyebrow">About NEXHIRE</span>

                    <h1>
                        Where ambition meets <span>opportunity.</span>
                    </h1>

                    <p>
                        NEXHIRE is a focused recruitment platform built to make
                        discovering great roles and hiring great people feel
                        simpler, faster, and more human.
                    </p>
                </div>
            </section>

            <div className="container about-body">
                <section
                    className="about-intro"
                    aria-labelledby="about-nexhire-title"
                >
                    <div>
                        <span className="page-kicker">About NEXHIRE</span>
                        <h2 id="about-nexhire-title">
                            A clearer path from talent to opportunity.
                        </h2>
                    </div>

                    <div className="about-intro-copy">
                        <p>
                            NEXHIRE brings jobseekers and recruiters together in
                            one focused space. Jobseekers can search relevant
                            roles, review complete job details, apply with
                            confidence, and follow every application from one
                            place.
                        </p>
                        <p>
                            Recruiters get a straightforward way to publish
                            roles, manage listings, and review the people who
                            apply. No noise, no unnecessary steps — just the
                            tools both sides need to move forward.
                        </p>
                    </div>
                </section>

                <section className="about-grid" aria-label="Mission and vision">
                    <article className="about-card">
                        <span className="about-card-index">01</span>
                        <h2>Mission</h2>
                        <p>
                            To connect ambitious talent with opportunities that
                            move careers forward — and to give recruiters a
                            clear, reliable way to meet the people who can shape
                            their teams.
                        </p>
                    </article>

                    <article className="about-card">
                        <span className="about-card-index">02</span>
                        <h2>Vision</h2>
                        <p>
                            To become a trusted career marketplace where every
                            opportunity is easy to discover, every application
                            is meaningful, and great matches are made with
                            confidence.
                        </p>
                    </article>
                </section>

                <section aria-labelledby="about-features-title">
                    <div className="about-section-heading">
                        <span className="page-kicker">Built for both sides</span>
                        <h2 id="about-features-title">
                            Tools that keep hiring moving.
                        </h2>
                    </div>

                    <div className="about-grid">
                        <article className="about-card">
                            <span className="about-card-tag">
                                For Jobseekers
                            </span>
                            <h3>Find and track the right roles</h3>
                            <FeatureList items={jobseekerFeatures} />
                        </article>

                        <article className="about-card">
                            <span className="about-card-tag">
                                For Recruiters
                            </span>
                            <h3>Publish, review, and decide</h3>
                            <FeatureList items={recruiterFeatures} />
                        </article>
                    </div>
                </section>

                <section className="about-cta" aria-labelledby="about-cta-title">
                    <div>
                        <span className="page-kicker">Get started</span>
                        <h2 id="about-cta-title">
                            Ready to take the next step?
                        </h2>
                        <p>
                            Explore open roles or create an account to start
                            hiring with NEXHIRE.
                        </p>
                    </div>

                    <div className="about-cta-actions">
                        <Link to="/" className="btn btn-primary">
                            Browse jobs
                        </Link>
                        <Link to="/register" className="btn btn-outline">
                            Create an account
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default About;
