"use client";

import { useState } from "react";

interface Application {
  id: number;
  user: string;
  job: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface Job {
  id: number;
  title: string;
  active: boolean;
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([
    { id: 1, user: "John Doe", job: "Frontend Developer", status: "Pending" },
    { id: 2, user: "Jane Smith", job: "Backend Engineer", status: "Pending" },
  ]);

  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: "Frontend Developer", active: true },
    { id: 2, title: "UI/UX Designer", active: true },
  ]);

  // ----- Application actions -----
  const updateStatus = (id: number, status: Application["status"]) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  // ----- Job actions -----
  const closeJob = (id: number) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, active: false } : job
      )
    );
  };

  const deleteJob = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      
      <nav className="flex items-center justify-between p-5 bg-white dark:bg-black shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-zinc-50">
        Admin Dashboard
        </h1>
        <nav className="flex items-center justify-between p-5 bg-white dark:bg-black shadow-md">
        <div className="flex gap-4">
          <button
            className="px-4 py-2 rounded-md border border-zinc-900 dark:border-zinc-50"
          >
            Create Job
          </button>
          <button
            className="px-4 py-2 rounded-md bg-black text-white dark:bg-zinc-50 dark:text-black"
          >
            Logout
          </button>
        </div>
        </nav>
      </nav>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Applications */}
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
            User Applications
          </h2>
          

          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3"
              >
                <div>
                  <p className="font-medium text-black dark:text-zinc-50">
                    {app.user}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {app.job}
                  </p>
                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        app.status === "Approved"
                          ? "text-green-600"
                          : app.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </p>
                </div>

                {app.status === "Pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateStatus(app.id, "Approved")}
                      className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:opacity-90"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(app.id, "Rejected")}
                      className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:opacity-90"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Jobs */}
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
            Available Jobs
          </h2>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3"
              >
                <div>
                  <p className="font-medium text-black dark:text-zinc-50">
                    {job.title}
                  </p>
                  <p
                    className={`text-sm ${
                      job.active ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {job.active ? "Active" : "Closed"}
                  </p>
                </div>

                <div className="flex gap-3">
                  {job.active && (
                    <button
                      onClick={() => closeJob(job.id)}
                      className="px-3 py-1.5 text-sm rounded-md bg-yellow-500 text-white hover:opacity-90"
                    >
                      Close
                    </button>
                  )}

                  <button
                    onClick={() => deleteJob(job.id)}
                    className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:opacity-90"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      
    </div>
  );
}
