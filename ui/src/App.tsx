import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Normalize CSS and reset styles
import AppRoutes from "./routes/AppRoutes"; // Your application routes
import theme from "./styles/theme";       // Import the custom theme


const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
        </ThemeProvider>
    );
};

export default App;