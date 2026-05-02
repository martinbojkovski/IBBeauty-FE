import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: '#1f443d',
            padding: `2px 0 calc(2px + env(safe-area-inset-bottom))`, // ✅ iOS safe-bottom padding
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            textAlign: 'center',
            zIndex: 999,
        }}>
            <Typography variant="body2" sx={{ color: '#fff' }}>
                &copy; Bojkovski Development - 2025
            </Typography>
        </Box>
    );
};

export default Footer;
