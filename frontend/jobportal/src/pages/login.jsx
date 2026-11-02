import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../components/brandlogo";
import "../styles/auth.css";

function Login() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function Handlesubmit(event) {
        event.preventDefault();

        setLoading(true);
        setMessage("");
        setIsError(false);

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login Failed");
            }
            localStorage.setItem("token", data.token);
            const payload = JSON.parse(atob(data.token.split(".")[1]));
            localStorage.setItem("role", payload.role);
            window.dispatchEvent(new Event("authChange"));
            setMessage("Login Successfull");
            navigate("/");
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
                    <h1>Welcome back</h1>
                    <p>Sign in to manage your applications and job posts.</p>
                </div>

                <form className="auth-form" onSubmit={Handlesubmit}>
                    <div className="form-field">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
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
                        <label htmlFor="login-password">Password</label>
                        <div className="password-field">
                            <input
                                id="login-password"
                                className="input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
