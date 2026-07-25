import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from "framer-motion";

/*
  FONTS — add to your index.html <head> (Cyrillic subsets included):
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Mulish:wght@400;500;600;700&display=swap" rel="stylesheet">

  Then in your MUI theme:
  typography: {
    fontFamily: "'Mulish', sans-serif",
    h1: { fontFamily: "'Playfair Display', serif" },
    h2: { fontFamily: "'Playfair Display', serif" },
    h4: { fontFamily: "'Playfair Display', serif" },
  }
*/

// ---------- Tokens ----------
const COLORS = {
    forest: "#1F443D",
    pine: "#14302B",
    ivory: "#FBF7F2",
    rose: "#B98289",
    gold: "#B08D57",
    ink: "#24312D",
};

// ---------- Shared layout primitives ----------
const ScrollWrapper = styled(Box)({
    scrollSnapType: "y proximity",
    height: "100dvh",
    overflowY: "auto",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { display: "none" },
});

const Section = styled(Box)(({ theme, bg }) => ({
    minHeight: "100dvh",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "30px",
    paddingBottom: "80px",
    boxSizing: "border-box",
    background: bg || COLORS.ivory,
    [theme.breakpoints.down("md")]: {
        paddingTop: "88px",
    },
}));

const StyledImage = styled("img")(({ theme }) => ({
    borderRadius: "16px",
    boxShadow: "0 20px 40px -12px rgba(20,48,43,0.25)",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    "&:hover": { transform: "scale(1.015)" },
    [theme.breakpoints.up("md")]: { maxWidth: "75%", margin: "0 auto" },
}));

const PrimaryButton = styled(Button)({
    backgroundColor: COLORS.rose,
    color: "#fff",
    fontFamily: "'Mulish', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.03em",
    padding: "12px 28px",
    borderRadius: "999px",
    textTransform: "none",
    fontSize: "1rem",
    "&:hover": { backgroundColor: "#a5717a" },
});

const SecondaryButton = styled(Button)({
    color: COLORS.forest,
    border: `1.5px solid ${COLORS.forest}`,
    fontFamily: "'Mulish', sans-serif",
    fontWeight: 600,
    padding: "11px 26px",
    borderRadius: "999px",
    textTransform: "none",
    fontSize: "1rem",
    "&:hover": { backgroundColor: "rgba(31,68,61,0.06)", border: `1.5px solid ${COLORS.forest}` },
});

const Eyebrow = styled(Typography)({
    fontFamily: "'Mulish', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.18em",
    fontSize: "0.8rem",
    color: COLORS.gold,
    textTransform: "uppercase",
    marginBottom: "12px",
});

// ---------- Hero ----------
const Hero = ({ isMobile }) => {
    const navigate = useNavigate();

    return (
        <Section bg={`linear-gradient(180deg, ${COLORS.ivory} 0%, #F3ECE3 100%)`}>
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <Eyebrow>Шминка · Маникир · Трепки · Веѓи</Eyebrow>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontWeight: 600,
                                    color: COLORS.forest,
                                    lineHeight: 1.15,
                                    fontSize: { xs: "2.4rem", md: "3.2rem" },
                                    mb: 3,
                                }}
                            >
                                Каде убавината{isMobile ? " " : <br />}станува уметност
                            </Typography>
                            <Typography sx={{ fontSize: "1.15rem", lineHeight: 1.7, color: COLORS.ink, mb: 4, maxWidth: 460 }}>
                                Персонализирани третмани за шминка, маникир, трепки и веѓи во престижен салон.
                                Секоја посета е искуство создадено само за вас.
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                <PrimaryButton size="large" onClick={() => navigate('/reservations')}>Кон Термини</PrimaryButton>
                                <SecondaryButton size="large" onClick={() => navigate('/services')}>Кон Услуги</SecondaryButton>
                            </Box>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
                            <Box sx={{ position: "relative", height: { xs: 320, md: 440 }, overflow: "hidden", px: 1 }}>
                                {/* organic blob backdrop */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        background: `radial-gradient(60% 60% at 50% 40%, rgba(31,68,61,0.18) 0%, rgba(31,68,61,0) 70%)`,
                                        borderRadius: "50%",
                                        zIndex: 0,
                                    }}
                                />
                                <Box
                                    component="img"
                                    src="/cards.png"
                                    alt="Салон"
                                    sx={{
                                        position: "absolute", top: 0, left: "8%", width: "62%",
                                        borderRadius: "16px", boxShadow: "0 20px 40px -12px rgba(20,48,43,0.3)",
                                        transform: "rotate(-4deg)", zIndex: 1,
                                    }}
                                />
                                <Box
                                    component="img"
                                    src="/Ivana.png"
                                    alt="Ивана"
                                    sx={{
                                        position: "absolute", bottom: 0, right: "0%", width: "42%",
                                        borderRadius: "16px", boxShadow: "0 20px 40px -12px rgba(20,48,43,0.3)",
                                        transform: "rotate(3deg)", zIndex: 2, border: `4px solid ${COLORS.ivory}`,
                                    }}
                                />
                                <Box
                                    component="img"
                                    src="/Sonja.jpg"
                                    alt="Соња"
                                    sx={{
                                        position: "absolute", bottom: "8%", left: "0%", width: "34%",
                                        borderRadius: "14px", boxShadow: "0 16px 32px -12px rgba(20,48,43,0.3)",
                                        transform: "rotate(-6deg)", zIndex: 2, border: `4px solid ${COLORS.ivory}`,
                                        display: { xs: "none", sm: "block" },
                                    }}
                                />
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Section>
    );
};

// ---------- Combined Team (replaces two separate full-screen sections) ----------
const TeamCard = ({ img, alt, name, role, bio, imgPosition = "center" }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        style={{ flex: 1 }}
    >
        <Box sx={{ textAlign: "center", px: { xs: 1, md: 3 } }}>
            <Box
                component="img"
                src={img}
                alt={alt}
                sx={{
                    width: 160, height: 160, borderRadius: "50%", objectFit: "cover",
                    objectPosition: imgPosition,
                    border: `4px solid ${COLORS.ivory}`, boxShadow: "0 12px 28px -10px rgba(20,48,43,0.35)",
                    mb: 3,
                }}
            />
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.4rem", color: COLORS.forest, mb: 0.5 }}>
                {name}
            </Typography>
            <Eyebrow sx={{ mb: 2 }}>{role}</Eyebrow>
            <Typography sx={{ fontSize: "1rem", lineHeight: 1.75, color: COLORS.ink, maxWidth: 340, mx: "auto" }}>
                {bio}
            </Typography>
        </Box>
    </motion.div>
);

const Team = ({ isMobile }) => (
    <Section bg={COLORS.ivory}>
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 6 }}>
                <Eyebrow sx={{ justifyContent: "center", display: "flex" }}>Тимот</Eyebrow>
                <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: COLORS.forest }}>
                    Запознајте ги уметниците зад изгледот
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 6 : 4 }}>
                <TeamCard
                    img="/Ivana.png"
                    alt="Ivana Bozinovska"
                    name="Ивана Божиновска"
                    bio="Сопственик на салонот, со многубројни стручни едукации од областа на шминка и козметика и посветеност на перфектниот изглед за секоја жена."
                    imgPosition="center top"
                />
                <TeamCard
                    img="/Sonja.jpg"
                    alt="Sonja Bozinovska"
                    name="Соња Божиновска"
                    bio="Уметничка душа која го претвора маникирот во вистинска уметност, со уникатни дизајни прилагодени на секоја личност."
                />
            </Box>
        </Container>
    </Section>
);

// ---------- About (kept close to your original — it was fine) ----------
const About = ({ isMobile }) => (
    <Section bg="#F3ECE3">
        <Container maxWidth={isMobile ? "sm" : "lg"}>
            <Grid container spacing={4} alignItems="center" justifyContent="center" direction={isMobile ? "column" : "row"}>
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: isMobile ? "center" : "left" }}>
                        <Eyebrow sx={{ justifyContent: isMobile ? "center" : "flex-start", display: "flex" }}>За салонот</Eyebrow>
                        <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: COLORS.forest, mb: 3 }}>
                            Секоја посета, дело на уметност
                        </Typography>
                        <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 2, color: COLORS.ink }}>
                            Нашиот салон е посветен на создавање незаборавни изгледи со врвни услуги во шминка,
                            маникир и апликација на трепки. Со тим од професионалци и страст за убавината, нудиме
                            персонализиран пристап за секој клиент.
                        </Typography>
                        <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, color: COLORS.ink }}>
                            Користиме само најквалитетни производи и најновите техники, за безбедни и долготрајни резултати.
                        </Typography>
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <StyledImage src="/cards.png" alt="Beauty salon interior" />
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    </Section>
);

// ---------- Page ----------
const HomePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const scrollRef = useRef(null);

    // Only this page uses the full-viewport scroll-snap layout, so only
    // suppress the body's own scrollbar while this page is mounted —
    // restore it on unmount so every other route keeps normal scrolling.
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return (
        <>
            <ScrollWrapper ref={scrollRef}>
                <Hero isMobile={isMobile} />
                <About isMobile={isMobile} />
                <Team isMobile={isMobile} />
            </ScrollWrapper>
        </>
    );
};

export default HomePage;