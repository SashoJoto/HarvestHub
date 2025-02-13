import React, { useEffect, useState } from "react";
import { Typography, Button, Box, Avatar, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import axios from "axios";
import { ProductControllerApi, ProductDto } from "../api";

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
    }); // User state to hold profile information
    const [products, setProducts] = useState<ProductDto[]>([]); // Products state
    const [loading, setLoading] = useState(true); // Loader for fetching data

    // Effect to retrieve user information and their products
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("jwtToken"); // Retrieve token
            if (!token) {
                navigate("/login"); // Redirect to login if token is missing
                return;
            }

            try {
                // Fetch user details
                const response = await axios.get("/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data); // Update user state

                // Fetch user's products
                const productController = new ProductControllerApi();
                const productsResponse = await productController.getAllProducts({
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(productsResponse.data || []); // Update products state
            } catch (error) {
                console.error("Error fetching data: ", error);
                if (error.response?.status === 401) {
                    localStorage.removeItem("jwtToken"); // Remove invalid token
                    navigate("/login"); // Redirect to login
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    // Handle user logout action
    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); // Clear token from storage
        navigate("/login"); // Redirect to login page
    };

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
                        justifyContent: { xs: "center", sm: "space-between" },
                        flexWrap: "wrap",
                        gap: 3,
                        flexDirection: { xs: "column", sm: "row" },
                    }}
                >
                    {/* Profile Picture */}
                    <Avatar
                        alt={user.name || "Profile Picture"}
                        // src={user.avatar || "/default-avatar.jpg"} // Replace with default avatar if none exists
                        sx={{
                            width: { xs: "120px", sm: "200px" },
                            height: { xs: "120px", sm: "200px" },
                            border: "4px solid #ddd",
                        }}
                    />

                    {/* User Details */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "center", sm: "flex-start" },
                            textAlign: { xs: "center", sm: "left" },
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            {user.name || "Loading..."}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {user.email || "Loading..."}
                        </Typography>
                        {/*<Typography variant="body1">*/}
                        {/*    <strong>Phone:</strong> {user.phone || "Not available"}*/}
                        {/*</Typography>*/}
                        {/*<Typography variant="body1">*/}
                        {/*    <strong>Address:</strong> {user.address || "Not available"}*/}
                        {/*</Typography>*/}
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => alert("Edit Profile Clicked")}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                        >
                            Log out
                        </Button>
                    </Box>
                </Box>

                {/* "About Me" Section */}
                <Card
                    variant="outlined"
                    sx={{ width: "100%", padding: 3, borderRadius: 2 }}
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
                    <Typography variant="body1" sx={{ textAlign: "justify" }}>
                        Hi! This is your profile page. Update this section to reflect your
                        personal or professional background.
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
                {loading ? (
                    <Typography>Loading products...</Typography>
                ) : products.length === 0 ? (
                    <Typography>No products to display.</Typography>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {products.map((product) => (
                            <Product
                                key={product.id}
                                title={product.name || ""}
                                price={product.price || 0}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Profile;