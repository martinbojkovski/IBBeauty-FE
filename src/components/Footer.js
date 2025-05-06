import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: '#1f443d',
            padding: '2px 0',
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            textAlign: 'center',
            zIndex: 999, // Ensure it stays on top
        }}>
            <Typography variant="body2" color="white">
                 &copy; Martin Bojkovski - 2025
            </Typography>
        </Box>
    );
}

export default Footer;
