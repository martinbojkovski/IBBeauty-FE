import { Box, Container, Grid, Typography } from '@mui/material';

/*
  Uses the same COLORS/Eyebrow tokens as Contact.jsx and HomePage.jsx.
  If you've already pulled those into a shared file (e.g. src/theme/tokens.js),
  delete the local copies below and import from there instead.
*/

// ---------- Tokens (keep in sync with Contact.jsx / HomePage.jsx) ----------
const COLORS = {
    forest: "#1F443D",
    pine: "#14302B",
    ivory: "#FBF7F2",
    rose: "#B98289",
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

const services = [
    {
        id: "01",
        title: "Шминка",
        description:
            "Есклузивна услуга прилагодена на вашите уникатни потреби и стил. Користиме само најквалитетни производи кои гарантираат долготраен ефект и природен изглед — тука сме да ве направиме убави, самоуверени и спремни за секоја прилика.",
    },
    {
        id: "02",
        title: "Нокти",
        description:
            "Маникир која ги облагородува вашите нокти, создавајќи здрав и негуван изглед. Без разлика дали сакате класичен маникир, модерни дизајни или rubber, користиме најквалитетни материјали и техники за долготраен резултат.",
    },
    {
        id: "03",
        title: "Екстензии на трепки",
        description:
            "Вештачки трепки внимателно прикачени на вашите природни, за ефект на подолги, погусти и поголеми трепки. Изгледаат природно, се изведуваат во различни стилови и должини, и траат од неколку недели — идеални за секој ден и за специјални настани.",
    },
    {
        id: "04",
        title: "Лифтинг и ботокс на трепки",
        description:
            "Професионална услуга која ги подигнува, витка и истакнува вашите природни трепки, за подолг и поотворен изглед на очите. Безболен и брз процес, без потреба од маскара — резултатите се долготрајни и траат до 6 недели.",
    },
    {
        id: "05",
        title: "Лифтинг и ботокс на веѓи",
        description:
            "Неинвазивна процедура која го подигнува и оформува контурот на веѓите, враќајќи им помлад и свеж изглед. Влијае на кератинската структура на влакното, го омекнува и дозволува да се добие најидеалната форма на веѓата.",
    },
    {
        id: "06",
        title: "Депилација",
        description: "Професионална услуга за отстранување на непосакуваните влакна, користејќи најквалитетни материјали и техники за нежно и ефикасно отстранување. Резултатите се долготрајни и кожата останува мазна и негувана.",
    }
];

const ServiceRow = ({ id, title, description, isLast }) => (
    <Box
        sx={{
            display: "flex",
            gap: { xs: 2.5, md: 4 },
            py: { xs: 3.5, md: 4.5 },
            borderBottom: isLast ? "none" : `1px solid rgba(31,68,61,0.12)`,
            transition: "padding-left 0.3s ease",
            "&:hover": {
                pl: { md: 1 },
            },
            "&:hover .service-title": {
                color: COLORS.rose,
            },
        }}
    >
        <Typography
            sx={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                color: COLORS.gold,
                flexShrink: 0,
                width: { xs: 40, md: 60 },
                lineHeight: 1,
            }}
        >
            {id}
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
            <Typography
                className="service-title"
                variant="h5"
                component="h3"
                sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    color: COLORS.forest,
                    mb: 1,
                    fontSize: { xs: "1.35rem", md: "1.6rem" },
                    transition: "color 0.3s ease",
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    fontFamily: "'Mulish', sans-serif",
                    color: COLORS.ink,
                    opacity: 0.85,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    lineHeight: 1.75,
                    maxWidth: 640,
                }}
            >
                {description}
            </Typography>
        </Box>
    </Box>
);

const Services = () => {
    return (
        <Box sx={{ backgroundColor: COLORS.ivory, py: { xs: 4, md: 8 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 8 }}>
                    {/* ---------- Left: sticky heading ---------- */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: { md: "sticky" }, top: { md: 120 } }}>
                            <Eyebrow>Услуги</Eyebrow>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontWeight: 600,
                                    color: COLORS.forest,
                                    fontSize: { xs: "2rem", md: "2.6rem" },
                                    lineHeight: 1.15,
                                    mb: 2,
                                }}
                            >
                                За нашите услуги
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "'Mulish', sans-serif",
                                    color: COLORS.ink,
                                    opacity: 0.75,
                                    fontSize: "1rem",
                                    lineHeight: 1.7,
                                    maxWidth: 380,
                                }}
                            >
                                Шест услуги, изработени со внимание на деталот и најквалитетни
                                материјали, за изглед што трае.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* ---------- Right: service list ---------- */}
                    <Grid item xs={12} md={8}>
                        <Box>
                            {services.map((service, index) => (
                                <ServiceRow
                                    key={service.id}
                                    {...service}
                                    isLast={index === services.length - 1}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;