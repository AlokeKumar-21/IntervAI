import { NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const items = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/interview", label: "Interview" },
    { path: "/interview/history", label: "History" },
    { path: "/learning", label: "Learning Path" },
    { path: "/resume", label: "Resume" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-slate-200
        bg-white/80
        backdrop-blur-xl
        transition-colors duration-300

        dark:border-slate-800
        dark:bg-slate-950/90
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="select-none text-2xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
          IntervAI
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                rounded-xl px-4 py-2 text-sm font-medium
                transition-all duration-300

                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : `
                      text-slate-600
                      hover:bg-indigo-50
                      hover:text-indigo-700

                      dark:text-slate-300
                      dark:hover:bg-slate-800
                      dark:hover:text-white
                    `
                }
                `
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="
              rounded-full
              border border-slate-300
              bg-white
              p-2
              text-slate-700
              transition-all duration-300
              hover:bg-slate-100

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-yellow-300
              dark:hover:bg-slate-800
            "
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Name */}
          <span className="font-medium text-slate-700 transition-colors dark:text-slate-200">
            {user?.fullName}
          </span>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              rounded-xl
              bg-red-500
              px-4
              py-2
              font-medium
              text-white
              transition-all duration-300
              hover:bg-red-600
              hover:shadow-lg
            "
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}