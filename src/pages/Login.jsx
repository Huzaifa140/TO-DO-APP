import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard.jsx";
import InputField from "../components/InputField.jsx";
import Notice from "../components/Notice.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { error: err } = await signIn(email.trim(), password);
      if (err) throw err;
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Could not log in. Check your connection and try again.");
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <GlassCard as="section" className="auth-card">
        <div className="brand brand-lg">
          <span className="brand-mark" aria-hidden="true">✓</span>
          <span className="brand-name">Access Todo</span>
        </div>
        <h1>Welcome back</h1>
        <p className="sub">Log in to see your tasks.</p>

        <Notice kind="success">{message}</Notice>

        <form onSubmit={submit} className="auth-form">
          <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          <Notice kind="error">{error}</Notice>
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {busy ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </GlassCard>
    </main>
  );
}
