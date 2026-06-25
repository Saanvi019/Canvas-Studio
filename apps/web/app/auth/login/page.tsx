"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../src/store/auth-store";
import { api } from "../../../src/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      setAuth(response.data.accessToken, response.data.user);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-slate-800 rounded-3xl bg-slate-900/20 p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>

          <p className="text-slate-400">Sign in to continue to CanvasStudio</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-slate-300">Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 outline-none focus:border-violet-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition font-medium"
          >
            Sign In
          </button>
        </div>

        <p className="text-center text-slate-400 mt-8">
          {"Don't have an account?"}{" "}
          <Link
            href="/auth/register"
            className="text-violet-400 hover:text-violet-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
