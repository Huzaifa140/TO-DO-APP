import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const name = user?.user_metadata?.full_name || user?.email;
  const initial = (name || "?").trim().charAt(0).toUpperCase();

  return (
    <header className="navbar glass">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">✓</span>
        <span className="brand-name">Access Todo</span>
      </div>
      <div className="nav-user">
        <span className="avatar" aria-hidden="true">{initial}</span>
        <span className="nav-name" title={user?.email}>{name}</span>
        <button type="button" className="btn btn-ghost" onClick={signOut}>
          Log out
        </button>
      </div>
    </header>
  );
}
