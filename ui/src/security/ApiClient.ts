import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios";
import {BASE_PATH} from "../api/base.ts";
import {useNavigate} from "react-router-dom";

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_PATH, // Replace with your base API URL
    timeout: 5000,
});

// Add a request interceptor to inject headers (like Authorization token)
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("jwtToken"); // Get token from localStorage (or any auth state)

        if (token) {
            // Add the Authorization header
            config.headers = config.headers || {}; // Ensure headers object exists
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; // Return the modified config
    },
    (error) => {
        const navigate = useNavigate();
        navigate("/login");
        // Handle request error
        return Promise.reject(error);
    }
);

export default apiClient;