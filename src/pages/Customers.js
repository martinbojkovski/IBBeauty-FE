import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Box, Container, Typography, TextField, InputAdornment,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Chip, CircularProgress, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const serviceColors = {
    MAKEUP: '#e91e63',
    LASHES: '#9c27b0',
    NAILS: '#ff6f61',
    EYE_BROWS: '#2f12e8',
};

function formatDate(dateTimeStr) {
    if (!dateTimeStr) return '—';

    return new Date(dateTimeStr).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function formatTime(dateTimeStr) {
    if (!dateTimeStr) return '—';

    return new Date(dateTimeStr).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

function Customers({token}) {
    const [query, setQuery] = useState('');
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const timeout = setTimeout(async () => {

            if (!query.trim()) {
                setReservations([]);
                setSearched(false);
                setError(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/reservation/search?name=${encodeURIComponent(query.trim())}`,
                    {
                        headers: {
                            Authorization: `${token}`
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Invalid response');
                }

                const sorted = [...data].sort(
                    (b, a) =>
                        new Date(a.reservationStart) -
                        new Date(b.reservationStart)
                );

                setReservations(sorted);
                setSearched(true);

            } catch (err) {
                setError('Failed to fetch reservations.');
                setReservations([]);
            } finally {
                setLoading(false);
            }

        }, 500);

        return () => clearTimeout(timeout);

    }, [query, token]);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f0', py: 6 }}>
            <Container maxWidth="lg">

                {/* Header */}
                <Box sx={{ mb: 5 }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, color: '#1f443d', letterSpacing: '-0.5px' }}
                    >
                        Customers
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666', mt: 0.5 }}>
                        Search reservations by customer name
                    </Typography>
                </Box>

                {/* Search Bar */}
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by name..."
                    value={query}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#1f443d' }} />
                            </InputAdornment>
                        ),
                        endAdornment: loading && (
                            <InputAdornment position="end">
                                <CircularProgress size={20} sx={{ color: '#1f443d' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        mb: 4,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': { borderColor: '#1f443d' },
                            '&.Mui-focused fieldset': { borderColor: '#1f443d' },
                        },
                    }}
                />

                {/* Error */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
                )}

                {/* Table */}
                {searched && !loading && (
                    reservations.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8, color: '#999' }}>
                            <CalendarTodayIcon sx={{ fontSize: 48, mb: 2, opacity: 0.4 }} />
                            <Typography variant="h6">No reservations found</Typography>
                            <Typography variant="body2">Try a different name</Typography>
                        </Box>
                    ) : (
                        <TableContainer
                            component={Paper}
                            elevation={0}
                            sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#1f443d' }}>
                                        {['Name', 'Person', 'Date', 'Start', 'End', 'Services', 'Description'].map((col) => (
                                            <TableCell
                                                key={col}
                                                sx={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}
                                            >
                                                {col}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservations.map((res, index) => (
                                        <TableRow
                                            key={res.id || index}
                                            sx={{
                                                '&:nth-of-type(even)': { backgroundColor: '#fafafa' },
                                                '&:hover': { backgroundColor: '#f0f7f5' },
                                                transition: 'background-color 0.15s',
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: 600, color: '#1f443d' }}>
                                                {res.name}
                                            </TableCell>
                                            <TableCell>{res.person}</TableCell>
                                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                {formatDate(res.reservationStart)}
                                            </TableCell>

                                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                {formatTime(res.reservationStart)}
                                            </TableCell>

                                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                {formatTime(res.reservationEnd)}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                    {(res.type || []).map((service) => (
                                                        <Chip
                                                            key={service}
                                                            label={service}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: serviceColors[service] || serviceColors.DEFAULT,
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                fontSize: '0.7rem',
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ color: '#555', maxWidth: 200 }}>
                                                {res.description || '—'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                )}
            </Container>
        </Box>
    );
}

export default Customers;