import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Menu,
    MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Favorite, Chat, AddBox, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // Open the dropdown menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the dropdown menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    padding: { xs: "0 8px", sm: "0 16px" }, // Minimize side padding for very small screens
                }}
            >
                {/* Menu Icon: Visible only on small or extra small screens */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                        mr: 1,
                        display: { xs: "block", md: "none" }, // Show on xs/sm screens, hide on md+
                    }}
                    onClick={handleMenuOpen}
                >
                    <MenuIcon />
                </IconButton>

                {/* App Title */}
                <Typography
                    component={Link}
                    to="/"
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontSize: { xs: "1rem", sm: "1.25rem" }, // Adjust text size for smaller screens
                        textAlign: { xs: "center", md: "left" }, // Center title on very small screens
                        textDecoration: "none",
                    }}
                >
                    HarvestHub
                </Typography>

                {/* Dropdown Menu (for MenuIcon): Visible on smaller screens */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)} // Open when MenuIcon is clicked
                    onClose={handleMenuClose} // Close menu
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    {/* Dropdown menu items */}

                    <MenuItem
                        component={Link} // Use Link for navigation
                        to="/favorites" // URL to navigate to
                        onClick={handleMenuClose} // Close the menu after navigation
                    >
                        <Favorite sx={{ mr: 1 }} /> Favorites
                    </MenuItem>
                    <MenuItem
                        component={Link} // Use Link for navigation
                        to="/chat" // URL to navigate to
                        onClick={handleMenuClose} // Close the menu after navigation
                    >
                        <Chat sx={{ mr: 1 }} /> Chat
                    </MenuItem>
                    <MenuItem
                        component={Link} // Use Link for navigation
                        to="/add-product" // URL to navigate to
                        onClick={handleMenuClose} // Close the menu after navigation
                    >
                        <AddBox sx={{ mr: 1 }} /> Add Product
                    </MenuItem>
                    <MenuItem
                        component={Link} // Use Link for navigation
                        to="/profile" // URL to navigate to
                        onClick={handleMenuClose} // Close the menu after navigation
                    >
                        <AccountCircle sx={{ mr: 1 }} /> Profile
                    </MenuItem>
                </Menu>

                {/* Buttons Section: Visible only on medium to larger screens */}
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" }, // Hide on xs/sm screens, visible on md+
                        gap: 1.5, // Slightly reduced spacing for buttons
                    }}
                >
                    <IconButton
                        color="inherit"
                        size="small"
                        component={Link} // Use Link for navigation
                        to="/favorites" // URL to navigate to
                    >
                        <Favorite />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        size="small"
                        component={Link} // Use Link for navigation
                        to="/chat" // URL to navigate to
                    >
                        <Chat />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        size="small"
                        component={Link} // Use Link for navigation
                        to="/add-product" // URL to navigate to
                    >
                        <AddBox />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        size="small"
                        component={Link} // Use Link for navigation
                        to="/profile" // URL to navigate to
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;