"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { api } from "../../src/lib/api";
import { useAuthStore } from "../../src/store/auth-store";

import type { Project } from "../../src/types/project";

export default function DashboardPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const token = useAuthStore((state) => state.accessToken);

  const logout = useAuthStore((state) => state.logout);

  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = useCallback(async () => {
    console.log("fetching projects");

    try {
      const response = await api.get("/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("PROJECT RESPONSE", response.data);

      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  async function createProject() {
    try {
      const response = await api.post(
        "/api/projects",
        {
          name: "Untitled Project",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push(`/project/${response.data.project.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!token) return;

    fetchProjects();
  }, [token, fetchProjects]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !token) {
        router.push("/auth/login");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, token, router]);

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  console.log("PROJECTS STATE", projects);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">My Projects</h1>

          <p className="text-slate-400 mt-2">Welcome back, {user?.email}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={createProject}
            className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700"
          >
            New Project
          </button>

          <button
            onClick={() => {
              logout();
              router.push("/auth/login");
            }}
            className="px-5 py-3 rounded-xl border border-slate-700"
          >
            Logout
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="border border-slate-800 rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-semibold mb-3">No Projects Yet</h2>

          <p className="text-slate-400 mb-6">
            Create your first project to get started.
          </p>

          <button
            onClick={createProject}
            className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700"
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => router.push(`/project/${project.id}`)}
              className="cursor-pointer border border-slate-800 rounded-2xl p-6 bg-slate-900/20 hover:border-violet-500 transition"
            >
              <div className="h-40 rounded-xl bg-slate-800 mb-4" />

              <h2 className="text-xl font-semibold">{project.name}</h2>

              <p className="text-slate-400 text-sm mt-2">
                Updated {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
