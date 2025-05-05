import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";  // Import the AuthContext
import { useContext } from "react"; // <-- Add this line

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { updateToken } = useContext(AuthContext); // Access the context

    const handleLogin = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/jwt/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }

            const data = await response.json();

            if (data.token_type && data.access_token) {
                const newToken = `${data.token_type} ${data.access_token}`;
                updateToken(newToken);  // Update the global token
                navigate('/');
            } else {
                throw new Error('Invalid response data');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ marginTop: 8 }}>
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Welcome back ❤️
                </Typography>

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <Typography color="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}

                <Button
                    color="success"
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="success" /> : 'Login'}
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
