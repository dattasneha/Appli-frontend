"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/libs/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register({ name, email, password, role });
      // Redirect to login after successful registration
      router.push("/login");
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
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-black dark:text-white text-center mb-8">
          Create Account
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Role Switch */}
        <div className="flex items-center justify-center mb-8 bg-zinc-100 dark:bg-zinc-800 rounded-full p-1">
          <button
            type="button"
            onClick={() => setRole("user")}
            disabled={isSubmitting}
            className={`w-1/2 py-2 rounded-full transition font-medium ${
              role === "user"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            disabled={isSubmitting}
            className={`w-1/2 py-2 rounded-full transition font-medium ${
              role === "admin"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Name */}
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full mb-4 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50"
        />

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
          {isSubmitting ? "Creating account..." : `Register as ${role === "admin" ? "Admin" : "User"}`}
        </button>

        <p className="text-center text-zinc-500 dark:text-zinc-400 mt-6 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-black dark:text-white font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}