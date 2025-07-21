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

  localStorage.setItem('jwt', data.token)

  console.log(data)

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
    localStorage.setItem("userId", data.user._id)
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
    // await axiosInstance.post("/users/logout");
  } catch (error) {
    throw new Error("Logout failed");
  }
}


// Get current user
export async function getCurrentUser() {
  try {
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("jwt")
    if(!userId && !token) {
      throw new Error('you are not logged in. Please login again')
    }
    const data  = await axiosInstance.get(`/users/${userId}`);
    // console.log("data from currentUser", data?.data?.data?.user)
    return data?.data?.data?.user;
  } catch (error) {
    console.log("Error from get current user", error)
    return null;
  }
}

// Update user password
export async function updateCurrentUserPassword({ password }) {
  try {
    const { data } = await axiosInstance.patch("/users/updateMyPassword", {
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Update failed");
  }
}

export async function updateCurrentUser(updatedData) {
  // console.log("raw data", updatedData)
 try{
  const formData = new FormData();
  formData.append("name", updatedData.fullName);
  formData.append("email", updatedData.email);
  formData.append("image", updatedData.avatar);
  formData.append("_id", updatedData.id);

   const response = await axiosInstance.patch('/users/updateCurrentUser',
    formData,
    {
      headers: {
      "Content-Type": "multipart/form-data",
    },
    } 
  )
  console.log("responseeeeee", response)
  return response;
 }catch(err) {
  throw new Error('Error', err.message)
 }
}
