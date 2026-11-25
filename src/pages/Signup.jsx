import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard.jsx";
import InputField from "../components/InputField.jsx";
import Notice from "../components/Notice.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signUp, signOut } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords don't match.");

    setBusy(true);
    try {
      const { data, error: err } = await signUp(form.email.trim(), form.password, form.name.trim());
      if (err) throw err;

      // If email confirmation is off, Supabase logs the user in right away.
      // Sign out so the flow is always: sign up -> login page -> todos.
      const needsConfirm = !data.session;
      if (data.session) await signOut();

      navigate("/login", {
        replace: true,
        state: {
          message: needsConfirm
            ? "Account created. Confirm the email we sent you, then log in."
            : "Account created. Log in to open your tasks.",
          email: form.email.trim(),
        },
      });
    } catch (err) {
      setError(err.message || "Could not create your account. Check your connection and try again.");
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
        <h1>Create your account</h1>
        <p className="sub">Your tasks stay private. Nobody else can see them.</p>

        <form onSubmit={submit} className="auth-form">
          <InputField label="Full name" value={form.name} onChange={set("name")} autoComplete="name" required />
          <InputField label="Email" type="email" value={form.email} onChange={set("email")} autoComplete="email" required />
          <InputField label="Password" type="password" value={form.password} onChange={set("password")} autoComplete="new-password" required />
          <InputField label="Confirm password" type="password" value={form.confirm} onChange={set("confirm")} autoComplete="new-password" required />
          <Notice kind="error">{error}</Notice>
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {busy ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </GlassCard>
    </main>
  );
}
