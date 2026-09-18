import { createContext, useCallback, useEffect, useState } from "react";
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService.js";
import { normalizeApiError } from "../services/apiClient.js";

export const AuthContext = createContext(null);

/**
 * Provides authentication state to the app. Checks for an existing
 * session on load (via the httpOnly cookie, if present) so a page
 * refresh doesn't lose the login. This talks to a real backend —
 * only the Account page's *content* (saved/favorites/recent) is
 * mocked for now, per the current scope.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchCurrentUser()
      .then((currentUser) => isMounted && setUser(currentUser))
      .catch(() => isMounted && setUser(null))
      .finally(() => isMounted && setIsCheckingSession(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const loggedInUser = await loginUser(credentials);
      setUser(loggedInUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: normalizeApiError(error) };
    }
  }, []);

  const register = useCallback(async (payload) => {
    try {
      const newUser = await registerUser(payload);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: normalizeApiError(error) };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isCheckingSession,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
