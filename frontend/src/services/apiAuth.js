import { axiosInstance } from "../../axios";
import { withTestDataFallback } from "../test-data/apiFallback";
import { testUser } from "../test-data/test-user";

// NOTE: All original backend API code is preserved below.
// The withTestDataFallback wrapper only activates when backend is unavailable.
// When backend is available, original API calls execute normally.

// Signup user with image
export async function signup({
  fullName,
  email,
  password,
  passwordConfirm,
  image,
}) {
  return withTestDataFallback(
    async () => {
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

      localStorage.setItem('jwt', data.token);
      localStorage.setItem('userId', data.data?.user?._id || data.data?.user?.id || data.user?._id || data.user?.id);
      return {
        token: data.token,
        user: data.data?.user || data.user,
        data: data.data || data,
      };
    },
    () => {
      // For test data, simulate signup
      const token = "test-token-" + Date.now();
      localStorage.setItem("jwt", token);
      localStorage.setItem("userId", testUser._id);
      return {
        status: "success",
        token,
        data: { user: { ...testUser, name: fullName, email } },
      };
    }
  );
}



// Login user
export async function login({ email, password }) {
  // Check if this is demo credentials - use test data ONLY for demo
  if (email === "demo@wildoasis.com" && password === "demo123") {
    const token = "test-token-" + Date.now();
    localStorage.setItem("jwt", token);
    localStorage.setItem("userId", testUser._id);
    
    return {
      status: "success",
      token,
      user: testUser,
    };
  }

  // For ALL other users (including admin), use backend - NO fallback to test data
  try {
    const { data } = await axiosInstance.post("/users/login", {
      email,
      password,
    });

    // Real user login successful
    // Handle different response structures
    const user = data?.user || data?.data?.user || data;
    const token = data?.token || data?.data?.token;
    const userId = user?._id || user?.id || data?.user?._id || data?.user?.id;
    
    if (!token || !user) {
      throw new Error("Invalid response from server");
    }
    
    localStorage.setItem("jwt", token);
    localStorage.setItem("userId", userId);
    
    console.log("Real user logged in:", { email: user.email, name: user.name || user.fullName });
    
    return {
      status: "success",
      token: token,
      user: user,
    };
  } catch (error) {
    // For real users, NEVER fallback to test data - always throw error
    // This ensures real users only work with real backend
    console.error("Login error for real user:", error);
    throw error;
  }
}


// Logout (just expire the cookie from backend if needed)
export async function logout() {
  try {
    // Clear all auth data
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    // Optional: call backend to expire cookie (if cookie strategy is used again)
    // await axiosInstance.post("/users/logout");
  } catch (error) {
    // Even if there's an error, clear local storage
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
  }
}


// Get current user
export async function getCurrentUser() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("jwt");
  
  if (!userId && !token) {
    return null;
  }

  // Check if this is a test token - if so, use test data
  if (token && token.startsWith("test-token")) {
    return testUser;
  }

  // For real users, ALWAYS try backend - NO fallback to test data
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    // Handle different response structures from backend
    // Backend returns: { status: 'success', data: { user } }
    const user = response?.data?.data?.user || response?.data?.user || response?.data;
    if (user) {
      console.log("Fetched real user:", { email: user.email, name: user.name || user.fullName });
      return user;
    }
    console.warn("No user data in response");
    return null;
  } catch (error) {
    // For real users, if backend fails, return null (don't use test data)
    // This ensures real users only see real data
    if (error.response?.status === 401 || error.response?.status === 404) {
      // Token invalid or user not found - clear storage
      console.log("Token invalid, clearing storage");
      localStorage.removeItem("jwt");
      localStorage.removeItem("userId");
      return null;
    }
    // For network errors with real token, return null (user will see loading/error state)
    console.error("Error fetching user:", error);
    return null;
  }
}

// Update user password
export async function updateCurrentUserPassword({ password }) {
  return withTestDataFallback(
    async () => {
      const { data } = await axiosInstance.patch("/users/updateMyPassword", {
        password,
      });
      return data;
    },
    () => {
      // For test data, just return success
      return { status: "success", message: "Password updated" };
    }
  );
}

export async function updateCurrentUser(updatedData) {
  const token = localStorage.getItem("jwt");
  
  // Check if this is test token - use test data
  if (token && token.startsWith("test-token")) {
    const updatedUser = {
      ...testUser,
      name: updatedData.fullName || testUser.name,
      email: updatedData.email || testUser.email,
      photo: updatedData.avatar ? URL.createObjectURL(updatedData.avatar) : testUser.image,
      image: updatedData.avatar ? URL.createObjectURL(updatedData.avatar) : testUser.image,
    };
    return {
      user: updatedUser,
    };
  }

  // For real users, use backend
  try {
    const formData = new FormData();
    formData.append("name", updatedData.fullName);
    formData.append("email", updatedData.email);
    if (updatedData.avatar) {
      formData.append("image", updatedData.avatar);
    }
    formData.append("_id", updatedData.id);

    const response = await axiosInstance.patch('/users/updateCurrentUser',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    // Handle different response structures from backend
    // Backend returns: { status: 'success', data: user }
    const user = response?.data?.data || response?.data?.user || response?.data || response;
    return {
      user: user,
    };
  } catch (error) {
    // Only fallback if backend is unavailable
    if (error.code === "ERR_NETWORK" || error.message?.includes("Network Error") || error.response?.status >= 500) {
      throw new Error("Backend unavailable. Please try again later.");
    }
    throw error;
  }
}
