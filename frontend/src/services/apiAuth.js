import { axiosInstance } from "../../axios";

// Signup user with image
export async function signup({
  fullName,
  email,
  password,
  passwordConfirm,
  image,
}) {
  const formData = new FormData();
  formData.append("name", fullName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("passwordConfirm", passwordConfirm);
  if (image) formData.append("image", image);

  const { data } = await axiosInstance.post("/users/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}



// Login user
export async function login({ email, password }) {
  try {
    const { data } = await axiosInstance.post("/users/login", {
      email,
      password,
    });

    // 🔐 Store token in localStorage
    localStorage.setItem("jwt", data.token);
    console.log(data)

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}


// Logout (just expire the cookie from backend if needed)
export async function logout() {
  try {
    localStorage.removeItem("jwt"); // 🧹 Clear token from localStorage
    // Optional: call backend to expire cookie (if cookie strategy is used again)
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
