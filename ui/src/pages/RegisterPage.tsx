import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { AuthControllerApi, RegisterRequest } from "../api";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(false); // Track registration state
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }); // Form state for registration
    const usernameInputRef = useRef<HTMLInputElement>(null); // Reference for the username field

    // Set the focus on the username field when the page loads
    useEffect(() => {
        usernameInputRef.current?.focus();
    }, []);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle registration form submission
    const register = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page reload
        const { username, email, password, confirmPassword } = formData;

        // Basic validation
        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill out all fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // API call to register
        const authController = new AuthControllerApi();
        const registerRequest: RegisterRequest = {
            username: username,
            email: email,
            password: password,
        };

        authController
            .register(registerRequest)
            .then((response) => {
                if (response.status === 200) {
                    setIsRegistered(true);
                    alert("Registration successful! Redirecting to login...");
                    navigate("/login"); // Redirect to login page after successful registration
                }
            })
            .catch((error) => {
                alert("An error occurred during registration. " + (error.message || "Please try again."));
            });
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Show Registration Form if Not Registered Yet */}
            {!isRegistered ? (
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

                    {/* Registration Form */}
                    <Box
                        component="form"
                        onSubmit={register} // Attach submit handler
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
                            inputRef={usernameInputRef} // Autofocus on the username field
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

                        {/* Register Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
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
            ) : (
                // Show Success Message After Registration
                <Box
                    sx={{
                        padding: { xs: 2, sm: 4 },
                        maxWidth: "800px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", marginTop: 3 }}
                    >
                        Registration Successful!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ marginTop: 2, color: "text.secondary" }}
                    >
                        Your account has been created. You can now log in to access the platform.
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default RegisterPage;