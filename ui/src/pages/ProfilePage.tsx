import React from "react";
import { Typography, Button, Box, Avatar, Card } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Product from "../components/Product";

const Profile: React.FC = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Profile Section */}
            <Box
                sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >
                {/* Profile Picture + Details Row */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "center", sm: "space-between" }, // Centered on mobile
                        flexWrap: "wrap", // Ensure it wraps properly
                        gap: 3,
                        flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile
                    }}
                >
                    {/* Profile Picture */}
                    <Avatar
                        alt="Profile Picture"
                        src="/path-to-profile-photo.jpg"
                        sx={{
                            width: { xs: "120px", sm: "200px" }, // Adjust size for mobile larger
                            height: { xs: "120px", sm: "200px" },
                            border: "4px solid #ddd",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            marginBottom: { xs: 2, sm: 0 }, // Add space below image on mobile
                        }}
                    />

                    {/* User Details */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "center", sm: "flex-start" }, // Center text on mobile
                            textAlign: { xs: "center", sm: "left" }, // Center-align text for mobile
                            gap: 1,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                fontSize: { xs: "22px", sm: "28px" }, // Adjust text size
                            }}
                        >
                            John Doe
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" }, // Adjust text size
                                wordBreak: "break-word", // Prevent text from overflowing
                            }}
                        >
                            <strong>Email:</strong> john.doe@example.com
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" },
                                wordBreak: "break-word",
                            }}
                        >
                            <strong>Phone:</strong> +123 456 7890
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" },
                                wordBreak: "break-word",
                            }}
                        >
                            <strong>Address:</strong> 123, Main Street, Springfield
                        </Typography>
                    </Box>

                    {/* Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center", // Center align on mobile
                            gap: 2,
                            width: { xs: "100%", sm: "auto" }, // Full width on mobile
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth={false}
                            sx={{
                                width: { xs: "100%", sm: "150px" }, // Full-width buttons on mobile
                            }}
                            onClick={() => alert("Edit Profile Clicked")}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                width: { xs: "100%", sm: "150px" }, // Full-width buttons on mobile
                            }}
                            onClick={() => alert("Settings Clicked")}
                        >
                            Settings
                        </Button>
                    </Box>
                </Box>

                {/* "About Me" Section */}
                <Card
                    variant="outlined"
                    sx={{
                        width: "100%", // Matches parent container's width
                        padding: 3,
                        borderRadius: 2,
                        marginTop: 2,
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: 2,
                            textAlign: "center",
                        }}
                    >
                        About Me
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: "justify",
                            lineHeight: 1.8,
                            fontSize: "16px",
                        }}
                    >
                        Hi! I'm John. I’m a software engineer with a passion for creating
                        user-centric web applications. I love collaborating with others and
                        learning new technologies!
                    </Typography>
                </Card>
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
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
                >
                    Your Products
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Link to="/product" style={{ textDecoration: "none" }}>
                        <Product
                            image="https://via.placeholder.com/100"
                            title="Product 1"
                            user={{
                                name: "John Doe",
                                avatar: "https://via.placeholder.com/50",
                            }}
                            location="New York, USA"
                            date="2023-10-21"
                            price={99.99}
                        />
                    </Link>
                    <Link to="/product" style={{ textDecoration: "none" }}>
                        <Product
                            image="https://via.placeholder.com/100"
                            title="Product 2"
                            user={{
                                name: "Sarah Connor",
                                avatar: "https://via.placeholder.com/50",
                            }}
                            location="Los Angeles, USA"
                            date="2023-10-20"
                            price={150}
                        />
                    </Link>
                </Box>
            </Box>
        </>
    );
};

export default Profile;