import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute : React.FC = () => {
    const token = localStorage.getItem("jwtToken"); // Check for token or implement more robust validation
    return token ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoute;