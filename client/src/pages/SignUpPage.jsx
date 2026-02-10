import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    signUp(name, email, password);
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join RetailEase today</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={submit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              placeholder="John Doe"
              value={name}
              onChange={e => {
                setName(e.target.value);
                setError("");
              }}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setError("");
              }}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError("");
              }}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        <div style={styles.divider} />

        <p style={styles.signinText}>
          Already have an account?{" "}
          <span
            style={styles.signinLink}
            onClick={() => navigate("/login")}
          >
            Sign in here
          </span>
        </p>
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
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    borderRadius: "12px",
    background: "#ffffff",
    border: "2px solid #e0e0e0",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    color: "#333",
  },
  cardHeader: {
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
    gap: "16px"
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
    border: "2px solid #FF9900",
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
    height: "1px",
    background: "#e0e0e0",
    margin: "24px 0",
  },
  signinText: {
    textAlign: "center",
    color: "#555",
    fontSize: "13px",
    margin: 0,
  },
  signinLink: {
    color: "#FF9900",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "none",
    transition: "color 0.3s ease",
  }
};
