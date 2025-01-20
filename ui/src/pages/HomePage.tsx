import React from "react";
import { Box, TextField, Button, Typography, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar"; // Adjust path based on your structure

const categories = [
    { name: "Dairy Products" },
    { name: "Meat and Poultry" },
    { name: "Eggs" },
    { name: "Grains and Legumes" },
    { name: "Herbs and Spices" },
    { name: "Honey and Sweeteners" },
    { name: "Fruits" },
    { name: "Vegetables" },
    { name: "Flowers" },
];

const HomePage: React.FC = () => {
    return (
        <>
            {/* Navbar Component */}
            <Navbar />

            {/* Content */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "calc(100vh - 64px)", // Adjust height to account for the navbar
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
                        mb: 4, // Margin below the search bar
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search for something..."
                        sx={{ mr: 1 }} // Margin right
                    />
                    <Button variant="contained" color="primary">
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
        </>
    );
};

export default HomePage;