import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
    const navigate = useNavigate();
    const { login, signUp } = useAuth();

    // Login State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // Signup State
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupError, setSignupError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            setLoginError("Please fill in all fields");
            return;
        }
        login(loginEmail, loginPassword);
        navigate("/");
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (!signupName || !signupEmail || !signupPassword) {
            setSignupError("Please fill in all fields");
            return;
        }
        signUp(signupName, signupEmail, signupPassword);
        navigate("/"); // Or redirect to login or dashboard as appropriate
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>

                {/* Login Section */}
                <div style={styles.section}>
                    <div style={styles.header}>
                        <h2 style={styles.title}>Welcome Back</h2>
                        <p style={styles.subtitle}>Sign in to your account</p>
                    </div>

                    {loginError && <div style={styles.error}>{loginError}</div>}

                    <form onSubmit={handleLogin} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input
                                placeholder="your@email.com"
                                type="email"
                                value={loginEmail}
                                onChange={(e) => {
                                    setLoginEmail(e.target.value);
                                    setLoginError("");
                                }}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                placeholder="••••••••"
                                type="password"
                                value={loginPassword}
                                onChange={(e) => {
                                    setLoginPassword(e.target.value);
                                    setLoginError("");
                                }}
                                style={styles.input}
                            />
                        </div>

                        <button type="submit" style={styles.button}>
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Divider */}
                <div style={styles.divider}>
                    <div style={styles.dividerLine}></div>
                    <span style={styles.dividerText}>OR</span>
                    <div style={styles.dividerLine}></div>
                </div>

                {/* Signup Section */}
                <div style={styles.section}>
                    <div style={styles.header}>
                        <h2 style={styles.title}>Create Account</h2>
                        <p style={styles.subtitle}>Join RetailEase today</p>
                    </div>

                    {signupError && <div style={styles.error}>{signupError}</div>}

                    <form onSubmit={handleSignup} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Full Name</label>
                            <input
                                placeholder="John Doe"
                                value={signupName}
                                onChange={(e) => {
                                    setSignupName(e.target.value);
                                    setSignupError("");
                                }}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input
                                placeholder="your@email.com"
                                type="email"
                                value={signupEmail}
                                onChange={(e) => {
                                    setSignupEmail(e.target.value);
                                    setSignupError("");
                                }}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                placeholder="••••••••"
                                type="password"
                                value={signupPassword}
                                onChange={(e) => {
                                    setSignupPassword(e.target.value);
                                    setSignupError("");
                                }}
                                style={styles.input}
                            />
                        </div>

                        <button type="submit" style={{ ...styles.button, background: "#333" }}>
                            Create Account
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
        padding: "20px",
    },
    container: {
        display: "flex",
        flexDirection: "row", // Side by side
        width: "100%",
        maxWidth: "900px",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        border: "2px solid #e0e0e0",
        overflow: "hidden",
        flexWrap: "wrap", // Allow wrapping on smaller screens
    },
    section: {
        flex: 1,
        padding: "40px",
        minWidth: "300px",
    },
    header: {
        marginBottom: "32px",
        textAlign: "center",
    },
    title: {
        fontSize: "28px",
        fontWeight: "700",
        margin: "0 0 8px 0",
        color: "#333",
    },
    subtitle: {
        color: "#999",
        margin: 0,
        fontSize: "14px",
        fontWeight: "400",
    },
    error: {
        background: "rgba(244, 67, 54, 0.15)",
        color: "#f44336",
        padding: "12px 16px",
        borderRadius: "8px",
        fontSize: "13px",
        marginBottom: "16px",
        border: "1px solid rgba(244, 67, 54, 0.3)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    label: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#FF9900",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    input: {
        padding: "12px 14px",
        borderRadius: "8px",
        border: "2px solid #e0e0e0",
        outline: "none",
        background: "#fafafa",
        color: "#333",
        fontSize: "14px",
        fontFamily: "inherit",
        transition: "all 0.3s ease",
    },
    button: {
        marginTop: "8px",
        padding: "12px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#FF9900",
        color: "#fff",
        fontSize: "15px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    divider: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
        position: "relative",
    },
    dividerLine: {
        height: "40%",
        width: "1px",
        background: "#e0e0e0",
    },
    dividerText: {
        margin: "10px 0",
        color: "#999",
        fontSize: "12px",
        fontWeight: "600",
    },
};
