import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Single Axios instance for the whole app. `withCredentials` is
 * required so the browser sends/receives the backend's httpOnly
 * auth cookie.
 */
export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/**
 * Normalizes any Axios error into a plain, predictable shape.
 * @param {unknown} error
 * @returns {{ message: string, status: number|null }}
 */
export function normalizeApiError(error) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return {
        message: "Couldn't reach the server. Check your connection and try again.",
        status: null,
      };
    }
    return {
      message: error.response.data?.message || "Something went wrong.",
      status: error.response.status,
    };
  }
  return { message: "An unexpected error occurred.", status: null };
}
