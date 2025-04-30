import { Box, Container, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const StyledImage = styled('img')({
        borderRadius: '16px',
        boxShadow: theme.shadows[4],
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    });

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* Salon Section */}
            <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
                {!isMobile && (
                    <Grid item md={6}>
                        <StyledImage
                            src="/cards.png"
                            alt="Beauty salon interior"
                            sx={{ maxHeight: 500 }}
                        />
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom sx={{ color: '#1f443d', fontWeight: 'bold' }}>
                        ЗА САЛОН
                    </Typography>
                    <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Нашиот салон е посветен на создавање незаборавни изгледи со врвни услуги во шминка,
                        маникир и апликација на трепки. Со тим од професионалци и страст за убавината, нудиме
                        персонализиран пристап за секој клиент, осигурувајќи дека секоја посета ќе биде искуство што
                        ги надминува вашите очекувања.
                    </Typography>
                    <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Користиме само најквалитетни производи и најновите
                        техники, што ни овозможува да понудиме безбедни и долготрајни резултати. Со нас, секој
                        момент е посебен и секоја услуга е дело на уметност.
                    </Typography>
                </Grid>
                {isMobile && (
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <StyledImage
                            src="/cards.png"
                            alt="Beauty salon interior"
                        />
                    </Grid>
                )}
            </Grid>

            {/* Ivana Section */}
            <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
                <Grid item xs={12} md={6} order={isMobile ? 1 : 2}>
                    <Typography variant="h4" gutterBottom sx={{ color: '#1f443d', fontWeight: 'bold' }}>
                        ЗА МЕНЕ
                    </Typography>
                    <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Јас сум Ивана Божиновска, сопственик на нов, престижен beauty салон каде женската убавина и
                        нега секогаш се најважното нешто за нас. Мојот професионален пат и развој го бележат
                        многубројни стручни едукации од област на шминка и козметика.
                    </Typography>
                    <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Со години искуство во индустријата за убавина, сум посветена на создавање перфектни изгледи што го нагласуваат
                        убавото во секоја жена. Верувам во континуирано учење и усовршување, што го докажувам со
                        постојано пратење на нови трендови и внесување на нешто ново во нашиот салон.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} order={isMobile ? 2 : 1}>
                    <StyledImage
                        src="/Ivana.png"
                        alt="Ivana Bozinovska"
                        sx={{ maxHeight: 650 }}
                    />
                </Grid>
            </Grid>

            {/* Sonja Section */}
            <Grid container spacing={6} alignItems="center">
                {!isMobile && (
                    <Grid item md={6}>
                        <StyledImage
                            src="/Sonja.jpg"
                            alt="Sonja Bozinovska"
                            sx={{ maxHeight: 550 }}
                        />
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom sx={{ color: '#1f443d', fontWeight: 'bold' }}>
                        ЗА СОЊА
                    </Typography>
                    <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Соњица Божиновска е уметничка душа која го претвора маникирот во вистинска уметност. Со
                        својата креативност и посветеност, таа создава уникатни и впечатливи дизајни кои ги
                        одразуваат личностите и стиловите на секој клиент.
                    </Typography>
                    <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Нејзината цел е да ги направи вашите нокти
                        не само совршени, туку и израз на вашата индивидуалност. Со внимание на деталите и желба
                        да ги надмине очекувањата на клиентите, таа создава неверојатни резултати кои ќе ве остават
                        без здив.
                    </Typography>
                </Grid>
                {isMobile && (
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <StyledImage
                            src="/Sonja.jpg"
                            alt="Sonja Bozinovska"
                        />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default About;