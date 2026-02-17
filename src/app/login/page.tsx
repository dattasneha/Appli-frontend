"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState<"user" | "admin">("user");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (role === "admin") router.push("/dashboard/admin");
    else router.push("/dashboard/user");
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

        {/* Role Switch */}
        <div className="flex items-center justify-center mb-8 bg-zinc-100 dark:bg-zinc-800 rounded-full p-1">
          <button
            type="button"
            onClick={() => setRole("user")}
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
            className={`w-1/2 py-2 rounded-full transition font-medium ${
              role === "admin"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          required
          className="w-full mb-4 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-6 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition font-medium"
        >
          Login as {role === "admin" ? "Admin" : "User"}
        </button>

        <p className="text-center text-zinc-500 dark:text-zinc-400 mt-6 text-sm">
          Don’t have an account?{" "}
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
