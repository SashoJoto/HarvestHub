import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { AuthControllerApi, RegisterRequest } from "../api"; // Import the API
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }); // Form state for registration

    const [error, setError] = useState<string | null>(null); // Track both errors and submission status

    // Handle form value changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle registration form submission
    const handleRegister = () => {
        const { username, email, password, confirmPassword } = formData;

        // Basic validation (additional validation could be added per app requirements)
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const authController = new AuthControllerApi();
        const registerRequest: RegisterRequest = {
            username: username,
            email: email,
            password: password,
        };

        authController
            .register(registerRequest) // Assuming you have a `register` method in your API
            .then((response) => {
                if (response.status === 200) {
                    navigate("/login"); // Redirect to login page after successful registration
                }
            })
            .catch((error) => {
                setError(error.message || "Failed to register. Please try again.");
            });
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Registration Form */}
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
                    Create a New Account
                </Typography>

                <Box
                    component="form"
                    sx={{
                        width: "90%",
                        maxWidth: "400px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {/* Username Input */}
                    <TextField
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Email Input */}
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Password Input */}
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Confirm Password Input */}
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Display Error If Any */}
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{ textAlign: "center" }}
                        >
                            {error}
                        </Typography>
                    )}

                    {/* Register Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleRegister}
                    >
                        Register
                    </Button>

                    {/* Redirect to Login */}
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: "center",
                            mt: 2,
                            color: "text.secondary",
                        }}
                    >
                        Already have an account?{" "}
                        <Button
                            component="a"
                            href="/login"
                            variant="text"
                            size="small"
                            sx={{ padding: 0 }}
                        >
                            Log In
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default RegisterPage;