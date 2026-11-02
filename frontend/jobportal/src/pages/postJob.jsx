import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function Postjob() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobtype, setJobtype] = useState("FullTime");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            setMessage("");
            setIsError(false);
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Please Login as a reqruiter first");
            }

            const response = await fetch(`${API_URL}/api/job`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    company,
                    location,
                    salary: Number(salary),
                    jobtype,
                    description,
                    skills: skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed To Post A Job ");
            }
            setMessage("Job Posted Successfully");
            setTitle("");
            setCompany("");
            setLocation("");
            setSalary("");
            setJobtype("FullTime");
            setDescription("");
            setSkills("");
        } catch (error) {
            setIsError(true);
            setMessage(
                error.message || "Something Went Wrong Try Again Later"
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="page-shell container">
            <div className="form-page">
                <header className="page-header">
                    <div>
                        <span className="page-kicker">Recruiter</span>
                        <h1>Post a Job</h1>
                        <p>
                            Share the essentials and publish a role in under a
                            minute.
                        </p>
                    </div>
                    <div className="page-header-actions">
                        <Link to="/my-jobs" className="btn btn-outline btn-sm">
                            My posted jobs
                        </Link>
                    </div>
                </header>

                {message && (
                    <div
                        className={`alert ${
                            isError ? "alert-error" : "alert-success"
                        }`}
                        role={isError ? "alert" : "status"}
                    >
                        {message}
                    </div>
                )}

                <form className="form-card card" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-field">
                            <label htmlFor="job-title">Job title</label>
                            <input
                                id="job-title"
                                className="input"
                                type="text"
                                placeholder="e.g. Frontend Developer"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="job-company">Company</label>
                            <input
                                id="job-company"
                                className="input"
                                type="text"
                                placeholder="e.g. Acme Labs"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="job-location">Location</label>
                            <input
                                id="job-location"
                                className="input"
                                type="text"
                                placeholder="e.g. Remote / Bengaluru"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="job-salary">Salary</label>
                            <input
                                id="job-salary"
                                className="input"
                                type="text"
                                inputMode="decimal"
                                placeholder="e.g. 800000"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="job-type">Job type</label>
                            <select
                                id="job-type"
                                className="input"
                                value={jobtype}
                                onChange={(e) => setJobtype(e.target.value)}
                            >
                                <option value="FullTime">Full Time</option>
                                <option value="PartTime">Part Time</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="job-skills">Skills</label>
                            <input
                                id="job-skills"
                                className="input"
                                type="text"
                                placeholder="React, Node.js, MongoDB"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                required
                            />
                            <span className="form-hint">
                                Separate skills with commas.
                            </span>
                        </div>

                        <div className="form-field form-field-full">
                            <label htmlFor="job-description">Description</label>
                            <textarea
                                id="job-description"
                                className="input"
                                placeholder="Describe the role, responsibilities, and what makes it a great opportunity."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? "Publishing..." : "Publish job"}
                        </button>
                        <Link to="/my-jobs" className="btn btn-ghost">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Postjob;
