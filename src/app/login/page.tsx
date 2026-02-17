"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/libs/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const loggedInUser = await login({ email, password });
      // Redirect based on user role from JWT
      const role = loggedInUser?.role || "user";
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-8">
          Welcome Back
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full mb-4 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full mb-6 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-zinc-500 dark:text-zinc-400 mt-6 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-black dark:text-white font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}