import React from 'react';
import { Button, TextField } from '@mui/material';
import Navbar from '../components/Navbar';

const LoginPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div style={{ padding: 20 }}>
                <h1>Login</h1>
                <TextField label="Username" fullWidth />
                <TextField label="Password" type="password" fullWidth style={{ marginTop: 10 }} />
                <Button variant="contained" style={{ marginTop: 20 }}>Login</Button>
            </div>
        </>
    );
};

export default LoginPage;