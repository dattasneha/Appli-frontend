"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill in all fields.");
      return;
    }

    // Later you can connect this to backend
    console.log("New Job:", { title, description });

    alert("Job created successfully!");
    router.push("/admin"); // Redirect back to dashboard
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      {/* Header */}
      <nav className="flex items-center justify-between p-5 bg-white dark:bg-black shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50">
          Create New Job
        </h1>

        <button
          onClick={() => router.push("/admin")}
          className="px-4 py-2 rounded-md border border-zinc-900 dark:border-zinc-50 text-black dark:text-zinc-50"
        >
          Back
        </button>
      </nav>

      {/* Form Section */}
      <div className="mt-10 max-w-2xl mx-auto">
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow p-8">
          <h2 className="text-xl font-semibold mb-6 text-black dark:text-zinc-50">
            Job Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Enter job title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                Job Description
              </label>
              <textarea
                rows={5}
                placeholder="Enter job description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="px-4 py-2 rounded-md border border-zinc-900 dark:border-zinc-50 text-black dark:text-zinc-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-black text-white dark:bg-zinc-50 dark:text-black hover:opacity-90"
              >
                Create Job
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}