import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthControllerApi, LoginRequest } from "../api";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const UsernameInputRef = useRef<HTMLInputElement>(null);

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("error");

    useEffect(() => {
        UsernameInputRef.current?.focus(); // Focus on the email input
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    // Snackbar handlers
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Simulate login action
    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const authentication: AuthControllerApi = new AuthControllerApi();
        let loginRequest: LoginRequest = {
            username: credentials.username,
            password: credentials.password,
        };
        authentication
            .login(loginRequest)
            .then((response) => {
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    let token: string = (response.data as { token: string }).token;
                    if (token) {
                        localStorage.setItem("jwtToken", token);
                    }

                    // Immediately navigate to the home page
                    navigate("/");
                }
            })
            .catch((error) => {
                // Show error snackbar
                setSnackbarMessage(
                    "Invalid credentials. Please try again. " + error.message
                );
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Show Login Form if Not Logged In */}
            {!isLoggedIn && (
                <Box
                    sx={{
                        height: "calc(100vh - 64px)", // Adjust for navbar height
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: 2,
                    }}
                >
                    {/* Heading */}
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 3,
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Log In to Access the Platform
                    </Typography>

                    {/* Login Form */}
                    <Box
                        component="form"
                        onSubmit={login}
                        sx={{
                            width: "90%",
                            maxWidth: "400px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {/* Email Input */}
                        <TextField
                            label="Username"
                            name="username"
                            inputRef={UsernameInputRef}
                            value={credentials.username}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        {/* Password Input */}
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        {/* Login Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Log In
                        </Button>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: "center",
                                mt: 2,
                                color: "text.secondary",
                            }}
                        >
                            Don't have an account?{" "}
                            <Button
                                component="a"
                                href="/register"
                                variant="text"
                                size="small"
                                sx={{ padding: 0 }}
                            >
                                Register
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* Snackbar for error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000} // Automatically closes after 5 seconds
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default LoginPage;