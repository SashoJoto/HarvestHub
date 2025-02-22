import React, {useEffect, useState} from "react";
import {Box, IconButton, Typography,} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Navbar from "../components/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {ProductControllerApi, ProductDto, ProductDtoCurrencyEnum} from "../api";

// interface Product {
//     title: string;
//     images: string[];
//     price: number;
//     description: string;
//     sellerContact: string;
// }
//
const ProductPage: React.FC = () => {
    const {id} = useParams<{ id: string }>(); // Fetch the ID from the URL
    let [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productController: ProductControllerApi = new ProductControllerApi();
            productController.getProduct(parseInt(id!))
                .then(response => {
                    product = response.data;
                })
                .catch(error => {
                    const navigate = useNavigate();
                    navigate("/login");
                    alert("Error fetching product details: " + error.message);
                })


            try {
                const response = await axios.get(`/api/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    // Slider settings
    // const sliderSettings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     pauseOnHover: true,
    // };

    const getCurrencySymbol = (currency: ProductDtoCurrencyEnum | undefined): string => {
        switch (currency) {
            case "USD":
                return "$";
            case "GBP":
                return "£";
            case "BGN":
                return "лв";
            case "EUR":
                return "€";
            default:
                return ""; // If no currency is specified
        }
    };


    if (loading) {
        return <Typography>Loading product...</Typography>;
    }

    if (!product) {
        return <Typography>Product not found.</Typography>;
    }

    return (
        <>
            {/* Navbar */}
            <Navbar/>

            {/* Page Content */}
            <Box sx={{padding: {xs: 2, sm: 4, md: 6}, maxWidth: "1200px", margin: "0 auto"}}>
                {/* Title */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: 3,
                        textAlign: "center",
                    }}
                >
                    {product.name}
                </Typography>

                {/* Image Slider */}
                {/*<Box sx={{ marginBottom: 4 }}>*/}
                {/*    <Slider {...sliderSettings}>*/}
                {/*        {product.images.map((src, index) => (*/}
                {/*            <div key={index}>*/}
                {/*                <img*/}
                {/*                    src={src}*/}
                {/*                    alt={`Product Image ${index + 1}`}*/}
                {/*                    style={{*/}
                {/*                        width: "100%",*/}
                {/*                        maxWidth: "800px",*/}
                {/*                        height: "auto",*/}
                {/*                        margin: "0 auto",*/}
                {/*                        borderRadius: "5px",*/}
                {/*                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </Slider>*/}
                {/*</Box>*/}

                {/* Price, Favorites, and Message Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {xs: "column", sm: "row"},
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
                        {product.price ? `${product.price}${getCurrencySymbol(product.currency)}` : 'N/A'}
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
                        <FavoriteBorderIcon fontSize="inherit"/>
                    </IconButton>

                    {/* Message Button */}
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    color="primary"*/}
                    {/*    size="large"*/}
                    {/*    startIcon={<MessageIcon />}*/}
                    {/*    onClick={() => alert(`Message sent to seller: ${product.sellerContact}`)}*/}
                    {/*>*/}
                    {/*    Message Seller*/}
                    {/*</Button>*/}
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