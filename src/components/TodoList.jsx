import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, filter, onToggle, onSave, onDelete }) {
  if (todos.length === 0) {
    const text =
      filter === "done"
        ? "Nothing finished yet. Tick a task to see it here."
        : filter === "active"
        ? "All caught up. Add a task above to keep going."
        : "No tasks yet. Add your first one above.";
    return <p className="empty">{text}</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onSave={onSave} onDelete={onDelete} />
      ))}
    </ul>
  );
}
