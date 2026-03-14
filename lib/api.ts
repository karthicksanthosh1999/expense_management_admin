import axios from "axios";

const api = axios.create({
  baseURL: "YOUR_API_BASE_URL",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Access token from storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling, e.g., redirect to login on 401
    if (error.response && error.response.status === 401) {
      // Redirect logic here (using React Router's useNavigate hook, if applicable)
    }
    return Promise.reject(error);
  },
);

export default api;
