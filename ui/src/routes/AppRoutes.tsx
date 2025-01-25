import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
import FavoritesPage from "../pages/FavoritesPage";
import ChatPage from "../pages/ChatPage";
import AddProductPage from "../pages/AddProductPage";
import ProfilePage from "../pages/ProfilePage";
import ProductPage from "../pages/ProductPage";

// Add product id
const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {/*<Route path="/register" element={<RegisterPage />} />*/}
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/add-product" element={<AddProductPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/product" element={<ProductPage />} />
                {/* Redirect unknown routes to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;