import { Box, Container, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';

/*
  Uses the same COLORS/Eyebrow tokens as Contact.jsx / Services.jsx.
  If you've already pulled those into a shared file (e.g. src/theme/tokens.js),
  delete the local copies below and import from there instead.
*/

// ---------- Tokens (keep in sync with Contact.jsx / Services.jsx) ----------
const COLORS = {
    forest: "#1F443D",
    pine: "#14302B",
    ivory: "#FBF7F2",
    rose: "#8A4A54",
    gold: "#B08D57",
    ink: "#24312D",
};

const Eyebrow = ({ children, sx }) => (
    <Typography
        sx={{
            fontFamily: "'Mulish', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.18em",
            fontSize: "0.8rem",
            color: COLORS.gold,
            textTransform: "uppercase",
            mb: 1.5,
            ...sx,
        }}
    >
        {children}
    </Typography>
);

const pricingCategories = [
    {
        title: "Трепки",
        services: [
            { name: "Classic Lash Extensions", price: "1500 ден" },
            { name: "Hybrid Lash Extensions", price: "1700 ден" },
            { name: "Volume Lash Extensions", price: "1700 ден" },
            { name: "Lash Lift", price: "1000 ден" },
            { name: "Lash Lift & Tint", price: "1000 ден" },
            { name: "Brow Lift", price: "1000 ден" },
            { name: "Brow Lift & Tint", price: "1000 ден" },
        ],
    },
    {
        title: "Шминка",
        services: [
            { name: "Невестинска шминка", price: "3000 ден", duration: "90мин" },
            { name: "Стандард шминка", price: "1500ден", duration: "60 мин" },
            { name: "Шминка за матура", price: "1500ден", duration: "60 мин" },
            { name: "Шминка за табло", price: "1200ден", duration: "60 мин" },
        ],
    },
    {
        title: "Нокти",
        services: [
            { name: "Rubber base", price: "600 ден" },
            { name: "Гел на природни нокти", price: "800 ден" },
            { name: "Налив до должина 2", price: "850 ден" },
            { name: "Корекција до должина 2", price: "850 ден" },
            { name: "Налив до должина 3", price: "1000 ден" },
            { name: "Корекција до должина 3", price: "1000 ден" },
            { name: "Налив до должина 4", price: "1100 ден" },
            { name: "Корекција до должина 4", price: "1100 ден" },
            { name: "Налив до должина 5", price: "1200 ден" },
            { name: "Корекција до должина 5", price: "1200 ден" },
            { name: "Дизајн (френч/омбре/хром)", price: "50 ден" },
            { name: "Сложен дизајн (цртеж)", price: "100-200 ден" },
        ],
    },
    {
        title: "Депилација",
        services: [
            { name: "Цели нозе", price: "700ден" },
            { name: "Цели нозе со препони", price: "1000ден" },
            { name: "Пола нозе", price: "400ден" },
            { name: "Цели раце", price: "400ден" },
            { name: "Пола раце", price: "300ден" },
            { name: "Интима", price: "500ден" },
            { name: "Пазуви", price: "250ден" },
            { name: "Стомак", price: "150ден" },
            { name: "Надусници", price: "100ден" },
            { name: "Обликување на веѓи", price: "200ден" },
            { name: "Обликување на веѓи + фарбање", price: "250ден" },
        ],
    },
];

const PriceRow = ({ name, price, duration, isLast }) => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            py: 1.5,
            borderBottom: isLast ? "none" : "1px solid rgba(31,68,61,0.12)",
        }}
    >
        <Box>
            <Typography
                sx={{
                    fontFamily: "'Mulish', sans-serif",
                    fontWeight: 500,
                    color: COLORS.ink,
                    fontSize: { xs: "0.9rem", md: "0.95rem" },
                    lineHeight: 1.4,
                }}
            >
                {name}
            </Typography>
            {duration && (
                <Typography
                    sx={{
                        fontFamily: "'Mulish', sans-serif",
                        color: COLORS.ink,
                        opacity: 0.55,
                        fontSize: "0.78rem",
                        mt: 0.3,
                    }}
                >
                    {duration}
                </Typography>
            )}
        </Box>
        <Typography
            sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                color: COLORS.rose,
                fontSize: { xs: "0.9rem", md: "0.95rem" },
                whiteSpace: "nowrap",
                flexShrink: 0,
            }}
        >
            {price}
        </Typography>
    </Box>
);

const PricingCategory = ({ title, services }) => (
    <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Typography
                variant="h5"
                sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: "bold",
                    color: COLORS.forest,
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                }}
            >
                {title}
            </Typography>
            <Box sx={{ flexGrow: 1, height: "1px", backgroundColor: "rgba(31,68,61,0.2)" }} />
        </Box>

        <Box>
            {services.map((service, index) => (
                <PriceRow key={service.name} {...service} isLast={index === services.length - 1} />
            ))}
        </Box>
    </Box>
);

const Pricing = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ backgroundColor: COLORS.ivory, py: { xs: 4, md: 8 } }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
                    <Eyebrow sx={{ justifyContent: "center", display: "flex" }}>Ценовник</Eyebrow>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 600,
                            color: COLORS.forest,
                            fontSize: { xs: "2rem", md: "2.6rem" },
                        }}
                    >
                        Цени на услугите
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 5, md: 6 }}>
                    {pricingCategories.map((category) => (
                        <Grid item xs={12} md={6} key={category.title}>
                            <PricingCategory {...category} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Pricing;