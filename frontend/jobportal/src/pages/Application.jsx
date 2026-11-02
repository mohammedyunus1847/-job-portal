import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function statusLabel(status) {
    if (status === "ShortListed") return "Shortlisted";
    return status || "Applied";
}

function statusClass(status) {
    return `badge status-${(status || "Applied").toLowerCase()}`;
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

function formatAppliedDate(id) {
    if (!id || id.length < 8) return null;
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function Application() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [applications, setApplication] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function FetchApplication() {
            try {
                setLoading(true);
                setError("");
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Please Login To View Your Application");
                }

                const response = await fetch(`${API_URL}/api/application`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (!response.ok) {
                    if (response.status === 404) {
                        setApplication([]);
                        return;
                    }
                    throw new Error(
                        data.message || "Failed To Fetch The Application"
                    );
                }

                setApplication(data.data);
            } catch (error) {
                setError(error.message || "Something Went Wrong");
            } finally {
                setLoading(false);
            }
        }
        FetchApplication();
    }, [API_URL]);

    return (
        <div className="page-shell container">
            <header className="page-header">
                <div>
                    <span className="page-kicker">Jobseeker</span>
                    <h1>My Applications</h1>
                    <p>Track the status of the jobs you've applied for.</p>
                </div>
                <div className="page-header-actions">
                    <Link to="/" className="btn btn-outline btn-sm">
                        Browse jobs
                    </Link>
                </div>
            </header>

            {loading && (
                <div className="loading-state">
                    <span className="spinner" aria-hidden="true" />
                    Loading applications...
                </div>
            )}

            {error && (
                <div className="alert alert-error" role="alert">
                    {error}
                </div>
            )}

            {!loading && !error && applications.length === 0 && (
                <div className="empty-state">
                    <span className="empty-icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M8 4h8l4 4v12H4V4h4Z"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 4v5h8"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <h3>No applications yet</h3>
                    <p>
                        You haven't applied for any jobs yet. Explore open roles
                        and submit your first application.
                    </p>
                    <Link
                        to="/"
                        className="btn btn-primary btn-sm empty-state-action"
                    >
                        Find jobs
                    </Link>
                </div>
            )}

            {!loading && !error && applications.length > 0 && (
                <div className="application-list">
                    {applications.map((application) => {
                        const job = application.Job;
                        const appliedOn = formatAppliedDate(application._id);

                        return (
                            <article
                                key={application._id}
                                className="application-card card animate-in"
                            >
                                <div className="application-main">
                                    <div className="company-avatar" aria-hidden="true">
                                        {getInitials(job?.company)}
                                    </div>

                                    <div className="application-body">
                                        <h2>
                                            {job?.title || "Job Title Unavailable"}
                                        </h2>
                                        <p className="application-company">
                                            {job?.company || "Not Available"}
                                        </p>

                                        <div className="application-meta">
                                            <span>
                                                {job?.location || "Location not available"}
                                            </span>
                                            <span>
                                                {job?.salary || "Salary not disclosed"}
                                            </span>
                                            {appliedOn && (
                                                <span>Applied on {appliedOn}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="application-side">
                                    <span className={statusClass(application.status)}>
                                        <span className="badge-dot" />
                                        {statusLabel(application.status)}
                                    </span>

                                    {job?._id && (
                                        <Link
                                            to={`/jobs/${job._id}`}
                                            className="btn btn-outline btn-sm"
                                        >
                                            View Job
                                        </Link>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Application;
