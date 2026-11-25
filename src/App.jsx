import { Navigate, Route, Routes } from "react-router-dom";
import Background from "./components/Background.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import ConfigWarning from "./components/ConfigWarning.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Todos from "./pages/Todos.jsx";
import { isSupabaseConfigured } from "./lib/supabaseClient.js";

export default function App() {
  return (
    <>
      <Background />
      {!isSupabaseConfigured && <ConfigWarning />}
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Todos />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
