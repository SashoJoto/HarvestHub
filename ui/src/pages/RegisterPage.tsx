import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import Navbar from "../components/Navbar";
import { User, UserControllerApi } from "../api";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "+359", // Start with +359 prefilled for phone number
        address: "",
        description: "",
        password: "",
        confirmPassword: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("error");

    const FirstNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        FirstNameInputRef.current?.focus();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "phoneNumber") {
            const newValue = value.startsWith("+359") ? value : `+359${value.replace(/^\+?359/, "")}`;
            setFormData((prev) => ({ ...prev, phoneNumber: newValue }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const register = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            password,
            confirmPassword,
        } = formData;

        if (!firstName) {
            setSnackbarMessage("Please provide your first name.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (!lastName) {
            setSnackbarMessage("Please provide your last name.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (!username) {
            setSnackbarMessage("Please provide a username.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setSnackbarMessage("Please provide a valid email address.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (!phoneNumber || phoneNumber.length !== 13 || !/^\+359[0-9]{9}$/.test(phoneNumber)) {
            setSnackbarMessage("Phone number must be +359 followed by 9 digits.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (!password || !confirmPassword) {
            setSnackbarMessage("Password and Confirm Password are required.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (password !== confirmPassword) {
            setSnackbarMessage("Passwords do not match.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        const userController = new UserControllerApi();
        const user: User = {
            firstName,
            lastName,
            username,
            email,
            password,
            phoneNumber,
            address: formData.address,
            description: formData.description,
        };

        userController
            .createUser(user)
            .then((response) => {
                if (response.status === 200) {
                    setIsRegistered(true);
                    setSnackbarMessage("Registration successful! Redirecting to login...");
                    setSnackbarSeverity("success");
                    setSnackbarOpen(true);

                    setTimeout(() => navigate("/login"), 1500);
                }
            })
            .catch((error) => {
                const errorMessage =
                    error.response?.data || "Registration failed. Please try again.";
                setSnackbarMessage(errorMessage);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
    };

    return (
        <>
            <Navbar />

            {!isRegistered ? (
                <Box
                    sx={{
                        height: "calc(100vh - 64px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: 2,
                    }}
                >
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
                        onSubmit={register}
                        sx={{
                            width: "90%",
                            maxWidth: "400px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {/* First Name Input */}
                        <TextField
                            label="First Name"
                            name="firstName"
                            type="text"
                            inputRef={FirstNameInputRef} // Autofocus on the first name field
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Last Name Input */}
                        <TextField
                            label="Last Name"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Username Input */}
                        <TextField
                            label="Username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Email Input */}
                        <TextField
                            label="Email"
                            name="email"
                            type="text" // Removed 'email' type to disable default validation
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Phone Number Input */}
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            type="text"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                inputProps: {
                                    maxLength: 13, // Enforcing exact length
                                },
                            }}
                        />

                        {/* Address Input */}
                        <TextField
                            label="Address (Optional)"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Description Input */}
                        <TextField
                            label="Description (Optional)"
                            name="description"
                            multiline
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Password Input */}
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Confirm Password Input */}
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Register
                        </Button>

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
                <></>
            )}

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
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

export default RegisterPage;