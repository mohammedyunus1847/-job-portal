import { useEffect, useState } from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";

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
    return `Posted ${date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })}`;
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

function Home() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [location, setlocation] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setpagination] = useState({});
    const [sortBy, setSortby] = useState("newest");
    const [searchquery, setSearchquery] = useState("");
    const [locationquery, setLocationquery] = useState("");

    useEffect(() => {
        async function Fetchjobs() {
            try {
                setError("");
                setLoading(true);
                const response = await fetch(
                    `${API_URL}/api/job?page=${page}&limit=5&sortBy=${sortBy}&title=${encodeURIComponent(
                        searchquery
                    )}&location=${encodeURIComponent(locationquery)}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Filed To Fetch Jobs");
                }
                setJobs(data.data);
                setpagination(data.pagination);
            } catch (error) {
                setError(error.message || "Something Went Wrong");
            } finally {
                setLoading(false);
            }
        }
        Fetchjobs();
    }, [page, sortBy, searchquery, locationquery, API_URL]);

    function handleSearch() {
        setSearchquery(search);
        setLocationquery(location);
        setPage(1);
    }

    function handleSearchKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    }

    return (
        <div className="home">
            <section className="hero">
                <div className="container hero-inner">
                    <span className="eyebrow">NEXHIRE · Premium talent marketplace</span>

                    <h1>
                        Find Your Next <span>Opportunity.</span>
                    </h1>

                    <p className="hero-subtitle">
                        Connecting ambitious talent with opportunities that move
                        careers forward.
                    </p>

                    <div className="search-bar" role="search">
                        <div className="search-field">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="11"
                                    cy="11"
                                    r="6.5"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                />
                                <path
                                    d="m16 16 4.5 4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Job title or skills"
                                aria-label="Search by job title or skills"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                            />
                        </div>

                        <div className="search-field">
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
                            <input
                                type="text"
                                placeholder="Location"
                                aria-label="Search by location"
                                value={location}
                                onChange={(e) => setlocation(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary search-btn"
                            onClick={handleSearch}
                        >
                            Search Jobs
                        </button>
                    </div>

                </div>
            </section>

            <section className="jobs-section container">
                <div className="section-header">
                    <div>
                        <h2>Latest Jobs</h2>
                        <p>
                            {pagination?.totalJobs
                                ? `${pagination.totalJobs} open role${
                                      pagination.totalJobs === 1 ? "" : "s"
                                  } ready for review`
                                : "Fresh opportunities, updated regularly"}
                        </p>
                    </div>

                    <div className="sort-control">
                        <label htmlFor="sort-jobs">Sort by</label>
                        <select
                            id="sort-jobs"
                            className="input sort-select"
                            value={sortBy}
                            onChange={(e) => {
                                setSortby(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="newest">Newest First</option>
                            <option value="salary">Salary: High to Low</option>
                        </select>
                    </div>
                </div>

                {loading && (
                    <div className="job-grid" aria-hidden="true">
                        {[0, 1, 2].map((item) => (
                            <div className="job-card skeleton-card" key={item}>
                                <div className="skeleton-card-head">
                                    <div className="skeleton skeleton-avatar" />
                                    <div className="skeleton-card-heading">
                                        <div className="skeleton skeleton-line skeleton-line-lg" />
                                        <div className="skeleton skeleton-line skeleton-line-sm" />
                                    </div>
                                </div>
                                <div className="skeleton skeleton-line" />
                                <div className="skeleton skeleton-line skeleton-line-sm" />
                            </div>
                        ))}
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
                                <circle
                                    cx="11"
                                    cy="11"
                                    r="6.5"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                />
                                <path
                                    d="m16 16 4.5 4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                        <h3>No matching jobs found</h3>
                        <p>
                            Try a different job title, skill, or location to
                            discover more opportunities.
                        </p>
                    </div>
                )}

                {!loading && !error && jobs.length > 0 && (
                    <div className="job-grid">
                        {jobs.map((job) => (
                            <article
                                key={job._id}
                                className="job-card animate-in"
                            >
                                <div className="job-card-top">
                                    <div
                                        className="company-avatar"
                                        aria-hidden="true"
                                    >
                                        {getInitials(job.company)}
                                    </div>

                                    <div className="job-card-heading">
                                        <h3>
                                            <Link
                                                to={`/jobs/${job._id}`}
                                                className="job-title-link"
                                            >
                                                {job.title}
                                            </Link>
                                        </h3>
                                        <p className="company-name">
                                            {job.company}
                                        </p>
                                    </div>

                                    <span className="badge badge-type">
                                        {formatJobType(job.jobtype)}
                                    </span>
                                </div>

                                <div className="job-meta">
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
                                </div>

                                <div className="job-card-footer">
                                    <span className="posted-date">
                                        {formatDate(job.createdAt)}
                                    </span>
                                    <Link
                                        to={`/jobs/${job._id}`}
                                        className="btn btn-outline btn-sm job-view-btn"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {!loading && !error && jobs.length > 0 && (
                    <div className="pagination">
                        <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setPage(page - 1)}
                            disabled={loading || page <= 1}
                        >
                            Previous
                        </button>

                        <span className="pagination-info">
                            Page {pagination?.currentPage ?? page} of{" "}
                            {pagination?.totalPages ?? 0}
                        </span>

                        <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setPage(page + 1)}
                            disabled={
                                loading || page >= (pagination?.totalPages ?? 0)
                            }
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Home;
