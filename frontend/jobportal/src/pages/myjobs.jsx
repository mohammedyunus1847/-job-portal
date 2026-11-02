import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

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
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
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

function Myjobs() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [editingJobId, setEditingJobId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editCompany, setEditCompany] = useState("");
    const [editLocation, setEditLocation] = useState("");
    const [editSalary, setEditSalary] = useState("");
    const [editJobtype, setEditJobtype] = useState("FullTime");
    const [editDescription, setEditDescription] = useState("");
    const [editSkills, setEditSkills] = useState("");

    function HandleEdits(job) {
        setEditingJobId(job._id);
        setEditTitle(job.title);
        setEditCompany(job.company);
        setEditLocation(job.location);
        setEditSalary(job.salary);
        setEditJobtype(job.jobtype);
        setEditDescription(job.description);
        setEditSkills(Array.isArray(job.skills) ? job.skills.join(", ") : "");
    }

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true);
                setError("");
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Please Login as a reqruiter first");
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
                    throw new Error(data.message || "Failed To Fetch Your Job");
                }
                setJobs(data.data);
            } catch (error) {
                setError(error.message || "Something Went Wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, [API_URL]);

    async function Handledelete(jobId) {
        const confirmed = window.confirm(
            "Are You Sure You Want To Delete This Job?"
        );
        if (!confirmed) {
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Please Login as a reqruiter first");
            }
            const response = await fetch(
                `http://localhost:5000/api/job/${jobId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed To Delete Job ");
            }
            setJobs((previousJobs) =>
                previousJobs.filter((job) => job._id !== jobId)
            );
            if (editingJobId === jobId) {
                setEditingJobId(null);
            }
        } catch (error) {
            setError(error.message || "Something Went Wrong");
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Please Login as a Recruiter First");
            }

            const response = await fetch(
                `http://localhost:5000/api/job/${editingJobId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: editTitle,
                        company: editCompany,
                        location: editLocation,
                        salary: editSalary,
                        jobtype: editJobtype,
                        description: editDescription,
                        skills: editSkills
                            .split(",")
                            .map((skill) => skill.trim())
                            .filter(Boolean),
                    }),
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed To Update Job");
            }

            setJobs((previousJob) =>
                previousJob.map((job) =>
                    job._id === editingJobId ? data.data : job
                )
            );
            setEditingJobId(null);
            setError("");
        } catch (error) {
            setError(error.message || "Something Went Wrong");
        }
    }

    return (
        <div className="page-shell container">
            <header className="page-header">
                <div>
                    <span className="page-kicker">Recruiter</span>
                    <h1>My Posted Jobs</h1>
                    <p>Manage the roles you have published and their details.</p>
                </div>
                <div className="page-header-actions">
                    <Link to="/post-job" className="btn btn-primary btn-sm">
                        Post a job
                    </Link>
                </div>
            </header>

            {loading && (
                <div className="loading-state">
                    <span className="spinner" aria-hidden="true" />
                    Loading your jobs...
                </div>
            )}

            {error && (
                <div className="alert alert-error" role="alert">
                    {error}
                </div>
            )}

            {!loading && !error && jobs.length === 0 && (
                <div className="empty-state">
                    <span className="empty-icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                                d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                    <h3>No jobs posted yet</h3>
                    <p>
                        Publish your first role to start receiving applications
                        from qualified candidates.
                    </p>
                    <Link
                        to="/post-job"
                        className="btn btn-primary btn-sm empty-state-action"
                    >
                        Post your first job
                    </Link>
                </div>
            )}

            {!loading && !error && jobs.length > 0 && (
                <div className="manage-grid">
                    {jobs.map((job) => (
                        <article
                            key={job._id}
                            className="manage-card card animate-in"
                        >
                            <div className="manage-card-head">
                                <div className="company-avatar" aria-hidden="true">
                                    {getInitials(job.company)}
                                </div>

                                <div className="manage-card-title">
                                    <h2>{job.title}</h2>
                                    <p>{job.company}</p>
                                </div>

                                <span className="badge badge-type">
                                    {formatJobType(job.jobtype)}
                                </span>
                            </div>

                            <div className="manage-meta">
                                <span>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
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
                                    {job.location || "Location flexible"}
                                </span>
                                <span>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M12 3v18M8 7.5h5.5a2.75 2.75 0 0 1 0 5.5H9a2.75 2.75 0 0 0 0 5.5h6"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    {job.salary || "Not disclosed"}
                                </span>
                                {formatDate(job.createdAt) && (
                                    <span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-hidden="true"
                                        >
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
                                        Posted {formatDate(job.createdAt)}
                                    </span>
                                )}
                            </div>

                            <div className="manage-actions">
                                <button
                                    type="button"
                                    className="btn btn-outline btn-sm"
                                    onClick={() => HandleEdits(job)}
                                >
                                    Edit job
                                </button>

                                <Link
                                    to="/applicants"
                                    state={{ jobId: job._id }}
                                    className="btn btn-outline btn-sm"
                                >
                                    View applicants
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => Handledelete(job._id)}
                                >
                                    Delete
                                </button>
                            </div>

                            {editingJobId === job._id && (
                                <form className="edit-form" onSubmit={handleUpdate}>
                                    <h3>Edit job details</h3>

                                    <div className="edit-form-grid">
                                        <div className="form-field">
                                            <label htmlFor={`edit-title-${job._id}`}>
                                                Job title
                                            </label>
                                            <input
                                                id={`edit-title-${job._id}`}
                                                className="input"
                                                value={editTitle}
                                                onChange={(e) =>
                                                    setEditTitle(e.target.value)
                                                }
                                                placeholder="Job Title"
                                                required
                                            />
                                        </div>

                                        <div className="form-field">
                                            <label htmlFor={`edit-company-${job._id}`}>
                                                Company
                                            </label>
                                            <input
                                                id={`edit-company-${job._id}`}
                                                className="input"
                                                value={editCompany}
                                                onChange={(e) =>
                                                    setEditCompany(e.target.value)
                                                }
                                                placeholder="Company"
                                                required
                                            />
                                        </div>

                                        <div className="form-field">
                                            <label htmlFor={`edit-location-${job._id}`}>
                                                Location
                                            </label>
                                            <input
                                                id={`edit-location-${job._id}`}
                                                className="input"
                                                value={editLocation}
                                                onChange={(e) =>
                                                    setEditLocation(e.target.value)
                                                }
                                                placeholder="Location"
                                                required
                                            />
                                        </div>

                                        <div className="form-field">
                                            <label htmlFor={`edit-salary-${job._id}`}>
                                                Salary
                                            </label>
                                            <input
                                                id={`edit-salary-${job._id}`}
                                                className="input"
                                                type="number"
                                                value={editSalary}
                                                onChange={(e) =>
                                                    setEditSalary(e.target.value)
                                                }
                                                placeholder="Salary"
                                                required
                                            />
                                        </div>

                                        <div className="form-field">
                                            <label htmlFor={`edit-type-${job._id}`}>
                                                Job type
                                            </label>
                                            <select
                                                id={`edit-type-${job._id}`}
                                                className="input"
                                                value={editJobtype}
                                                onChange={(e) =>
                                                    setEditJobtype(e.target.value)
                                                }
                                            >
                                                <option value="FullTime">
                                                    Full Time
                                                </option>
                                                <option value="PartTime">
                                                    Part Time
                                                </option>
                                                <option value="Internship">
                                                    Internship
                                                </option>
                                            </select>
                                        </div>

                                        <div className="form-field edit-field-full">
                                            <label
                                                htmlFor={`edit-description-${job._id}`}
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                id={`edit-description-${job._id}`}
                                                className="input"
                                                value={editDescription}
                                                onChange={(e) =>
                                                    setEditDescription(e.target.value)
                                                }
                                                placeholder="Description"
                                                required
                                            />
                                        </div>

                                        <div className="form-field edit-field-full">
                                            <label htmlFor={`edit-skills-${job._id}`}>
                                                Skills
                                            </label>
                                            <input
                                                id={`edit-skills-${job._id}`}
                                                className="input"
                                                value={editSkills}
                                                onChange={(e) =>
                                                    setEditSkills(e.target.value)
                                                }
                                                placeholder="Skills separated by commas"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-sm"
                                        >
                                            Save changes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => setEditingJobId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Myjobs;
