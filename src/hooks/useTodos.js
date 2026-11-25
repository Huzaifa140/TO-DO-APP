import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export function useTodos(userId) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!userId) {
      setTodos([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data, error: err } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (err) throw err;
      setTodos(data ?? []);
    } catch (err) {
      setError(err.message || "Could not load your tasks. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const addTodo = async (title) => {
    try {
      const { data, error: err } = await supabase
        .from("todos")
        .insert({ title, user_id: userId })
        .select()
        .single();
      if (err) throw err;
      setTodos((prev) => [data, ...prev]);
      return true;
    } catch (err) {
      setError(err.message || "Could not add this task.");
      return false;
    }
  };

  const updateTodo = async (id, patch) => {
    try {
      const { data, error: err } = await supabase
        .from("todos")
        .update(patch)
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();
      if (err) throw err;
      setTodos((prev) => prev.map((todo) => (todo.id === id ? data : todo)));
      return true;
    } catch (err) {
      setError(err.message || "Could not update this task.");
      return false;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const { error: err } = await supabase
        .from("todos")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (err) throw err;
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      return true;
    } catch (err) {
      setError(err.message || "Could not delete this task.");
      return false;
    }
  };

  const clearCompleted = async () => {
    try {
      const { error: err } = await supabase
        .from("todos")
        .delete()
        .eq("user_id", userId)
        .eq("is_completed", true);
      if (err) throw err;
      setTodos((prev) => prev.filter((todo) => !todo.is_completed));
    } catch (err) {
      setError(err.message || "Could not clear completed tasks.");
    }
  };

  return {
    todos,
    loading,
    error,
    dismissError: () => setError(""),
    addTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
  };
}
