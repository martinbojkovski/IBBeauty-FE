import { useEffect } from 'react';
import { Box, Container, Grid, Typography, Card } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

/*
  Requires @mui/icons-material — if it's not already installed:
  npm install @mui/icons-material

  Uses the same COLORS/Eyebrow/PrimaryButton/SecondaryButton tokens as HomePage.jsx.
  If you've already pulled those into a shared file (e.g. src/theme/tokens.js),
  delete the local copies below and import from there instead — right now
  they're duplicated across files, which will drift out of sync over time.
*/

// ---------- Tokens (keep in sync with HomePage.jsx, or better: share a single file) ----------
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

const ActionButton = ({ href, children, variant = "primary" }) => (
    <Box
        component="a"
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            fontFamily: "'Mulish', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            borderRadius: "999px",
            padding: "11px 24px",
            transition: "opacity 0.2s ease",
            "&:hover": { opacity: 0.85 },
            ...(variant === "primary"
                ? { backgroundColor: COLORS.rose, color: "#fff" }
                : { backgroundColor: "transparent", color: COLORS.forest, border: `1.5px solid ${COLORS.forest}` }),
        }}
    >
        {children}
    </Box>
);

const InfoRow = ({ icon, label, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
        <Box
            sx={{
                width: 44, height: 44, borderRadius: "50%",
                backgroundColor: "rgba(31,68,61,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: COLORS.forest, flexShrink: 0,
            }}
        >
            {icon}
        </Box>
        <Box>
            <Typography sx={{ fontSize: "0.8rem", color: COLORS.gold, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {label}
            </Typography>
            <Typography sx={{ fontSize: "1.05rem", color: COLORS.ink, fontWeight: 500 }}>
                {value}
            </Typography>
        </Box>
    </Box>
);

function Contact() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <Box sx={{ backgroundColor: COLORS.ivory, py: { xs: 4, md: 8 } }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
                    <Eyebrow sx={{ justifyContent: "center", display: "flex" }}>Контакт</Eyebrow>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 600,
                            color: COLORS.forest,
                            fontSize: { xs: "2rem", md: "2.6rem" },
                        }}
                    >
                        Стапете во контакт
                    </Typography>
                </Box>

                <Grid container spacing={5}>
                    {/* ---------- Left: info + map ---------- */}
                    <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
                        <Card
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: "20px",
                                backgroundColor: "#fff",
                                boxShadow: "0 20px 40px -20px rgba(20,48,43,0.2)",
                                mb: 4,
                            }}
                        >
                            <InfoRow
                                icon={<EmailOutlinedIcon />}
                                label="Е-пошта"
                                value="ibozinovskaib@gmail.com"
                            />
                            <InfoRow
                                icon={<PhoneOutlinedIcon />}
                                label="Телефон"
                                value="+389 78 433 360"
                            />
                            <InfoRow
                                icon={<PlaceOutlinedIcon />}
                                label="Адреса"
                                value="Ул. 42, бр. 30, Карпош"
                            />

                            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 3 }}>
                                <ActionButton href="tel:+38978433360" variant="primary">
                                    Јави се
                                </ActionButton>
                            </Box>
                        </Card>

                        <Box
                            sx={{
                                borderRadius: "20px",
                                overflow: "hidden",
                                boxShadow: "0 20px 40px -20px rgba(20,48,43,0.2)",
                                lineHeight: 0,
                                flexGrow: 1,
                                minHeight: 280,
                            }}
                        >
                            <iframe
                                title="Локација на салонот"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d739.3894496658195!2d21.73432446970953!3d42.159748692330005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135451bf98d54cfb%3A0x2f9e935e4097f120!2sul.42%2C%20Kumanovo!5e0!3m2!1sen!2smk!4v1746008017294!5m2!1sen!2smk"
                                width="100%"
                                height="100%"
                                style={{ border: 0, display: "block", width: "100%", height: "100%" }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </Box>
                    </Grid>

                    {/* ---------- Right: Instagram ---------- */}
                    <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                        <Card
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: "20px",
                                backgroundColor: "#fff",
                                boxShadow: "0 20px 40px -20px rgba(20,48,43,0.2)",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            <Eyebrow>Инстаграм</Eyebrow>
                            <Typography
                                variant="h5"
                                sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: COLORS.forest, mb: 3 }}
                            >
                                Следете ja нашата работа
                            </Typography>

                            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                                <blockquote
                                    className="instagram-media"
                                    data-instgrm-permalink="https://www.instagram.com/p/CuwTnMTrhY7/?utm_source=ig_embed&utm_campaign=loading"
                                    data-instgrm-version="14"
                                    style={{
                                        background: '#FFF',
                                        border: 0,
                                        borderRadius: '12px',
                                        boxShadow: 'none',
                                        margin: 0,
                                        width: '100%',
                                    }}
                                >
                                    <div style={{ padding: '16px' }}>
                                        <a
                                            href="https://www.instagram.com/p/CuwTnMTrhY7/?utm_source=ig_embed&utm_campaign=loading"
                                            style={{ background: '#FFFFFF', lineHeight: 0, padding: 0, textAlign: 'center', textDecoration: 'none', width: '100%' }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: 40, marginRight: 14, width: 40 }} />
                                                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: 4, height: 14, marginBottom: 6, width: 100 }} />
                                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: 4, height: 14, width: 60 }} />
                                                </div>
                                            </div>
                                            <div style={{ padding: '19% 0' }} />
                                        </a>
                                    </div>
                                </blockquote>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Contact;