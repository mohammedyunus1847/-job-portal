import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/jobdetails.css";

function formatJobType(value) {
    if (!value) return "Role";
    const types = {
        fulltime: "Full-time",
        parttime: "Part-time",
        internship: "Internship",
    };
    return types[value.toLowerCase()] || value;
}

function formatDate(value) {
    if (!value) return "Recently posted";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recently posted";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function getInitials(name) {
    if (!name) return "JF";
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();
}

function JobDetails() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [apply, setApply] = useState(false);
    const [applyError, setApplyError] = useState("");

    useEffect(() => {
        async function Fetchjob() {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(`${API_URL}/api/job/${id}`);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed TO Fetch The Job");
                }

                setJob(data.data);
            } catch (error) {
                setError(error.message || "something Went Wrong");
            } finally {
                setLoading(false);
            }
        }
        Fetchjob();
    }, [id, API_URL]);

    async function handleapply() {
        setApplyError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setApplyError("Please Login Before Applying");
                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/application/${id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            if (!response.ok) {
                if (
                    data.message?.toLowerCase().includes("already") &&
                    data.message?.toLowerCase().includes("application")
                ) {
                    setApply(true);
                    setApplyError("");
                    alert("You have already applied. Please wait for HR's reply.");
                    return;
                }
                throw new Error(data.message || "Failed To Apply For The Job");
            }
            setApply(true);
            alert(data.message || "Application Submitted Successfully");
        } catch (error) {
            setApplyError(error.message || "Something Went Wrong");
        }
    }

    return (
        <div className="job-details-page container">
            <Link to="/" className="back-link">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M15 6l-6 6 6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Back to jobs
            </Link>

            {loading && (
                <div className="loading-state">
                    <span className="spinner" aria-hidden="true" />
                    Loading job details...
                </div>
            )}

            {error && (
                <div className="alert alert-error" role="alert">
                    {error}
                </div>
            )}

            {!loading && !error && job && (
                <div className="job-details-grid animate-in">
                    <article className="details-main card">
                        <header className="details-header">
                            <div className="details-avatar" aria-hidden="true">
                                {getInitials(job.company)}
                            </div>

                            <div className="details-heading">
                                <div className="details-badges">
                                    <span className="badge badge-type">
                                        {formatJobType(job.jobtype)}
                                    </span>
                                    <span className="badge badge-open">
                                        <span className="badge-dot" />
                                        Open role
                                    </span>
                                </div>
                                <h1>{job.title}</h1>
                                <p className="details-company">{job.company}</p>
                            </div>
                        </header>

                        <div className="details-meta">
                            <div className="meta-item">
                                <span className="meta-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12 21s6.5-5.4 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15.6 12 21 12 21Z"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                        />
                                        <circle
                                            cx="12"
                                            cy="10.5"
                                            r="2.4"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="meta-label">Location</p>
                                    <p className="meta-value">
                                        {job.location || "Not specified"}
                                    </p>
                                </div>
                            </div>

                            <div className="meta-item">
                                <span className="meta-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12 3v18M8 7.5h5.5a2.75 2.75 0 0 1 0 5.5H9a2.75 2.75 0 0 0 0 5.5h6"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="meta-label">Salary</p>
                                    <p className="meta-value">
                                        {job.salary || "Not disclosed"}
                                    </p>
                                </div>
                            </div>

                            <div className="meta-item">
                                <span className="meta-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect
                                            x="3"
                                            y="7"
                                            width="18"
                                            height="13"
                                            rx="3"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                        />
                                        <path
                                            d="M3 12.5h18M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="meta-label">Job type</p>
                                    <p className="meta-value">
                                        {formatJobType(job.jobtype)}
                                    </p>
                                </div>
                            </div>

                            <div className="meta-item">
                                <span className="meta-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="8"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                        />
                                        <path
                                            d="M12 8v4.5l3 1.8"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="meta-label">Posted</p>
                                    <p className="meta-value">
                                        {formatDate(job.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <section className="details-section">
                            <h2>About the role</h2>
                            <p className="description-text">
                                {job.description ||
                                    "The recruiter has not added a detailed description for this role yet."}
                            </p>
                        </section>

                        <section className="details-section">
                            <h2>Skills &amp; expertise</h2>
                            {job.skills && job.skills.length > 0 ? (
                                <div className="skill-tags">
                                    {job.skills.map((skill, index) => (
                                        <span className="skill-tag" key={index}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="muted-text">No skills specified</p>
                            )}
                        </section>
                    </article>

                    <aside className="details-sidebar card">
                        <h2>Job overview</h2>

                        <ul className="overview-list">
                            <li>
                                <span>Company</span>
                                <strong>{job.company}</strong>
                            </li>
                            <li>
                                <span>Location</span>
                                <strong>{job.location || "Not specified"}</strong>
                            </li>
                            <li>
                                <span>Salary</span>
                                <strong>{job.salary || "Not disclosed"}</strong>
                            </li>
                            <li>
                                <span>Job type</span>
                                <strong>{formatJobType(job.jobtype)}</strong>
                            </li>
                            <li>
                                <span>Posted</span>
                                <strong>{formatDate(job.createdAt)}</strong>
                            </li>
                        </ul>

                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={handleapply}
                            disabled={apply}
                        >
                            {apply ? "Applied" : "Apply for this job"}
                        </button>

                        {applyError && (
                            <p className="apply-error" role="alert">
                                {applyError}
                            </p>
                        )}

                        <p className="apply-note">
                            Your application will be shared with the hiring team.
                        </p>
                    </aside>
                </div>
            )}
        </div>
    );
}

export default JobDetails;
