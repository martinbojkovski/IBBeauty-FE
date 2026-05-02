import { Box, Container, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from "framer-motion";

const ScrollWrapper = styled(Box)({
    scrollSnapType: "y mandatory",
    height: "90vh",
    overflowY: "auto",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { display: "none" }
});

const Section = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    scrollSnapAlign: "start",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const StyledImage = styled("img")(({ theme }) => ({
    borderRadius: "16px",
    boxShadow: theme.shadows[3],
    width: "100%",
    height: "auto",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    "&:hover": { transform: "scale(1.015)" },
    [theme.breakpoints.up("md")]: {
        maxWidth: "75%",
        margin: "0 auto",
    }
}));

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <ScrollWrapper>

            {/* ================= SALON ================= */}
            {isMobile ? (
                <Section>
                    <Container maxWidth="sm">
                        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ textAlign: "center" }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1f443d", mb: 3 }}>
                                ЗА САЛОНОТ
                            </Typography>

                            <StyledImage src="/cards.png" alt="Beauty salon interior" style={{ marginBottom: 20 }} />

                            <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 2 }}>
                                Нашиот салон е посветен на создавање незаборавни изгледи со врвни услуги во шминка,
                                маникир и апликација на трепки. Со тим од професионалци и страст за убавината, нудиме
                                персонализиран пристап за секој клиент, осигурувајќи дека секоја посета ќе биде искуство што
                                ги надминува вашите очекувања.
                            </Typography>

                            <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                                Користиме само најквалитетни производи и најновите техники, што ни овозможува да понудиме
                                безбедни и долготрајни резултати. Со нас, секој момент е посебен и секоја услуга е дело на уметност.
                            </Typography>
                        </motion.div>
                    </Container>
                </Section>
            ) : (
                <Section>
                    <Container maxWidth="lg">
                        <Grid container spacing={4} alignItems="center" justifyContent="center">
                            <Grid item md={6}>
                                <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1f443d", mb: 3 }}>
                                        ЗА САЛОНОТ
                                    </Typography>

                                    <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 2 }}>
                                        Нашиот салон е посветен на создавање незаборавни изгледи со врвни услуги во шминка,
                                        маникир и апликација на трепки. Со тим од професионалци и страст за убавината, нудиме
                                        персонализиран пристап за секој клиент, осигурувајќи дека секоја посета ќе биде искуство што
                                        ги надминува вашите очекувања.
                                    </Typography>

                                    <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                                        Користиме само најквалитетни производи и најновите техники, што ни овозможува да понудиме
                                        безбедни и долготрајни резултати. Со нас, секој момент е посебен и секоја услуга е дело на уметност.
                                    </Typography>
                                </motion.div>
                            </Grid>

                            <Grid item md={6}>
                                <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                                    <StyledImage src="/cards.png" alt="Beauty salon interior" />
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Container>
                </Section>
            )}

            {/* ================= ZA MENE ================= */}
            {isMobile ? (
                <Section>
                    <Container maxWidth="sm">
                        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ textAlign: "center" }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1f443d", mb: 3 }}>
                                ЗА МЕНЕ
                            </Typography>

                            <StyledImage src="/Ivana.png" alt="Ivana Bozinovska" style={{ marginBottom: 20 }} />

                            <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 2 }}>
                                Јас сум Ивана Божиновска, сопственик на нов, престижен beauty салон каде женската убавина и
                                нега секогаш се најважното нешто за нас. Мојот професионален пат и развој го бележат
                                многубројни стручни едукации од областа на шминка и козметика.
                            </Typography>

                            <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                                Со години искуство во индустријата за убавина, сум посветена на создавање перфектни изгледи што
                                го нагласуваат убавото во секоја жена. Верувам во континуирано учење и усовршување, што го
                                докажувам со следење на најновите трендови и воведување нови техники и пристапи во нашиот салон.
                            </Typography>
                        </motion.div>
                    </Container>
                </Section>
            ) : (
                <Section>
                    <Container maxWidth="lg">
                        <Grid container spacing={4} alignItems="center" justifyContent="center">
                            <Grid item md={6}>
                                <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1f443d", mb: 3 }}>
                                        ЗА ИВАНА
                                    </Typography>

                                    <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 2 }}>
                                        Јас сум Ивана Божиновска, сопственик на нов, престижен beauty салон каде женската убавина и
                                        нега секогаш се најважното нешто за нас. Мојот професионален пат и развој го бележат
                                        многубројни стручни едукации од областа на шминка и козметика.
                                    </Typography>

                                    <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                                        Со години искуство во индустријата за убавина, сум посветена на создавање перфектни изгледи што
                                        го нагласуваат убавото во секоја жена. Верувам во континуирано учење и усовршување, што го
                                        докажувам со следење на најновите трендови и воведување нови техники и пристапи во нашиот салон.
                                    </Typography>
                                </motion.div>
                            </Grid>

                            <Grid item md={6}>
                                <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                                    <StyledImage src="/Ivana.png" alt="Ivana Bozinovska" />
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Container>
                </Section>
            )}

            {/* ================= ZA SONJA ================= */}
            {isMobile ? (
                <Section>
                    <Container maxWidth="sm">
                        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ textAlign: "center" }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1f443d", mb: 3 }}>
                                ЗА СОЊА
                            </Typography>

                            <StyledImage src="/Sonja.jpg" alt="Sonja Bozinovska" style={{ marginBottom: 20 }} />

                            <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 2 }}>
                                Соњица Божиновска е уметничка душа која го претвора маникирот во вистинска уметност. Со
                                својата креативност и посветеност, таа создава уникатни и впечатливи дизајни кои ги
                                одразуваат личностите и стиловите на секој клиент.
                            </Typography>

                            <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                                Нејзината цел е да ги направи вашите нокти не само совршени, туку и израз на вашата индивидуалност.
                                Со внимание на деталите и желба да ги надмине очекувањата на клиентите, таа создава неверојатни резултати
                                кои ќе ве остават без здив.
                            </Typography>
                        </motion.div>
                    </Container>
                </Section>
            ) : (
                <Section>
                    <Container maxWidth="lg">
                        <Grid container spacing={4} alignItems="center" justifyContent="center">
                            <Grid item md={6}>
                                <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1f443d", mb: 3 }}>
                                        ЗА СОЊА
                                    </Typography>

                                    <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 2 }}>
                                        Соњица Божиновска е уметничка душа која го претвора маникирот во вистинска уметност. Со
                                        својата креативност и посветеност, таа создава уникатни и впечатливи дизајни кои ги
                                        одразуваат личностите и стиловите на секој клиент.
                                    </Typography>

                                    <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                                        Нејзината цел е да ги направи вашите нокти не само совршени, туку и израз на вашата индивидуалност.
                                        Со внимание на деталите и желба да ги надмине очекувањата на клиентите, таа создава неверојатни резултати
                                        кои ќе ве остават без здив.
                                    </Typography>
                                </motion.div>
                            </Grid>

                            <Grid item md={6}>
                                <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                                    <StyledImage src="/Sonja.jpg" alt="Sonja Bozinovska" />
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Container>
                </Section>
            )}

        </ScrollWrapper>
    );
};

export default About;
