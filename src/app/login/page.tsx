"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "https://appli-oc5h.onrender.com";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/appli/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();

      // Save token
      localStorage.setItem("access_token", data.access_token);

      // Redirect (you can change later if backend sends role)
      router.push("/dashboard/user");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
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

        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition font-medium disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
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
