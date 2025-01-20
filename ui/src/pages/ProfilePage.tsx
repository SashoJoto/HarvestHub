import React from "react";
import {
    Typography,
    Button,
    Box,
    Avatar,
    Card,
} from "@mui/material";
import Navbar from "../components/Navbar"; // Adjust path based on your structure
import Product from "../components/Product"; // Adjust the path

const Profile: React.FC = () => {
    return (
        <>
            <Navbar />
            {/* Profile Container */}
            <Box
                sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: 3,
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >
                {/* Profile Picture */}
                <Avatar
                    alt="Profile Picture"
                    src="/path-to-profile-photo.jpg"
                    sx={{
                        width: { xs: "100px", sm: "150px" },
                        height: { xs: "100px", sm: "150px" },
                    }}
                />

                {/* Profile Information */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        gap: 2,
                    }}
                >
                    {/* Name and Edit Button */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            John Doe
                        </Typography>
                    </Box>

                    {/* User Details */}
                    <Box>
                        <Typography variant="body1">
                            <strong>Email:</strong> john.doe@example.com
                        </Typography>
                        <Typography variant="body1">
                            <strong>Phone:</strong> +123 456 7890
                        </Typography>
                        <Typography variant="body1">
                            <strong>Address:</strong> 123, Main Street, Springfield
                        </Typography>
                    </Box>

                    {/* About Me Section */}
                    <Card
                        variant="outlined"
                        sx={{
                            padding: 2,
                            marginTop: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", marginBottom: 1 }}
                        >
                            About Me
                        </Typography>
                        <Typography variant="body2">
                            Hi! I'm John. I’m a software engineer with a passion for creating
                            user-centric web applications. I love collaborating with others
                            and learning new technologies!
                        </Typography>
                    </Card>
                </Box>
            </Box>

            {/* Buttons Section for Actions */}
            <Box
                sx={{
                    marginTop: 4,
                    textAlign: "center",
                }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={() => alert("Edit Profile Clicked")}
                >
                    Edit Profile
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => alert("Settings Clicked")}
                >
                    Settings
                </Button>
            </Box>

            {/* Product List Section */}
            <Box
                sx={{
                    marginTop: 5,
                    maxWidth: "900px",
                    margin: "0 auto",
                    padding: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
                    Your Products
                </Typography>
                {/* Render Product Components */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Product
                        image="https://via.placeholder.com/100"
                        title="Product 1"
                        user={{ name: "John Doe", avatar: "https://via.placeholder.com/50" }}
                        location="New York, USA"
                        date="2023-10-21"
                        price={99.99}
                    />
                    <Product
                        image="https://via.placeholder.com/100"
                        title="Product 2"
                        user={{ name: "Sarah Connor", avatar: "https://via.placeholder.com/50" }}
                        location="Los Angeles, USA"
                        date="2023-10-20"
                        price={150}
                    />
                </Box>
            </Box>
        </>
    );
};

export default Profile;