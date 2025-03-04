import React, { useState } from "react";
import {
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Filled heart icon
import { UserControllerApi } from "../api";
import { jwtDecode } from "jwt-decode";

interface ProductProps {
    id: number;
    title: string;
    price: number | undefined;
    currency: "USD" | "GBP" | "BGN" | "EUR";
    username: string;
    address: string;
    isFavorited: boolean; // Indicates if the product is already a favorite
    onFavoriteToggle: (id: number, isFavorited: boolean) => void; // Callback for parent to handle state change
}

const Product: React.FC<ProductProps> = ({
                                             id,
                                             title,
                                             price,
                                             currency,
                                             username,
                                             address,
                                             isFavorited,
                                             onFavoriteToggle,
                                         }) => {
    const [favorite, setFavorite] = useState(isFavorited);
    const userControllerApi: UserControllerApi = new UserControllerApi();

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
                return "";
        }
    };

    const handleFavoriteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent redirect on click

        const jwtToken: string | null = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            console.error("No JWT token found.");
            return;
        }

        const jwtDecoded: any = jwtDecode<string>(jwtToken || "");
        const userId: string = jwtDecoded.sub; // Decode the user ID from the JWT token

        try {
            if (favorite) {
                // Remove from favorites
                await userControllerApi.removeFavorite(id, Number(userId)); // Pass both product ID and user ID
            } else {
                // Add to favorites
                await userControllerApi.addFavorite(id, Number(userId)); // Pass both product ID and user ID
            }

            // Update local and parent state
            setFavorite(!favorite);
            onFavoriteToggle(id, !favorite);
        } catch (error) {
            console.error("Failed to update favorites:", error);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
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
                maxWidth: "900px",
                width: "100%",
                marginTop: 2,
                minHeight: "200px",
            }}
        >
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                    variant="h5"
                    component="span"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                    {title}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    height: "150px",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {price ? `${price}${getCurrencySymbol(currency)}` : "N/A"}
                </Typography>
                <IconButton
                    sx={{ color: "secondary.main" }}
                    onClick={handleFavoriteClick}
                >
                    {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 25,
                }}
            >
                <Typography variant="body1" sx={{ color: "#e0e0e0", fontWeight: "bold" }}>
                    {username}
                </Typography>
                <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                    {address}
                </Typography>
            </Box>
        </Box>
    );
};

export default Product;