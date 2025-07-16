import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Ensure this is set to http://13.233.154.67:8000/api/v1/

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for HTTP-only cookie auth
});