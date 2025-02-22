import React, { useState } from "react";
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Select,
    InputLabel,
    FormControl,
    ToggleButtonGroup,
    ToggleButton,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";
import Navbar from "../components/Navbar.tsx";
import {
    ProductControllerApi,
    ProductDto,
    ProductDtoCurrencyEnum,
    ProductDtoCategoryEnum,
    ProductDtoShippingResponsibilityEnum,
    ProductDtoUnitsEnum,
} from "../api";

const AddProduct: React.FC = () => {
    const [formValues, setFormValues] = useState({
        productName: "",
        description: "",
        quantity: 0,
        units: ProductDtoUnitsEnum.Kg,
        price: 0,
        currency: ProductDtoCurrencyEnum.Bgn,
        shippingFee: ProductDtoShippingResponsibilityEnum.Buyer,
        category: ProductDtoCategoryEnum.DairyProducts,
    });

    const [errors, setErrors] = useState({
        quantity: false,
        price: false,
    });

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
        "success"
    );

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
    ) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });

        if (name === "quantity" || name === "price") {
            setErrors({
                ...errors,
                [name]: Number(value) <= 0,
            });
        }
    };

    // Snackbar handlers
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Handle submit with validation for required fields
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation checks for required fields
        if (!formValues.productName) {
            setSnackbarMessage("Product Name is required.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (!formValues.description) {
            setSnackbarMessage("Description is required.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (formValues.quantity <= 0) {
            setSnackbarMessage("Quantity must be a positive number.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (formValues.price <= 0) {
            setSnackbarMessage("Price must be a positive number.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        // If validation passes, construct product DTO and proceed with API call
        const productDto: ProductDto = {
            name: formValues.productName,
            description: formValues.description,
            quantity: formValues.quantity,
            units: formValues.units,
            price: formValues.price,
            currency: formValues.currency,
            shippingResponsibility: formValues.shippingFee,
            category: formValues.category,
        };

        const productApi = new ProductControllerApi();
        productApi
            .createProduct(productDto)
            .then((response) => {
                console.log(response.data);
                setSnackbarMessage("Product added successfully!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true); // Show success message
            })
            .catch((error) => {
                console.error(error);
                setSnackbarMessage("Failed to add product. Please try again.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true); // Show error message
            });
    };

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    marginTop: { xs: 8, sm: 10, md: 12 },
                    padding: 4,
                    boxShadow: 2,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                    Add Product
                </Typography>

                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            required
                            value={formValues.category}
                            onChange={handleChange}
                            label="Category"
                        >
                            <MenuItem value={ProductDtoCategoryEnum.DairyProducts}>Dairy Products</MenuItem>
                            <MenuItem value={ProductDtoCategoryEnum.MeatAndPoultryProducts}>Meat and Poultry Products</MenuItem>
                            <MenuItem value={ProductDtoCategoryEnum.VegetableProducts}>Vegetable Products</MenuItem>
                            <MenuItem value={ProductDtoCategoryEnum.EggsProducts}>Eggs Products</MenuItem>
                            <MenuItem value={ProductDtoCategoryEnum.FruitProducts}>Fruit Products</MenuItem>
                            <MenuItem value={ProductDtoCategoryEnum.HerbsAndSpicesProducts}>Herbs and Spices Products</MenuItem>
                            <MenuItem value={ProductDtoCategoryEnum.HoneyAndSweetenersProducts}>Honey and Sweeteners Products</MenuItem>
                            <MenuItem value={ProductDtoCategoryEnum.GrainsAndLegumesProducts}>Grains and Legumes Products</MenuItem>
                            <MenuItem value={ProductDtoCategoryEnum.FlowersProducts}>Flowers Products</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Product Name */}
                    <TextField
                        name="productName"
                        label="Product Name"
                        variant="outlined"
                        fullWidth
                        value={formValues.productName}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    {/* Description */}
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={formValues.description}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    {/* Quantity and Unit */}
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField
                            name="quantity"
                            label="Quantity"
                            variant="outlined"
                            type="number"
                            required
                            value={formValues.quantity}
                            onChange={handleChange}
                            error={errors.quantity}
                            helperText={
                                errors.quantity ? "Quantity must be a positive number" : ""
                            }
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>Unit</InputLabel>
                            <Select
                                name="units"
                                value={formValues.units}
                                onChange={handleChange}
                                label="Unit"
                                required
                            >
                                <MenuItem value={ProductDtoUnitsEnum.Kg}>Kg</MenuItem>
                                <MenuItem value={ProductDtoUnitsEnum.Pieces}>Pcs</MenuItem>
                                <MenuItem value={ProductDtoUnitsEnum.Liters}>Liters</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Price and Currency */}
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField
                            name="price"
                            label="Price (Per Unit)"
                            variant="outlined"
                            type="number"
                            required
                            value={formValues.price}
                            onChange={handleChange}
                            error={errors.price}
                            helperText={
                                errors.price ? "Price must be a positive number" : ""
                            }
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>Currency</InputLabel>
                            <Select
                                name="currency"
                                value={formValues.currency}
                                onChange={handleChange}
                                label="Currency"
                            >
                                <MenuItem value={ProductDtoCurrencyEnum.Usd}>USD</MenuItem>
                                <MenuItem value={ProductDtoCurrencyEnum.Eur}>EUR</MenuItem>
                                <MenuItem value={ProductDtoCurrencyEnum.Gbp}>GBP</MenuItem>
                                <MenuItem value={ProductDtoCurrencyEnum.Bgn}>BGN</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Shipping Fee Responsibility */}
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                            Who Pays for Shipping Fee?
                        </Typography>
                        <ToggleButtonGroup
                            value={formValues.shippingFee}
                            exclusive
                            onChange={(event, value) => {
                                if (value !== null) {
                                    setFormValues({ ...formValues, shippingFee: value });
                                }
                            }}
                            aria-label="shipping fee responsibility"
                        >
                            <ToggleButton
                                value={ProductDtoShippingResponsibilityEnum.Seller}
                                aria-label="seller"
                            >
                                Seller
                            </ToggleButton>
                            <ToggleButton
                                value={ProductDtoShippingResponsibilityEnum.Buyer}
                                aria-label="buyer"
                            >
                                Buyer
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Add Product
                    </Button>
                </form>
            </Box>

            {/* Snackbar to show success or error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000} // Automatically closes after 5 seconds
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddProduct;