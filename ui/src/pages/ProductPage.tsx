import React, {useEffect, useState} from "react";
import {Box, Button, Card, IconButton, Typography, Snackbar, Alert} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Navbar from "../components/Navbar";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {ProductControllerApi, ProductDto, ProductDtoCurrencyEnum} from "../api";

// Slick-slider imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageUploading, {ImageListType} from "react-images-uploading";
// import {UploadProductImageRequest} from "../api/model/upload-product-image-request.ts";

const ProductPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<ImageListType>([]); // State for managing uploaded images
    const minImages = 2;
    const maxNumber = 5;

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
        "error"
    );

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const onImageChange = (imageList: ImageListType) => {
        // Update the images state
        setImages(imageList);
    };

    function uploadImages() {
        if (images.length < minImages || images.length > maxNumber) {
            setSnackbarMessage("Please upload between 2 and 5 images.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        const productApi = new ProductControllerApi();
        const productId: number = product!.id!;

        // Create a new `FormData` object to send files together
        const formData = new FormData();
        images.forEach((image) => {
            if (!image.file) {
                setSnackbarMessage("Invalid image selected.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
                return;
            }
            formData.append("images", image.file); // Key must match `@RequestPart("images")` in backend
        });

        // Make the call to upload images
        productApi
            .uploadProductImages(productId, formData as any)
            .then(() => {
                // Show success message
                setSnackbarMessage("Images uploaded successfully!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);

                // Optionally reload the product or reset the images
                setImages([]);
            })
            .catch((error) => {
                console.error("Error uploading images:", error);
                setSnackbarMessage("Failed to upload images. Please try again.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });

    }

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productController: ProductControllerApi = new ProductControllerApi();

            productController
                .getProduct(parseInt(id!))
                .then((response) => {
                    setProduct(response.data);
                })
                .catch((error) => {
                    const navigate = useNavigate();
                    navigate("/login");
                    alert("Error fetching product details: " + error.message);
                });

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
                return "";
        }
    };

    if (loading) {
        return <Typography>Loading product...</Typography>;
    }

    if (!product) {
        return <Typography>Product not found.</Typography>;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    return (
        <>
            {/* Navbar */}
            <Navbar/>

            <Box
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                {/* Product Details Card */}
                <Card
                    variant="outlined"
                    sx={{
                        width: "100%",
                        padding: 6,
                        borderRadius: 4,
                        marginTop: 5,
                        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.25)",
                        color: "text.primary",
                    }}
                >
                    {/* Slick Carousel */}
                    <Box sx={{ width: "100%", marginBottom: 5 }}>
                        {product.imageUrls && product.imageUrls.length > 0 ? (
                            <Slider {...sliderSettings}>
                                {product.imageUrls.map((url, index) => (
                                    <div key={index}>
                                        <img
                                            src={url}
                                            alt={`Product Image ${index + 1}`}
                                            style={{
                                                width: "100%",
                                                maxHeight: "400px",
                                                objectFit: "cover",
                                                borderRadius: "5px",
                                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                                            }}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: "center",
                                    color: "text.secondary",
                                    marginBottom: 3,
                                }}
                            >
                                No images available.
                            </Typography>
                        )}
                    </Box>
                    {/* Snackbar for feedback */}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Alert
                            onClose={handleSnackbarClose}
                            severity={snackbarSeverity}
                            sx={{ width: "100%" }}
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

                    {/* Name, Price, and Favorite Icon */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 5,
                        }}
                    >
                        {/* Left Side: Name and Price */}
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "bold",
                                    color: "text.primary",
                                    marginBottom: 2,
                                }}
                            >
                                {product.name}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: "bold",
                                    color: "text.secondary",
                                }}
                            >
                                {product.price
                                    ? `${product.price}${getCurrencySymbol(product.currency)}`
                                    : "N/A"}
                            </Typography>
                        </Box>

                        {/* Right Side: Favorite Icon */}
                        <IconButton
                            size="large"
                            sx={{
                                color: "purple",
                                fontSize: "2rem",
                            }}
                            onClick={() => alert("Added to favorites!")}
                        >
                            <FavoriteBorderIcon fontSize="inherit"/>
                        </IconButton>
                    </Box>

                    {/* About Product Section */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 5,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{fontWeight: "bold", color: "text.secondary"}}
                            >
                                Quantity
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: "bold",
                                    marginTop: 2,
                                    color: "text.primary",
                                }}
                            >
                                {product.quantity || "N/A"}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                variant="h6"
                                sx={{fontWeight: "bold", color: "text.secondary"}}
                            >
                                Unit
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: "bold",
                                    marginTop: 2,
                                    color: "text.primary",
                                }}
                            >
                                {product.units || "N/A"}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Description Section */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 3,
                        }}
                    >
                        Description
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "justify",
                            lineHeight: 2,
                            fontSize: "18px",
                            marginBottom: 6,
                            color: "text.secondary",
                        }}
                    >
                        {product.description?.trim()
                            ? product.description
                            : "No product description is available."}
                    </Typography>

                    {/* Seller Info and Message Button */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {/* Left Side: User Info */}
                        <Box>
                            <Typography variant="body1" sx={{color: "text.primary"}}>
                                <strong>{product.ownerName}</strong>
                            </Typography>
                            <Typography variant="body2" sx={{color: "text.primary"}}>
                                {product.ownerAddress}
                            </Typography>
                        </Box>

                        {/* Right Side: Message Button */}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "purple",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "18px",
                                padding: "10px 20px",
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "darkviolet",
                                },
                            }}
                            onClick={() => alert("Messaging the seller...")}
                        >
                            Message Seller
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default ProductPage;