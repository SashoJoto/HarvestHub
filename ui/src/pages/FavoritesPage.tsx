import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { UserControllerApi, ProductDto } from "../api";
import { jwtDecode } from "jwt-decode";

const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const userControllerApi: UserControllerApi = new UserControllerApi();

    useEffect(() => {
        const fetchFavorites = async () => {
            const jwtToken: string | null = localStorage.getItem("jwtToken");
            if (!jwtToken) {
                console.error("No JWT token found.");
                setLoading(false);
                return;
            }

            const jwtDecoded: any = jwtDecode<string>(jwtToken);
            const userId: string = jwtDecoded.sub; // Get userId from decoded token

            try {
                const response = await userControllerApi.getFavorites(Number(userId)); // Use OpenAPI method with userId
                setFavorites(response.data); // Set the favorite products from the API response
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [userControllerApi]);

    const handleFavoriteToggle = (id: number, isFavorited: boolean) => {
        if (!isFavorited) {
            // Remove the unfavorited product from the favorites list
            setFavorites((prevFavorites) => prevFavorites.filter((product) => product.id !== id));
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
                    Favorite Products
                </Typography>
                {loading ? (
                    <Typography>Loading favorite products...</Typography>
                ) : favorites.length > 0 ? (
                    favorites.map((product) => (
                        <Product
                            key={product.id!}
                            id={product.id!}
                            title={product.name!}
                            price={product.price!}
                            currency={product.currency || "BGN"}
                            isFavorited={true}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))
                ) : (
                    <Typography>No favorite products yet!</Typography>
                )}
            </Box>
        </>
    );
};

export default FavoritesPage;