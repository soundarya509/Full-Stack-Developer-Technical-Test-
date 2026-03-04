import { useState, useCallback } from "react";
import { loginUser } from "../api";

const STORAGE_KEY = "remembered_username";

/**
 * Custom hook encapsulating all authentication logic.
 * Handles login, logout, error state, loading state,
 * and persisting the username across sessions.
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /** Retrieve the last successfully-logged-in username from localStorage */
  const getRememberedUsername = useCallback(() => {
    return localStorage.getItem(STORAGE_KEY) || "";
  }, []);

  /**
   * Attempt to log in with the supplied credentials.
   * On success: persists username and updates user state.
   * On failure: sets a descriptive error message.
   */
  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await loginUser(username, password);
      localStorage.setItem(STORAGE_KEY, data.username);
      setUser({ username: data.username });
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Clear auth state (does NOT remove remembered username) */
  const logout = useCallback(() => {
    setUser(null);
    setError("");
  }, []);

  return {
    user,
    error,
    isLoading,
    login,
    logout,
    getRememberedUsername,
  };
}
