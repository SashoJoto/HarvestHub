import React from "react";
import {
    Box,
    Typography,
    // Avatar,
    IconButton,
    // ButtonBase,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Heart icon

interface ProductProps {
    // image: string;
    title: string;
    // user: {
    //     name: string;
    //     avatar: string;
    // };
    // location: string;
    // date: string;
    price: number | undefined;
}

const Product: React.FC<ProductProps> = ({
                                             // image,
                                             title,
                                             // user,
                                             // location,
                                             // date,
                                             price,
                                         }) => {
    return (
        <Box
            sx={{
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
                marginTop:2
            }}
        >
            {/* Left Section: Product Image */}
            {/*<Box>*/}
            {/*    <ButtonBase>*/}
            {/*        <img*/}
            {/*            src={image}*/}
            {/*            alt={title}*/}
            {/*            style={{*/}
            {/*                width: "150px",*/}
            {/*                height: "150px",*/}
            {/*                borderRadius: "4px",*/}
            {/*                objectFit: "cover",*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </ButtonBase>*/}
            {/*</Box>*/}

            {/* Center Section: Product Info */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {/* Top Section: Title */}
                <Typography
                    variant="h5"
                    component="span"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                    {title}
                </Typography>

                {/* Middle Section: User */}
                {/*<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>*/}
                {/*    <Avatar src={user.avatar} alt={user.name} sx={{ width: 30, height: 30 }} />*/}
                {/*    <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>*/}
                {/*        {user.name}*/}
                {/*    </Typography>*/}
                {/*</Box>*/}

                {/* Bottom Section: Location and Creation Date */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "auto", // Push to bottom
                        gap: 0.5, // Small space between location and date
                    }}
                >
                    {/*<Typography variant="body2" sx={{ color: "text.secondary" }}>*/}
                    {/*    {location}*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="body2" sx={{ color: "text.secondary" }}>*/}
                    {/*    {date}*/}
                    {/*</Typography>*/}
                </Box>
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
                    {price}$
                </Typography>

                {/* Like Button */}
                <IconButton sx={{ color: "secondary.main" }}>
                    <FavoriteBorderIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Product;