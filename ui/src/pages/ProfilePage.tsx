import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { ProductControllerApi, ProductDto, UserControllerApi, UserDto } from "../api";
import { jwtDecode } from "jwt-decode";

const Profile: React.FC = () => {
    const navigate = useNavigate();

    // State to manage product list
    let [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserDto | null>({
        id: -1,
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phoneNumber: "",
        address: "",
        description: "",
    });

    const jwtToken: string | null = localStorage.getItem("jwtToken");
    const jwtDecoded: any = jwtDecode<string>(jwtToken || "");
    const userId: string = jwtDecoded.sub;

    const logout = () => {
        localStorage.removeItem("jwtToken"); // Clear token from storage
        navigate("/login"); // Redirect to login page
    };

    // Fetch products when the component loads
    useEffect(() => {
        const productController: ProductControllerApi = new ProductControllerApi();
        productController
            .getAllProducts()
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                alert("Error fetching products: " + error.message);
            });

        const userController: UserControllerApi = new UserControllerApi();
        userController
            .getUser(Number(userId))
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                alert("Error fetching user: " + error.message);
            });
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
                        flexWrap: "wrap", // Ensure proper wrapping
                        gap: 3,
                        flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile
                    }}
                >
                    {/* Profile Picture */}
                    <Avatar
                        alt="Profile Picture"
                        src="/path-to-profile-photo.jpg"
                        sx={{
                            width: { xs: "150px", sm: "250px" }, // Larger size
                            height: { xs: "150px", sm: "250px" },
                            border: "4px solid #ddd",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        }}
                    />

                    {/* User Details */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "center", sm: "flex-start" }, // Center align text on mobile
                            textAlign: { xs: "center", sm: "left" }, // Center-align text for mobile
                            gap: 1,
                        }}
                    >
                        {/* First and Last Name */}
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: "bold",
                                fontSize: { xs: "24px", sm: "32px" }, // Adjusted text size
                            }}
                        >
                            {user.firstName} {user.lastName}
                        </Typography>

                        {/* Username as a secondary detail */}
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" }, // Adjusted text size
                            }}
                        >
                            <strong>Username: </strong>{user.username}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" }, // Adjust text size
                                wordBreak: "break-word", // Prevent text from overflowing
                            }}
                        >
                            <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" },
                                wordBreak: "break-word",
                            }}
                        >
                            <strong>Phone:</strong> {user.phoneNumber}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" },
                                wordBreak: "break-word",
                            }}
                        >
                            <strong>Address:</strong> {user.address}
                        </Typography>
                    </Box>

                    {/* Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center", // Center align on mobile
                            gap: 2,
                            width: { xs: "100%", sm: "auto" }, // Full-width on mobile
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
                        {user.description}
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