import { createTheme } from "@mui/material/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(50,66,60)",
        },
        background: {
            default: "rgb(78,104,90)",
            paper: "rgb(34,47,50)",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "rgb(69,237,130)",
        },
    },
    typography: {
        allVariants: {
            color: "#FFFFFF",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    color: "#FFFFFF",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgb(50,66,60)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgb(34,47,50)",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                },
            },
        },
    },
});

export default theme;