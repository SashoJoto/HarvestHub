import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
import FavoritesPage from "../pages/FavoritesPage";
// import ChatPage from "../pages/ChatPage";
import AddProductPage from "../pages/AddProductPage";
import ProfilePage from "../pages/ProfilePage";
import ProductPage from "../pages/ProductPage";
import PrivateRoute from "../security/PrivateRoute.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import EditProfilePage from "../pages/EditProfilePage.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    element={
                        <PrivateRoute/>
                    }
                >
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/favorites" element={<FavoritesPage/>}/>
                    {/*<Route path="/chat" element={<ChatPage/>}/>*/}
                    <Route path="/add-product" element={<AddProductPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/product/:id" element={<ProductPage/>}/>
                    <Route path="/edit-profile" element={<EditProfilePage/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;