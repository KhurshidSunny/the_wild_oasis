import { axiosInstance } from "../../axios";

// Signup user with image
export async function signup({ fullName, email, password, avatar }) {
  try {
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("image", avatar);

    const { data } = await axiosInstance.post("/users/signup", formData);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
}

// Login user
export async function login({ email, password }) {
  try {
    const { data } = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

// Logout (just expire the cookie from backend if needed)
export async function logout() {
  try {
    // You can create /logout route if needed
    await axiosInstance.post("/users/logout");
  } catch (error) {
    throw new Error("Logout failed");
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data } = await axiosInstance.get("/users/me");
    return data;
  } catch (error) {
    return null;
  }
}

// Update user password
export async function updateCurrentUser({ password }) {
  try {
    const { data } = await axiosInstance.patch("/users/updateMyPassword", {
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Update failed");
  }
}
