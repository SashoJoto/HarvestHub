import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import Navbar from "../components/Navbar";
import { UserControllerApi, UserDto } from "../api";
import { useNavigate, useLocation } from "react-router-dom";

const EditProfilePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userController = new UserControllerApi();

    const currentUser: UserDto = location.state.user;

    const [formData, setFormData] = useState<UserDto>({
        ...currentUser,
        phoneNumber: currentUser.phoneNumber || "+359", // Ensure +359 is set by default for phone numbers
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("error");

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

    const validateForm = (): boolean => {
        const { firstName, lastName, email, phoneNumber } = formData;

        if (!firstName) {
            setSnackbarMessage("Please provide your first name.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return false;
        }

        if (!lastName) {
            setSnackbarMessage("Please provide your last name.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return false;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setSnackbarMessage("Please provide a valid email address.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return false;
        }

        if (!phoneNumber || phoneNumber.length !== 13 || !/^\+359[0-9]{9}$/.test(phoneNumber)) {
            setSnackbarMessage("Phone number must be +359 followed by 9 digits.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return false;
        }

        return true;
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            const updatedUser: UserDto = { ...currentUser, ...formData };


            const response = await userController.createUser(updatedUser);

            if (response.status === 200 || response.status === 201) {
                setSnackbarMessage("Profile updated successfully!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);

                setTimeout(() => navigate("/profile"), 1500);
            }
        } catch (error) {
            setSnackbarMessage("Failed to update profile. Please try again.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

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
                    Edit Profile
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSave}
                    sx={{
                        width: "90%",
                        maxWidth: "400px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {/* First Name */}
                    <TextField
                        label="First Name"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Last Name */}
                    <TextField
                        label="Last Name"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Username */}
                    <TextField
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        disabled // Username is usually not editable
                    />

                    {/* Email */}
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Phone Number */}
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        type="text"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        InputProps={{
                            inputProps: {
                                maxLength: 13, // Enforce max length
                            },
                        }}
                        fullWidth
                    />

                    {/* Address */}
                    <TextField
                        label="Address (Optional)"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* Description */}
                    <TextField
                        label="Description (Optional)"
                        name="description"
                        type="text"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                    />


                    {/* Save Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>

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

export default EditProfilePage;