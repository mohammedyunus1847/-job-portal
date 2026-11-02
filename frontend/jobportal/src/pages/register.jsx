import { useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../components/brandlogo";
import "../styles/auth.css";

function Register() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("jobseeker");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setIsError(false);

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Name: name,
                    Email: email,
                    Password: password,
                    Role: role,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registeration Failed");
            }
            setMessage(data.message || "Registration Successfull");

            setName("");
            setEmail("");
            setPassword("");
            setRole("jobseeker");
        } catch (error) {
            setIsError(true);
            setMessage(error.message || "Something Went Wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card card animate-in">
                <div className="auth-header">
                    <BrandLogo variant="dark" className="auth-logo" />
                    <h1>Create your account</h1>
                    <p>Join as a job seeker or recruiter in a few seconds.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="register-name">Full name</label>
                        <input
                            id="register-name"
                            className="input"
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="register-email">Email</label>
                        <input
                            id="register-email"
                            className="input"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="register-password">Password</label>
                        <div className="password-field">
                            <input
                                id="register-password"
                                className="input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword((previous) => !previous)}
                                aria-label={
                                    showPassword ? "Hide password" : "Show password"
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <span className="form-hint">Use at least 6 characters.</span>
                    </div>

                    <div className="form-field">
                        <label htmlFor="register-role">I am a</label>
                        <select
                            id="register-role"
                            className="input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="jobseeker">Job Seeker</option>
                            <option value="Recruiter">Recruiter</option>
                        </select>
                    </div>

                    {message && (
                        <p
                            className={`form-message ${
                                isError ? "error" : "success"
                            }`}
                            role={isError ? "alert" : "status"}
                        >
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
