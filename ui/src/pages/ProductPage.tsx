import React from "react";
import {
    Box,
    Typography,
    IconButton,
    Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import Navbar from "../components/Navbar"; // Assuming you have Navbar component

const ProductPage: React.FC = () => {
    const product = {
        title: "Amazing Product",
        images: [
            "https://via.placeholder.com/800x450/FF0000",
            "https://via.placeholder.com/800x450/00FF00",
            "https://via.placeholder.com/800x450/0000FF",
        ],
        price: 199.99,
        description:
            "This amazing product comes with unparalleled quality and unique features. Perfect for anyone looking for excellence and performance. Don't miss your chance to own this spectacular item!",
        sellerContact: "john.doe@example.com",
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <Box sx={{ padding: { xs: 2, sm: 4, md: 6 }, maxWidth: "1200px", margin: "0 auto" }}>
                {/* Title */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: 3,
                        textAlign: "center",
                    }}
                >
                    {product.title}
                </Typography>

                {/* Image Slider */}
                <Box sx={{ display: "flex", overflowX: "scroll", gap: 2, marginBottom: 4 }}>
                    {product.images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Product Image ${index + 1}`}
                            style={{
                                width: "100%",
                                maxWidth: "800px", // Limits slider image width
                                height: "auto",
                                borderRadius: "5px",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            }}
                        />
                    ))}
                </Box>

                {/* Price, Favorites, and Message Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        marginBottom: 4,
                    }}
                >
                    {/* Price */}
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                        }}
                    >
                        ${product.price.toFixed(2)}
                    </Typography>

                    {/* Add to Favorites Button */}
                    <IconButton
                        size="large"
                        color="secondary"
                        onClick={() => alert("Added to favorites!")}
                        sx={{
                            fontSize: "1.5rem",
                        }}
                    >
                        <FavoriteBorderIcon fontSize="inherit" />
                    </IconButton>

                    {/* Message Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<MessageIcon />}
                        onClick={() => alert(`Message sent to seller: ${product.sellerContact}`)}
                    >
                        Message Seller
                    </Button>
                </Box>

                {/* Description */}
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: "1.2rem",
                        lineHeight: 1.8,
                        textAlign: "justify",
                        color: "text.secondary",
                    }}
                >
                    {product.description}
                </Typography>
            </Box>
        </>
    );
};

export default ProductPage;