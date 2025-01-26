import { createTheme } from "@mui/material/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(50,66,60)", // Navbar color
        },
        background: {
            default: "rgb(78,104,90)", // Page background color
            paper: "rgb(34,47,50)",    // Blocks and UI elements like cards
        },
        text: {
            primary: "#FFFFFF",        // Default text color
            secondary: "rgb(69,237,130)", // Special or selected text
        },
    },
    typography: {
        allVariants: {
            color: "#FFFFFF", // Ensure text is globally white as a base
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none", // Avoid default uppercase for buttons
                    color: "#FFFFFF",       // Default text color for buttons
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgb(50,66,60)", // Navbar default color
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgb(34,47,50)", // Blocks for categories or UI elements
                    color: "#FFFFFF",                // Text inside blocks
                    borderRadius: "8px",             // Optional: Rounded corners
                },
            },
        },
    },
});

export default theme;