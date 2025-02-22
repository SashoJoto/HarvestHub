import React, { useEffect, useState } from "react";
import { Typography, Button, Box, Avatar, Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import axios from "axios";
import { ProductControllerApi, ProductDto, ProductDtoCurrencyEnum } from "../api";

// Define the structure of a user
interface User {
    username: string;
    email: string;
    phone: string;
    address: string;
    aboutMe: string;
    avatar?: string; // Optional: if you want to include profile picture URL
}

// Component to display profile
const Profile: React.FC = () => {
    const navigate = useNavigate();

    // State to manage product list
    let [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);

    // State to manage user information
    const [user, setUser] = useState<User | null>(null);

    const logout = () => {
        localStorage.removeItem("jwtToken"); // Clear token from storage
        navigate("/login"); // Redirect to login page
    };

    // Fetch user and product data when the component loads
    useEffect(() => {
        const productController: ProductControllerApi = new ProductControllerApi();
        productController.getAllProducts()
            .then(response => {
                products = response.data;
            })
            .catch(error => {
                alert("Error fetching products: " + error.message);
            });

        const fetchUserProducts = async () => {
            try {
                const response = await axios.get("/api/products", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with proper token storage
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching user products:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Assuming user ID is saved in local storage
                if (!userId) throw new Error("User ID not found!");

                const response = await axios.get<User>(`/api/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token if required
                    },
                });
                setUser(response.data); // Update user state with fetched data
            } catch (error) {
                console.error("Error fetching user profile:", error);
                alert("Failed to fetch user profile. Please try again.");
                // Optionally, redirect back to login if user fetching fails
                logout();
            }
        };

        fetchUserProducts();
        fetchUserProfile(); // Fetch user profile
    }, []);

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
                        src={user?.avatar || "/path-to-profile-photo.jpg"} // Use fetched avatar or placeholder
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
                            {user?.username || "Loading..."}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" }, // Adjust text size
                                wordBreak: "break-word", // Prevent text from overflowing
                            }}
                        >
                            <strong>Email:</strong> {user?.email || "Loading..."}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" },
                                wordBreak: "break-word",
                            }}
                        >
                            <strong>Phone:</strong> {user?.phone || "Loading..."}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" },
                                wordBreak: "break-word",
                            }}
                        >
                            <strong>Address:</strong> {user?.address || "Loading..."}
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
                            onClick={logout}
                        >
                            Logout
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
                        {user?.aboutMe || "Hi! I'm John. I’m a software engineer with a passion for creating user-centric web applications. I love collaborating with others and learning new technologies!"}
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {products.map((product) => (
                            <Link
                                to={`/product/${product.id}`} // Dynamic link to product page
                                key={product.id}
                                style={{ textDecoration: "none" }}
                            >
                                <Product
                                    title={product.name!}
                                    price={product.price}
                                    currency={product.currency || "BGN"}
                                />
                            </Link>
                        ))}
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Profile;