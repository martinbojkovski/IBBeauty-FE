import * as React from 'react';
import {
    AppBar, Box, Toolbar, IconButton, Typography,
    Drawer, List, ListItem, ListItemText, Button, Container, Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';

const pages = ['Posts', 'Reservations', 'Services', 'Pricing', 'Contact'];

function Appbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { token } = useContext(AuthContext);

    const isLoggedIn = Boolean(token);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const drawer = (
        <Box
            sx={{
                width: 250,
                height: '100%',
                backgroundColor: '#1f443d',
                color: 'white',
            }}
            role="presentation"
        >
            {/* Logo and Close Icon */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Link
                    to="/"
                    onClick={toggleDrawer(false)}
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                >
                    <Box
                        component="img"
                        src="/logo.jpeg"
                        alt="Logo"
                        sx={{ width: 35, height: 35, mr: 1 }}
                    />
                </Link>
                <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

            {/* Navigation items */}
            <List>
                {pages.map((page) => (
                    <ListItem
                        button
                        key={page}
                        component={Link}
                        to={`/${page.toLowerCase()}`}
                        onClick={toggleDrawer(false)}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <ListItemText
                            primary={
                                <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
                                    {page}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#1f443d' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <Box
                            component="img"
                            src="/logo.jpeg"
                            alt="Logo"
                            sx={{ display: { md: 'flex' }, mr: 1, width: 40, height: 40 }}
                        />
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={toggleDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="left"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            {drawer}
                        </Drawer>
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

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {isLoggedIn ? (
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                Hi Ivana! ❤️
                            </Typography>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                sx={{ color: 'white', opacity: 0 }}
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