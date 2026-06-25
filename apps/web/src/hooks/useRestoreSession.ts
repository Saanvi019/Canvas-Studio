"use client";

import { useEffect } from "react";

import { api } from "../lib/api";
import { useAuthStore } from "../store/auth-store";

export function useRestoreSession() {
  const setAuth = useAuthStore((state) => state.setAuth);

  // useRestoreSession.ts

  useEffect(() => {
    async function restoreSession() {
      try {
        console.log("RESTORE START");

        const response = await api.post("/api/auth/refresh");

        console.log("RESTORE SUCCESS", response.data);

        setAuth(response.data.accessToken, response.data.user);
      } catch (error) {
        console.log("RESTORE FAILED", error);
      }
    }

    restoreSession();
  }, [setAuth]);
}
