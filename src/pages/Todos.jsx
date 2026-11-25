import { useMemo, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import Navbar from "../components/Navbar.jsx";
import Notice from "../components/Notice.jsx";
import Spinner from "../components/Spinner.jsx";
import TodoForm from "../components/TodoForm.jsx";
import FilterTabs from "../components/FilterTabs.jsx";
import TodoList from "../components/TodoList.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useTodos } from "../hooks/useTodos.js";

export default function Todos() {
  const { user } = useAuth();
  const { todos, loading, error, dismissError, addTodo, updateTodo, deleteTodo, clearCompleted } =
    useTodos(user.id);
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const done = todos.filter((t) => t.is_completed).length;
    return { all: todos.length, active: todos.length - done, done };
  }, [todos]);

  const visible = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.is_completed);
    if (filter === "done") return todos.filter((t) => t.is_completed);
    return todos;
  }, [todos, filter]);

  const firstName = (user.user_metadata?.full_name || "").split(" ")[0];

  return (
    <div className="app-shell">
      <Navbar />
      <main className="todo-page">
        <GlassCard as="section" className="todo-card">
          <h1>{firstName ? `${firstName}'s tasks` : "Your tasks"}</h1>
          <p className="sub">
            {counts.active === 0
              ? "Nothing left to do."
              : `${counts.active} left to do, ${counts.done} done.`}
          </p>

          <TodoForm onAdd={addTodo} />
          <Notice kind="error" onClose={dismissError}>{error}</Notice>
          <FilterTabs value={filter} onChange={setFilter} counts={counts} />

          {loading ? (
            <Spinner label="Loading your tasks" />
          ) : (
            <TodoList
              todos={visible}
              filter={filter}
              onToggle={(t) => updateTodo(t.id, { is_completed: !t.is_completed })}
              onSave={updateTodo}
              onDelete={deleteTodo}
            />
          )}

          {counts.done > 0 && (
            <div className="card-foot">
              <button type="button" className="btn btn-ghost btn-small" onClick={clearCompleted}>
                Clear completed
              </button>
            </div>
          )}
        </GlassCard>
      </main>
    </div>
  );
}
