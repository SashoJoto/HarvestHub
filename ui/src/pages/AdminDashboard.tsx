/*
import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { AdminControllerApi, UserDto, ProductDto } from "../api";

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [products, setProducts] = useState<ProductDto[]>([]);
    const adminController = new AdminControllerApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await adminController.getAllUsers();
                const productsResponse = await adminController.getAllProducts();
                setUsers(usersResponse.data);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error("Failed to load admin data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteUser = async (id: number) => {
        try {
            await adminController.deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            await adminController.deleteProduct(id);
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Admin Dashboard
            </Typography>

            {/!* Users Table *!/}
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Users
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteUser(user.id!)}
                                    >
                                        Delete User
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/!* Products Table *!/}
            <Typography variant="h5" sx={{ marginTop: 5, marginBottom: 2 }}>
                Products
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteProduct(product.id!)}
                                    >
                                        Delete Product
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminDashboard;*/
