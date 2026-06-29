import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import LearningPath from "./pages/LearningPath";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewHistory from "./pages/InterviewHistory";
import InterviewSession from "./pages/InterviewSession";
import InterviewResults from "./pages/InterviewResults";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Redirect root */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        {/* Interview Setup */}
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <InterviewSetup />
              </>
            </ProtectedRoute>
          }
        />

        {/* Interview History */}
        <Route
          path="/interview/history"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <InterviewHistory />
              </>
            </ProtectedRoute>
          }
        />

        {/* Interview Session */}
        <Route
          path="/interview/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <InterviewSession />
              </>
            </ProtectedRoute>
          }
        />

        {/* Interview Results */}
        <Route
          path="/interview/:id/results"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <InterviewResults />
              </>
            </ProtectedRoute>
          }
        />

        {/* Learning Path */}
        <Route
          path="/learning"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <LearningPath />
              </>
            </ProtectedRoute>
          }
        />

        {/* Resume Analyzer */}
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ResumeAnalyzer />
              </>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Profile />
              </>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}