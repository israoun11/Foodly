import { apiClient } from "./apiClient.js";

/** @param {{name: string, email: string, password: string}} payload */
export async function registerUser(payload) {
  const { data } = await apiClient.post("/auth/register", payload);
  return data.data.user;
}

/** @param {{email: string, password: string}} payload */
export async function loginUser(payload) {
  const { data } = await apiClient.post("/auth/login", payload);
  return data.data.user;
}

export async function logoutUser() {
  await apiClient.post("/auth/logout");
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get("/users/me");
  return data.data.user;
}
