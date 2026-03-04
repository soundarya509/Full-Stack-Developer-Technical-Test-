const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

/**
 * POST /login
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ success: boolean, username?: string, message: string }>}
 */
export async function loginUser(username, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Throw the server's message so callers can display it
    throw Object.assign(new Error(data.message || "Login failed."), {
      status: response.status,
    });
  }

  return data;
}
