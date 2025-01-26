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
import Slider from "react-slick"; // Import the slider
import "slick-carousel/slick/slick.css"; // Import slick-carousel styles
import "slick-carousel/slick/slick-theme.css";
import raw_milk from "../assets/raw_milk.jpg";
import raw_milk_2 from "../assets/raw_milk_2.jpg";

const ProductPage: React.FC = () => {
    const product = {
        title: "Raw milk",
        images: [
            raw_milk,
            raw_milk_2,
        ],
        price: 199.99,
        description:
            "This amazing product comes with unparalleled quality and unique features. Perfect for anyone looking for excellence and performance. Don't miss your chance to own this spectacular item!",
        sellerContact: "john.doe@example.com",
    };

    // Slider settings for react-slick
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
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
                <Box sx={{ marginBottom: 4 }}>
                    <Slider {...sliderSettings}>
                        {product.images.map((src, index) => (
                            <div key={index}>
                                <img
                                    src={src}
                                    alt={`Product Image ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        maxWidth: "800px", // Limits slider image width within the container
                                        height: "auto",
                                        margin: "0 auto",
                                        borderRadius: "5px",
                                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                    }}
                                />
                            </div>
                        ))}
                    </Slider>
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
                            color: "white",
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