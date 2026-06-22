"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../src/lib/api";
import { useAuthStore } from "../../../src/store/auth-store";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleRegister = async () => {
    try {
      const response = await api.post("/api/auth/register", {
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
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
