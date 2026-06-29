import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(formData);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 transition-colors duration-300 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-600">
            IntervAI
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Welcome back! Login to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
             className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:ring-indigo-900/40"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
             className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-800 dark:focus:ring-indigo-900/40"
            />
          </div>

          <button
  type="submit"
  disabled={loading}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? (
    <>
      <Loader2 className="h-5 w-5 animate-spin" />
      Logging in...
    </>
  ) : (
    "Login"
  )}
</button>
        </form>

        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}