// Auth utility functions
export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting user from localStorage:", error);
    return null;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
};

export const isAuthenticated = () => {
  return !!getAuthToken() && !!getUser();
};
