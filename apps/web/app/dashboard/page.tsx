"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "../../src/store/auth-store";
import { api } from "../../src/lib/api";

export default function DashboardPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");

      logout();

      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>{user.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
