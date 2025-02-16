import React, {useState, useEffect, useRef} from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    // AppBar,
    // Toolbar,
    // IconButton,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";
import {AuthControllerApi, LoginRequest} from "../api"; // Assuming you have a Navbar component.

// Login Page Component
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [credentials, setCredentials] = useState({email: "", password: ""});

    const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        emailInputRef.current?.focus(); // Focus on the email input
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCredentials((prev) => ({...prev, [name]: value}));
    };

    // Simulate login action
    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const authentication: AuthControllerApi = new AuthControllerApi();
        let loginRequest: LoginRequest = {
            username: credentials.email,
            password: credentials.password
        };
        authentication.login(loginRequest)
            .then(response => {
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    let token: string = (response.data as { token: string }).token;
                    if (token) {
                        localStorage.setItem("jwtToken", token);
                    }
                    navigate("/");
                }
            })
            .catch(error => {
                alert("Invalid credentials. Please try again. " + error.message);
            });
    };

    return (
        <>
            {/* Navbar */}
            <Navbar/>

            {/* Restricted Area - Show Login Form if Not Logged In */}
            {!isLoggedIn ? (
                    <Box
                        sx={{
                            height: "calc(100vh - 64px)", // Adjust for navbar height
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            padding: 2,
                        }}
                    >
                        {/* Heading */}
                        <Typography
                            variant="h4"
                            sx={{
                                mb: 3,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            Log In to Access the Platform
                        </Typography>

                        {/* Login Form */}
                        <Box
                            component="form"
                            onSubmit={login}
                            sx={{
                                width: "90%",
                                maxWidth: "400px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            {/* Email Input */}
                            <TextField
                                label="Email"
                                name="email"
                                // type="email"
                                inputRef={emailInputRef}
                                value={credentials.email}
                                onChange={handleChange}
                                fullWidth
                                required
                            />

                            {/* Password Input */}
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                fullWidth
                                required
                            />

                            {/* Login Button */}
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                            >
                                Log In
                            </Button>
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: "center",
                                    mt: 2,
                                    color: "text.secondary",
                                }}
                            >
                                Don't have an account?{" "}
                                <Button
                                    component="a"
                                    href="/register"
                                    variant="text"
                                    size="small"
                                    sx={{ padding: 0 }}
                                >
                                    Register
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
            ) : (
                // Display Protected Content (After Login)
                <Box
                    sx={{
                        padding: {xs: 2, sm: 4},
                        maxWidth: "800px",
                        margin: "0 auto",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{fontWeight: "bold", marginTop: 3, textAlign: "center"}}
                    >
                        Welcome to the Platform!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{marginTop: 2, color: "text.secondary", textAlign: "center"}}
                    >
                        You are now logged in. Feel free to explore the rest of the platform.
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default LoginPage;