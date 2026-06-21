import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./lib/AuthContext";
import ProtectedRoute from "./lib/ProtectedRoute";

import DuelArena from "./pages/DuelArena";
import Lobby from "./pages/Lobby";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Problems from "./pages/Problems";

function ResultStub() {
  const { state } = useLocation();

  return (
    <pre className="p-6 text-ink-100">{JSON.stringify(state, null, 2)}</pre>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/result/:matchId"
            element={
              <ProtectedRoute>
                <ResultStub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Lobby />
              </ProtectedRoute>
            }
          />
          <Route
            path="/duel/:matchId"
            element={
              <ProtectedRoute>
                <DuelArena />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/problems"
            element={
              <ProtectedRoute>
                <Problems />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
