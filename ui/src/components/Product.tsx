import React from "react";
import {
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Heart icon

interface ProductProps {
    title: string;
    price: number | undefined;
    currency: "USD" | "GBP" | "BGN" | "EUR"; // Add currency as a prop
    username: string;
    address: string;
}

const Product: React.FC<ProductProps> = ({
                                             title,
                                             price,
                                             currency,
                                             username,
                                             address,
                                         }) => {
    // Function to get the correct currency symbol
    const getCurrencySymbol = (currency: string) => {
        switch (currency) {
            case "USD":
                return "$";
            case "EUR":
                return "€";
            case "GBP":
                return "£";
            case "BGN":
                return "лв";
            default:
                return ""; // Default to no symbol if currency is unknown
        }
    };

    return (
        <Box
            sx={{
                position: "relative", // To allow absolute positioning inside the box
                display: "flex",
                alignItems: "flex-start",
                padding: 3,
                backgroundColor: "rgb(34,47,50)",
                borderRadius: 2,
                boxShadow: 1,
                gap: 3,
                transition: "0.3s",
                "&:hover": {
                    boxShadow: 6,
                },
                maxWidth: "900px", // Constrain width for consistent layout
                width: "100%",
                marginTop: 2,
                minHeight: "200px", // Ensure enough space for content
            }}
        >
            {/* Left Section: Product Title */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Product Title */}
                <Typography
                    variant="h5"
                    component="span"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: 1,
                    }}
                >
                    {title}
                </Typography>
            </Box>

            {/* Right Section: Price & Like Button */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    height: "150px",
                }}
            >
                {/* Product Price */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    {price ? `${price}${getCurrencySymbol(currency)}` : "N/A"}
                </Typography>

                {/* Like Button */}
                <IconButton sx={{ color: "secondary.main" }}>
                    <FavoriteBorderIcon />
                </IconButton>
            </Box>

            {/* Bottom Section: Username and Address */}
            <Box
                sx={{
                    position: "absolute", // Absolutize this section
                    bottom: 16, // Offset to the bottom
                    left: 25, // Offset to the left
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        color: "#e0e0e0",
                        fontWeight: "bold",
                    }}
                >
                    {username}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#9e9e9e",
                    }}
                >
                    {address}
                </Typography>
            </Box>
        </Box>
    );
};

export default Product;