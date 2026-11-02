import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

function statusLabel(status) {
    if (status === "ShortListed") return "Shortlisted";
    return status || "Applied";
}

function statusClass(status) {
    return `badge status-${(status || "Applied").toLowerCase()}`;
}

function getInitials(name) {
    if (!name) return "AP";
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();
}

function Applicants() {
    const API_URL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const [jobs, setJobs] = useState([]);
    const [selectedjob, setSelectedjo] = useState(location.state?.jobId || "");
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState("");
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [loadingApplicants, setLoadingApplicants] = useState(false);

    useEffect(() => {
        async function FetchJobs() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Please Login as Recruiter ");
                }

                const response = await fetch(`${API_URL}/api/job/myjobs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    if (response.status === 404) {
                        setJobs([]);
                        return;
                    }
                    throw new Error(data.message || "Failed to Dispaly Jobs");
                }

                setJobs(data.data);
            } catch (error) {
                setError(error.message || "Something Went Wrong");
            } finally {
                setLoadingJobs(false);
            }
        }
        FetchJobs();
    }, [API_URL]);

    useEffect(() => {
        if (selectedjob.length === 0) {
            return;
        }

        async function FetchApplicants() {
            setError("");
            setLoadingApplicants(true);
            setApplicants([]);
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Please Login as Recruiter");
                }

                const response = await fetch(
                    `http://localhost:5000/api/application/job/${selectedjob}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed To Display The Applicants"
                    );
                }

                setApplicants(data.data);
            } catch (error) {
                setError(error.message || "Something Went Wrong");
            } finally {
                setLoadingApplicants(false);
            }
        }
        FetchApplicants();
    }, [selectedjob]);

    async function handleStatusChange(applicationId, newStatus) {
        setError("");
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Please Login As a Recruiter");
            }

            const response = await fetch(
                `http://localhost:5000/api/application/${applicationId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update status");
            }

            setApplicants((previousApplicants) =>
                previousApplicants.map((applicant) =>
                    applicant._id === applicationId
                        ? { ...applicant, status: data.data.status }
                        : applicant
                )
            );
        } catch (error) {
            setError(error.message || "Something went wrong");
        }
    }

    const selectedJobDetails = jobs.find((job) => job._id === selectedjob);

    return (
        <div className="page-shell container">
            <header className="page-header">
                <div>
                    <span className="page-kicker">Recruiter</span>
                    <h1>Applicants Dashboard</h1>
                    <p>
                        Review candidates and update their application status.
                    </p>
                </div>
                <div className="page-header-actions">
                    <Link to="/my-jobs" className="btn btn-outline btn-sm">
                        Back to my jobs
                    </Link>
                </div>
            </header>

            {!loadingJobs && !error && jobs.length === 0 && (
                <div className="empty-state">
                    <span className="empty-icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle
                                cx="9"
                                cy="8"
                                r="3"
                                stroke="currentColor"
                                strokeWidth="1.7"
                            />
                            <path
                                d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 11h5M16 15h3"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                    <h3>No jobs posted yet</h3>
                    <p>
                        Post a job first, then return here to review the
                        candidates who apply.
                    </p>
                    <Link
                        to="/post-job"
                        className="btn btn-primary btn-sm empty-state-action"
                    >
                        Post a job
                    </Link>
                </div>
            )}

            {!loadingJobs && jobs.length > 0 && (
                <div className="filter-card card">
                    <div className="filter-field">
                        <label htmlFor="job-filter">Select a job</label>
                        <select
                            id="job-filter"
                            className="input"
                            value={selectedjob}
                            onChange={(e) => setSelectedjo(e.target.value)}
                        >
                            <option value="">Select a job</option>
                            {jobs.map((job) => (
                                <option key={job._id} value={job._id}>
                                    {job.title} — {job.company}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedJobDetails && (
                        <div className="filter-summary">
                            <span className="filter-summary-label">
                                Reviewing
                            </span>
                            <strong>{selectedJobDetails.title}</strong>
                            <span>{selectedJobDetails.company}</span>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="alert alert-error" role="alert">
                    {error}
                </div>
            )}

            {!loadingJobs && jobs.length > 0 && !selectedjob && (
                <div className="empty-state">
                    <h3>Select a job to get started</h3>
                    <p>
                        Choose one of your posted jobs above to view its applicant
                        list.
                    </p>
                </div>
            )}

            {selectedjob && loadingApplicants && (
                <div className="loading-state">
                    <span className="spinner" aria-hidden="true" />
                    Loading applicants...
                </div>
            )}

            {selectedjob &&
                !loadingApplicants &&
                !error &&
                applicants.length === 0 && (
                    <div className="empty-state">
                        <h3>No applicants yet</h3>
                        <p>
                            No candidates have applied for this role so far. Check
                            back soon.
                        </p>
                    </div>
                )}

            {selectedjob && applicants.length > 0 && (
                <div className="applicant-list">
                    {applicants.map((applicant) => (
                        <article
                            key={applicant._id}
                            className="applicant-card animate-in"
                        >
                            <div className="applicant-avatar" aria-hidden="true">
                                {getInitials(applicant.user?.Name)}
                            </div>

                            <div className="applicant-info">
                                <h3>{applicant.user?.Name || "Applicant"}</h3>
                                <p>{applicant.user?.Email || "Email unavailable"}</p>
                                {selectedJobDetails && (
                                    <p className="applicant-job">
                                        Applied for {selectedJobDetails.title}
                                    </p>
                                )}
                            </div>

                            <div className="applicant-controls">
                                <span className={statusClass(applicant.status)}>
                                    <span className="badge-dot" />
                                    {statusLabel(applicant.status)}
                                </span>

                                <label
                                    className="sr-only"
                                    htmlFor={`status-${applicant._id}`}
                                >
                                    Update application status for{" "}
                                    {applicant.user?.Name || "applicant"}
                                </label>
                                <select
                                    id={`status-${applicant._id}`}
                                    className="input applicant-select"
                                    value={applicant.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            applicant._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Applied">Applied</option>
                                    <option value="ShortListed">
                                        Shortlisted
                                    </option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Applicants;
