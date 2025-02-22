import React, {useEffect, useState} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {AuthControllerApi} from "../api"; // Adjust the import path to fit your project structure

const PrivateRoute: React.FC = () => {
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();

    useEffect(() => {
        const validateJwtToken = async () => {
            const token = localStorage.getItem("jwtToken");

            if (!token) {
                // No token found, consider it invalid
                setIsTokenValid(false);
                setLoading(false);
                return <Navigate to="/login" state={{from: location}} replace/>;
            }

            try {
                // Call the validateToken API method
                const authControllerApi = new AuthControllerApi(); // Create an instance of the API
                const response = await authControllerApi.validateToken();

                if (response) {
                    // Assume a successful response means the token is valid
                    setIsTokenValid(true);
                } else {
                    setIsTokenValid(false);
                }
            } catch (error) {
                console.error("Token validation error:", error);
                setIsTokenValid(false);
            } finally {
                setLoading(false);
            }
        };

        validateJwtToken();
    }, []);

    if (loading) {
        // Show a loading spinner or message while waiting for the token validation
        return <p>Loading...</p>;
    }

    if (!isTokenValid) {
        // Redirect to login page if the token is invalid
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    // Render the nested route's content if the token is valid
    return <Outlet/>;
};

export default PrivateRoute;