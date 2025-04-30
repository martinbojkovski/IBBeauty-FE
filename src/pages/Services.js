import { Box, Container, Grid, Typography, Card, CardContent, useTheme, useMediaQuery } from '@mui/material';

const Services = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const services = [
        {
            id: 1,
            title: "Шминка",
            description: "Шминка е есклузивна услуга во нашиот салон прилагодена на вашите уникатни потреби и стил. Користиме само најквалитетни производи кои гарантираат долготраен ефект и природен изглед. Ние сме тука да ви помогнеме да се чувствувате убаво, самоуверено и спремни за секоја прилика."
        },
        {
            id: 2,
            title: "Нокти",
            description: "Маникир е услуга која ги облагородува вашите нокти, создавајќи здрав и негуван изглед. Нашата понуда е широка, без разлика дали сакате класичен маникир, модерни дизајни или rubber, ние користиме најквалитетни материјали и техники за долготраен резултат. Вашите нокти секогаш ќе изгледаат прекрасно и здраво."
        },
        {
            id: 3,
            title: "Екстензии на трепки",
            description: "Екстензии на трепки се вештачки трепки кои се внимателно прикачени на вашите природни трепки, создавајќи ефект на подолги, погусти и поголеми трепки. Овие трепки изгледаат природно и се изведуваат во различни стилови и должини, во зависност од вашите желби. Екстензиите се идеални за секојдневен изглед, како и за специјални настани, и траат од неколку недели."
        },
        {
            id: 4,
            title: "Лифтинг и ботокс на трепки",
            description: "Лифтинг на трепки е професионална услуга која ги подигнува, витка и истакнува вашите природни трепки, давајќи им подолг, поголем и повеќе отворен изглед на очите. Процесот е безболен и брз, без потреба од маскара или вештачки трепки. Резултатите се долготрајни, со природен ефект што трае и до 6 недели. Ова е идеален начин да ги истакнете вашите трепки и да добиете неверојатен изглед без дополнителен напор!"
        },
        {
            id: 5,
            title: "Лифтинг и ботокс на веѓи",
            description: "Лифтинг на веѓи е неинвазивна процедура која го подигнува и оформува контурот на веѓите, враќајќи им помлад и свеж изглед. Овој третман влијае на кератинска структура на влакното, што го омекнува и ви дозволува да ја дибиете најидеалната форма на вашата веѓа."
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{
                    color: '#1f443d',
                    fontWeight: 'bold',
                    mb: 6,
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '2rem'
                    }
                }}
            >
                ЗА НАШИТЕ УСЛУГИ
            </Typography>

            <Grid container spacing={4}>
                {services.map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                border: `2px solid #1f443d`,
                                borderRadius: '12px',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: theme.shadows[6]
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    gutterBottom
                                    sx={{
                                        color: '#1f443d',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            backgroundColor: '#1f443d',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: 30,
                                            height: 30,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {service.id}
                                    </Box>
                                    {service.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        lineHeight: 1.7,
                                        [theme.breakpoints.down('sm')]: {
                                            fontSize: '0.95rem'
                                        }
                                    }}
                                >
                                    {service.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Services;