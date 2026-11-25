import { useState } from "react";

export default function TodoItem({ todo, onToggle, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  const startEdit = () => {
    setDraft(todo.title);
    setEditing(true);
  };

  const save = async () => {
    const clean = draft.trim();
    if (!clean) return;
    if (clean !== todo.title) {
      const saved = await onSave(todo.id, { title: clean });
      if (!saved) return;
    }
    setEditing(false);
  };

  const onKey = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") setEditing(false);
  };

  return (
    <li className={`todo ${todo.is_completed ? "todo-done" : ""}`}>
      <button
        type="button"
        className="check"
        role="checkbox"
        aria-checked={todo.is_completed}
        aria-label={todo.is_completed ? "Mark as not done" : "Mark as done"}
        onClick={() => onToggle(todo)}
      >
        {todo.is_completed ? "✓" : ""}
      </button>

      {editing ? (
        <input
          className="todo-edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          maxLength={200}
          autoFocus
          aria-label="Edit task"
        />
      ) : (
        <span className="todo-title">{todo.title}</span>
      )}

      <div className="todo-actions">
        {editing ? (
          <>
            <button type="button" className="btn btn-small btn-primary" onClick={save}>
              Save
            </button>
            <button type="button" className="btn btn-small btn-ghost" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-small btn-ghost" onClick={startEdit}>
              Edit
            </button>
            <button type="button" className="btn btn-small btn-danger" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
