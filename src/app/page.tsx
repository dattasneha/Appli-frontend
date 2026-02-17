"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const jobs = [
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote" },
    { id: 2, title: "Backend Engineer", company: "DevSolutions", location: "San Francisco, CA" },
    { id: 3, title: "UI/UX Designer", company: "DesignHub", location: "New York, NY" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      
      <nav className="flex items-center justify-between p-6 bg-white dark:bg-black shadow-md">
        <div className="flex items-center gap-4">
          <span className="font-extrabold text-2xl text-black dark:text-zinc-100">Appli</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => router.push("/login")}
            className="px-4 py-2 rounded-md border border-zinc-900 dark:border-zinc-50 text-black dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            Login
          </button>
          <button 
            onClick={() => router.push("/register")}
            className="px-4 py-2 rounded-md bg-black text-white hover:bg-zinc-900 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200">
            Register
          </button>
        </div>
      </nav>

    
      <main className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6">
          Job Listings
        </h1>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50">{job.title}</h2>
              <p className="text-zinc-600 dark:text-zinc-400">{job.company}</p>
              <p className="text-zinc-500 dark:text-zinc-400">{job.location}</p>
              <button className="mt-4 px-4 py-2 rounded-md bg-black text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
