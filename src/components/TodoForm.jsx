import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const clean = title.trim();
    if (!clean || busy) return;
    setBusy(true);
    const ok = await onAdd(clean);
    if (ok) setTitle("");
    setBusy(false);
  };

  return (
    <form className="todo-form" onSubmit={submit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        maxLength={200}
        aria-label="New task"
      />
      <button type="submit" className="btn btn-primary" disabled={busy || !title.trim()}>
        {busy ? "Adding…" : "Add task"}
      </button>
    </form>
  );
}
