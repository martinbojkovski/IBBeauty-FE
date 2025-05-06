import * as React from 'react';
import {
    AppBar, Box, Toolbar, IconButton, Typography,
    Menu, MenuItem, Button, Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext'; // Adjust path as needed

const pages = ['Posts', 'Reservations', 'Services', 'Pricing', 'Contact'];

function Appbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { token } = useContext(AuthContext); // Get token from context

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const isLoggedIn = Boolean(token);

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#1f443d' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Box
                            component="img"
                            src="/logo.jpeg"
                            alt="Logo"
                            sx={{ display: { md: 'flex' }, mr: 1, width: 40, height: 40 }}
                        />
                    </Link>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    component={Link}
                                    to={`/${page.toLowerCase()}`}
                                    onClick={handleCloseNavMenu}
                                >
                                    {page}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Desktop Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={Link}
                                to={`/${page.toLowerCase()}`}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Right-side */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {isLoggedIn ? (
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                Hi Ivana! ❤️
                            </Typography>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                sx={{ color: 'white', display: 'block', opacity: 0 }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Appbar;