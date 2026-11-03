import { useId } from "react";
import "../styles/brand.css";

function BrandLogo({ variant = "dark", compact = false, className = "" }) {
    const gradientId = `nexhire-gradient-${useId().replace(/:/g, "")}`;
    const variantClass =
        variant === "light" ? "brand-logo-light" : "brand-logo-dark";
    const compactClass = compact ? "brand-logo-compact" : "";

    return (
        <span
            className={`brand-logo ${variantClass} ${
                compact ? "brand-logo-compact" : ""
            } ${className}`.trim()}
            role="img"
            aria-label="NEXHIRE"
        >
            <svg
                className="nexhire-symbol"
                viewBox="0 0 64 64"
                fill="none"
                aria-hidden="true"
                focusable="false"
            >
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="15"
                        y1="49"
                        x2="49"
                        y2="17"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#168BFF" />
                        <stop offset="1" stopColor="#245BFF" />
                    </linearGradient>
                </defs>
                <path
                    d="M15 49V18L41 49"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="8.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M41 49V17"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="8.5"
                    strokeLinecap="round"
                />
                <path
                    d="M33 25L41 17L49 25"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="8.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {!compact && (
                <span className="brand-wordmark" aria-hidden="true">
                    NEXHIRE
                </span>
            )}
        </span>
    );
}

export default BrandLogo;
