import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { ProductControllerApi, ProductDto } from "../api";

const categories = [
    { name: "Dairy Products", value: "Dairy_Products" },
    { name: "Meat and Poultry", value: "Meat_and_Poultry_Products" },
    { name: "Eggs", value: "Eggs_Products" },
    { name: "Grains and Legumes", value: "Grains_And_Legumes_Products" },
    { name: "Herbs and Spices", value: "Herbs_And_Spices_Products" },
    { name: "Honey and Sweeteners", value: "Honey_And_Sweeteners_Products" },
    { name: "Fruits", value: "Fruit_Products" },
    { name: "Vegetables", value: "Vegetable_Products" },
    { name: "Flowers", value: "Flowers_Products" },
];

const HomePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<ProductDto[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const productApi = new ProductControllerApi();
    const searchBarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchBarRef.current) {
            searchBarRef.current.focus();
        }
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim() === "") return;

        productApi
            .searchProducts(searchQuery)
            .then((response) => {
                setSearchResults(response.data);
                setIsSearching(true);
            })
            .catch((error) => {
                console.error("Error fetching search results:", error);
            });
    };

    // Handle Enter key press for searching
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleCategorySearch = (categoryValue: string) => {
        productApi
            .getProductsByCategory(categoryValue)
            .then((response) => {
                setSearchResults(response.data);
                setIsSearching(true);
                setSearchQuery(`Category: ${categories.find((cat) => cat.value === categoryValue)?.name}`);
            })
            .catch((error) => {
                console.error("Error fetching category results:", error);
            });
    };

    // Back button: Reset to default view
    const backToSearch = () => {
        setIsSearching(false);
        setSearchResults([]);
        setSearchQuery("");
        if (searchBarRef.current) {
            searchBarRef.current.focus();
        }
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            <Box>
                {/* Default View */}
                {!isSearching ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "calc(100vh - 64px)", // Account for navbar height
                            padding: 3,
                            textAlign: "center",
                        }}
                    >
                        {/* Title */}
                        <Typography variant="h3" sx={{ mb: 2 }}>
                            What are you looking for?
                        </Typography>

                        {/* Search Bar */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: 600,
                                mb: 4,
                            }}
                        >
                            <TextField
                                inputRef={searchBarRef}
                                fullWidth
                                variant="outlined"
                                placeholder="Search for something..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                sx={{ mr: 1 }}
                            />
                            <Button variant="contained" color="secondary" onClick={handleSearch}>
                                Search
                            </Button>
                        </Box>

                        {/* Categories */}
                        <Grid container spacing={3} justifyContent="center">
                            {categories.map((category, index) => (
                                <Grid item xs={6} sm={4} md={3} key={index}>
                                    <Card
                                        sx={{
                                            cursor: "pointer",
                                            borderRadius: 2,
                                            boxShadow: "0 1px 5px rgba(0,0,0,0.3)",
                                            "&:hover": { boxShadow: "0 2px 10px rgba(0,0,0,0.4)" },
                                        }}
                                        onClick={() => handleCategorySearch(category.value)}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                {category.name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    // Search/Category Results View
                    <Box
                        sx={{
                            padding: 3,
                            maxWidth: "900px",
                            margin: "0 auto",
                            mt: 6,
                        }}
                    >
                        {/* Search/Category Header */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 3,
                            }}
                        >
                            <Typography variant="h3">
                                {searchQuery.includes("Category:")
                                    ? searchQuery
                                    : `Search Results for: "${searchQuery}"`}
                            </Typography>

                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                    px: 3,
                                    py: 1,
                                    fontSize: "1rem",
                                }}
                                onClick={backToSearch}
                            >
                                Go back
                            </Button>
                        </Box>

                        {/* Product List */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            {searchResults.length > 0 ? (
                                searchResults.map((product) => (
                                    <Link
                                        to={`/product/${product.id}`} // Link to product details
                                        key={product.id}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Product
                                            title={product.name!}
                                            price={product.price}
                                            currency={product.currency || "BGN"}
                                            username={product.ownerName!}
                                        />
                                    </Link>
                                ))
                            ) : (
                                <Typography variant="h3" sx={{ textAlign: "center", mt: 5 }}>
                                    No products found :(
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default HomePage;