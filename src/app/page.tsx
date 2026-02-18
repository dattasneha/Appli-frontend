"use client";

import { useRouter } from "next/navigation";
import { ApiError, jobs } from "@/libs/api";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
}

export default function Home() {
  const router = useRouter();

  const [jobList, setJobList] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await jobs();
        setJobList(data);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
    
      <nav className="flex items-center justify-between p-6 bg-white dark:bg-black shadow-md">
        <span className="font-extrabold text-2xl text-black dark:text-zinc-100">
          Appli
        </span>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 rounded-md border border-zinc-900 dark:border-zinc-50"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 rounded-md bg-black text-white dark:bg-zinc-50 dark:text-black"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">
          Job Listings
        </h1>

        {/* Error */}
        {error && (
          <p className="text-red-500 mb-4 font-medium">
            {error}
          </p>
        )}

        {/* Jobs grid */}
        <div className="grid gap-6">
          {/* Skeleton loader */}
          {loading &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow animate-pulse"
              >
                <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-3" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full mb-2" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
                <div className="mt-4 h-10 w-28 bg-zinc-300 dark:bg-zinc-700 rounded" />
              </div>
            ))}

          {!loading &&
            jobList.map((job) => (
              <div
                key={job.id}
                className="p-3 bg-white dark:bg-zinc-900 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                  {job.title}
                </h2>

                <p className="text-zinc-600 dark:text-zinc-400 line-clamp-1">
                  {job.description}
                </p>

                <div className="flex gap-4 shrink-0">
                <button className="mt-3 px-3 py-1.5 text-sm rounded-md bg-black text-white dark:bg-zinc-50 dark:text-black hover:opacity-90">
                  View Details
                </button>

                <button className="mt-3 px-3 py-1.5 text-sm rounded-md border border-black dark:border-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  Apply Now
                </button>
                </div>
              </div>
            ))}

          {!loading && jobList.length === 0 && !error && (
            <p className="text-zinc-500">
              No jobs available at the moment.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
