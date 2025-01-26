import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Normalize CSS and reset styles
import AppRoutes from "./routes/AppRoutes"; // Your application routes
import theme from "./styles/theme";
import axios from "axios";       // Import the custom theme

const App: React.FC = () => {
    axios.interceptors.request.use((config) => {
        if(config.url && config.url.match(/login$/)) {
            localStorage.removeItem("jwtToken");
            return config;
        }
        const token = localStorage.getItem("jwtToken"); // Get token from localStorage (or any other source)
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => Promise.reject(error));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
        </ThemeProvider>
    );
};

export default App;