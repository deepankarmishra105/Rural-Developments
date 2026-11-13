import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Deepankar from "./Deepankar";
import Government from "./Government File/Government";
import JobsSkills from "./job and skill/Jobsskills";
import Student from "./Student";
import Farmer from "./Farmer corner/Farmer";

// Loaded only when the user visits "/" or "/login"
const Landind = lazy(() => import("./Landing File/Landind"));
const Auth = lazy(() => import("./Auth"));

// Set VITE_SKIP_LOGIN=true in .env.local to open pages without login (dev only)
const SKIP_LOGIN = import.meta.env.VITE_SKIP_LOGIN === "false";

function Loading() {
  return <div style={{ padding: 40, color: "white" }}>Loading...</div>;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (SKIP_LOGIN) return children;
  if (isLoading) return <Loading />;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  const { error } = useAuth0();

  return (
    <>
      {error && (
        <div style={{ background: "#7f1d1d", color: "white", padding: 12 }}>
          Login error: {error.message}
        </div>
      )}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Landind />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Auth />
            </PublicOnlyRoute>
          }
        />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Deepankar /></ProtectedRoute>} />
        <Route path="/schemes" element={<ProtectedRoute><Government /></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute><Student /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobsSkills /></ProtectedRoute>} />
        <Route path="/farmer" element={<ProtectedRoute><Farmer /></ProtectedRoute>} />

        {/* Unknown URL -> landing page, never a blank screen */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}