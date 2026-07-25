import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: "'Mulish', sans-serif",
        h1: { fontFamily: "'Playfair Display', serif" },
        h2: { fontFamily: "'Playfair Display', serif" },
        h4: { fontFamily: "'Playfair Display', serif" },
    },
    // ...any palette, breakpoints, etc. you already have
});

export default theme;