import React, {useState} from "react";
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
} from "@mui/material";
import Navbar from "../components/Navbar.tsx";
import {
    ProductControllerApi,
    ProductDto,
    ProductDtoCurrencyEnum,
    ProductDtoShippingResponsibilityEnum,
    ProductDtoUnitsEnum
} from "../api";

//Add image uploading
//Fix UI


const AddProduct: React.FC = () => {
    // const [shippingFee, setShippingFee] = useState("seller");
    // const [quantityUnit, setQuantityUnit] = useState("");
    const [formValues, setFormValues] = useState({
        productName: "",
        description: "",
        quantity: 0,
        units: ProductDtoUnitsEnum.Kg,
        price: 0,
        currency: ProductDtoCurrencyEnum.Bgn,
        shippingFee: ProductDtoShippingResponsibilityEnum.Buyer
    });

    const [errors, setErrors] = useState({
        quantity: false,
        price: false,
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
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

    // Handle Quantity Unit Change
    // const handleUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setQuantityUnit(event.target.value as string);
    // };

    // Handle Shipping Fee Toggle
    // const handleShippingToggle = (
    //     event: React.MouseEvent<HTMLElement>,
    //     newShippingFee: string | null
    // ) => {
    //     if (newShippingFee) {
    //         setShippingFee(newShippingFee);
    //     }
    // };

    // Form Submission Handling
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productApi = new ProductControllerApi();
        let productDto: ProductDto = {
            name: formValues.productName,
            description: formValues.description,
            quantity: formValues.quantity,
            units: formValues.units,
            price: formValues.price,
            currency: formValues.currency,
            shippingResponsibility: formValues.shippingFee,
            // userId: session.userId,
        }
        productApi.createProduct(productDto)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        // Check for validation errors
        // if (!formValues.productName || !formValues.description || !formValues.quantity || errors.quantity || errors.price) {
        //     alert("Please fill in all required fields with valid values.");
        //     return;
        // }

        // Process validated form values
        // console.log("Form Submitted:", { ...formValues, quantityUnit, shippingFee });

        // alert("Product Added Successfully!");
    };

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    marginTop: {xs: 8, sm: 10, md: 12},
                    padding: 4,
                    boxShadow: 2,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" sx={{textAlign: "center", mb: 3}}>
                    Add Product
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <TextField
                        name="productName"
                        label="Product Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={formValues.productName}
                        onChange={handleChange}
                        sx={{mb: 2}}
                    />

                    {/* Description */}
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        value={formValues.description}
                        onChange={handleChange}
                        sx={{mb: 2}}
                    />

                    {/* Quantity and Unit */}
                    <Box sx={{display: "flex", gap: 2, mb: 2}}>
                        <TextField
                            name="quantity"
                            label="Quantity"
                            variant="outlined"
                            type="number"
                            required
                            value={formValues.quantity}
                            onChange={handleChange}
                            error={errors.quantity}
                            helperText={errors.quantity ? "Quantity must be a positive number" : ""}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>Unit</InputLabel>
                            <Select
                                name="units"
                                value={formValues.units}
                                label="Unit"
                                required
                            >
                                <MenuItem value={ProductDtoUnitsEnum.Kg}>Kg</MenuItem>
                                <MenuItem value="pcs">Pcs</MenuItem>
                                <MenuItem value="liters">Liters</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Price and Currency */}
                    <Box sx={{display: "flex", gap: 2, mb: 2}}>
                        <TextField
                            name="price"
                            label="Price (Per Unit)"
                            variant="outlined"
                            type="number"
                            required
                            value={formValues.price}
                            onChange={handleChange}
                            error={errors.price}
                            helperText={errors.price ? "Price must be a positive number" : ""}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>Currency</InputLabel>
                            <Select
                                name="currency"
                                value={formValues.currency}
                                // onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                                //     setFormValues({
                                //         ...formValues,
                                //         currency: e.target.value as string,
                                //     })
                                // }
                                label="Currency"
                            >
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value={ProductDtoCurrencyEnum.Bgn}>BGN</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Shipping Fee Responsibility */}
                    <Box sx={{textAlign: "center", mb: 3}}>
                        <Typography variant="subtitle1" sx={{mb: 1}}>
                            Who Pays for Shipping Fee?
                        </Typography>
                        <ToggleButtonGroup
                            value={formValues.shippingFee}
                            exclusive
                            // onChange={handleShippingToggle}
                            aria-label="shipping fee responsibility"
                        >
                            <ToggleButton value={ProductDtoShippingResponsibilityEnum.Seller} aria-label="seller">
                                Seller
                            </ToggleButton>
                            <ToggleButton value={ProductDtoShippingResponsibilityEnum.Buyer} aria-label="buyer">
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
                        sx={{mt: 2}}
                    >
                        Add Product
                    </Button>
                </form>
            </Box>
        </>
    );
};

export default AddProduct;