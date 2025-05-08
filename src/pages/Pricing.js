import { Box, Container, Typography, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
const Pricing = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const pricingCategories = [
        {
            title: "ТРЕПКИ",
            services: [
                { name: "Classic Lash Extensions", price: "1500ден" },
                { name: "Hybrid Lash Extensions", price: "1700ден" },
                { name: "Volume Lash Extensions", price: "1700ден" },
                { name: "Lash Lift", price: "1000ден" },
                { name: "Lash Lift & Tint", price: "1000ден" },
                { name: "Brow Lift", price: "1000ден" },
                { name: "Brow Lift & Tint", price: "1000ден" }
            ]
        },
        {
            title: "ШМИНКА",
            services: [
                { name: "Невестинска шминка", price: "3.000ден", duration: "90мин" },
                { name: "Стандард шминка", price: "1.500ден", duration: "60мин" },
                { name: "Шминка за матура", price: "1.500ден", duration: "60мин" },
                { name: "Шминка за табло", price: "1.200ден", duration: "60мин" }
            ]
        },
        {
            title: "НОКТИ",
            services: [
                { name: "Rubber base", price: "500ден"}
                { name: "Гел на природни нокти", price: "700ден" },
                { name: "Налив до должина 2", price: "750ден" },
                { name: "Корекција до должина 2", price: "750ден" },
                { name: "Налив до должина 3", price: "850ден" },
                { name: "Корекција до должина 3", price: "800ден" },
                { name: "Налив до должина 4", price: "950ден" },
                { name: "Корекција до должина 4", price: "900ден" },
                { name: "Налив до должина 5", price: "1.100ден" },
                { name: "Корекција до должина 5", price: "950ден" },
                { name: "Дизајн (френч/омбре/хром)", price: "50ден" },
                { name: "Сложен дизајн (цртеж)", price: "100-200ден" }
            ]
        }
    ];

    return (
        <Box sx={{
            py: isMobile ? 4 : 8,
            backgroundColor: '#f9f9f9'
        }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    sx={{
                        color: '#1f443d',
                        fontWeight: 'bold',
                        mb: isMobile ? 4 : 6,
                        fontSize: isMobile ? '1.8rem' : '2.4rem',
                        px: isMobile ? 2 : 0
                    }}
                >
                    ЦЕНОВНИК
                </Typography>

                <Grid container spacing={isMobile ? 2 : 4}>
                    {pricingCategories.map((category) => (
                        <Grid item xs={12} md={4} key={category.title}>
                            <Paper
                                elevation={isMobile ? 1 : 3}
                                sx={{
                                    p: isMobile ? 2 : 3,
                                    borderRadius: '12px',
                                    height: '100%',
                                    borderTop: `4px solid #1f443d`,
                                    mx: isMobile ? 1 : 0
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: '#1f443d',
                                        fontWeight: 'bold',
                                        mb: 2,
                                        textAlign: 'center',
                                        fontSize: isMobile ? '1.2rem' : '1.5rem'
                                    }}
                                >
                                    {category.title}
                                </Typography>

                                <Box component="ul" sx={{
                                    pl: 0,
                                    listStyle: 'none',
                                    '& li': {
                                        mb: 1,
                                        pb: 1,
                                        borderBottom: '1px solid #eee'
                                    }
                                }}>
                                    {category.services.map((service) => (
                                        <Box component="li" key={service.name}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap'
                                            }}>
                                                <Typography sx={{
                                                    fontWeight: 500,
                                                    fontSize: isMobile ? '0.9rem' : '1rem',
                                                    width: isMobile ? '60%' : 'auto'
                                                }}>
                                                    {service.name}
                                                </Typography>
                                                <Typography sx={{
                                                    fontWeight: 'bold',
                                                    color: '#1f443d',
                                                    fontSize: isMobile ? '0.9rem' : '1rem',
                                                    minWidth: isMobile ? '35%' : 'auto',
                                                    textAlign: 'right'
                                                }}>
                                                    {service.price}
                                                </Typography>
                                            </Box>
                                            {service.duration && (
                                                <Typography variant="body2" sx={{
                                                    color: 'text.secondary',
                                                    mt: 0.5,
                                                    fontSize: isMobile ? '0.8rem' : '0.9rem'
                                                }}>
                                                    {service.duration}
                                                </Typography>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Pricing;