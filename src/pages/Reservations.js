import { useState, useEffect, useRef, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Paper,
    Toolbar,
    useMediaQuery,
    TextField
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { ArrowBack, ArrowForward, Today, AddCircle, Edit, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AuthContext } from '../AuthContext';

const localizer = momentLocalizer(moment);

const Reservations = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [monthDate, setMonthDate] = useState(moment());
    const { token, logout } = useContext(AuthContext);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const fetched = useRef(false);

    useEffect(() => {
        if (!fetched.current) {
            fetchReservations();
            fetched.current = true;
        }
    }, []);

    useEffect(() => {
        setCurrentDate(moment(monthDate).toDate());
    }, [monthDate]);

    const fetchReservations = async () => {
        try {
            const response = await fetch("/api/reservation", {
            });
            if (!response.ok) throw new Error("Failed to fetch reservations");

            const data = await response.json();
            setEvents(data
                .sort((a, b) => {
                    if (a.person === b.person) return 0;
                    return a.person === "IVANA" ? -1 : 1;
                })
                .map((res) => ({
                    id: res.id,
                    title: res.person === "IVANA" ? "IVANA" : "SONJA",
                    originalName: res.name,
                    person: res.person,
                    start: new Date(res.reservationStart),
                    end: new Date(res.reservationEnd),
                    type: res.type,
                    description: res.description,
                }))
            );
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    const handleSelectEvent = (event) => {
        if (token) {
            setSelectedEvent(event);
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedEvent(null);
    };

    const handleEditReservation = () => {
        navigate(`/reservations/edit/${selectedEvent.id}`);
    };

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteReservation = async () => {
        try {
            const response = await fetch(`/api/reservation/delete/${selectedEvent.id}`, {
                method: "DELETE",
                headers: { Authorization: `${token}` }
            });
            if (!response.ok) throw new Error("Failed to delete reservation");

            setEvents(events.filter((event) => event.id !== selectedEvent.id));
            handleCloseDeleteDialog();
            handleCloseDialog();
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    const handleAddReservation = () => {
        navigate("/reservations/add");
    };

    const handleNext = () =>
        setCurrentDate(moment(currentDate).add(isMobile ? 1 : 1, isMobile ? "days" : "weeks").toDate());

    const handleBack = () =>
        setCurrentDate(moment(currentDate).subtract(isMobile ? 1 : 1, isMobile ? "days" : "weeks").toDate());

    const handleToday = () => setCurrentDate(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Paper elevation={4} sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: "10px", height: "100vh" }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: isMobile ? "center" : "space-between",
                        alignItems: isMobile ? "flex-start" : "center",
                        flexDirection: isMobile ? "column" : "row",
                        gap: 2,
                        position: "relative",
                    }}
                >
                    {token && (
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddCircle />}
                            onClick={handleAddReservation}
                            fullWidth={isMobile}
                        >
                            Add Reservation
                        </Button>
                    )}

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={isMobile ? 1 : 2}
                        flexDirection={isMobile ? "column" : "row"}
                        width={isMobile ? "100%" : "auto"}
                    >
                        <Typography variant="subtitle1" sx={{ mb: isMobile ? 1 : 0 }}>
                            {isMobile && `Viewing: ${moment(currentDate).format("dddd, MMMM D")}`}
                        </Typography>

                        <Box display="flex" gap={1} width={isMobile ? "100%" : "auto"} justifyContent="center">
                            <Button
                                onClick={handleBack}
                                startIcon={<ArrowBack />}
                                variant="outlined"
                                color="success"
                                fullWidth={isMobile}
                            >
                                {isMobile ? "Previous" : "Back"}
                            </Button>
                            <Button
                                onClick={handleToday}
                                startIcon={<Today />}
                                variant="outlined"
                                color="success"
                                fullWidth={isMobile}
                            >
                                Today
                            </Button>
                            <Button
                                onClick={handleNext}
                                endIcon={<ArrowForward />}
                                variant="outlined"
                                color="success"
                                fullWidth={isMobile}
                            >
                                {isMobile ? "Next" : "Next"}
                            </Button>
                        </Box>

                        {/* Date Picker */}
                        {isMobile ? (
                            <MobileDatePicker
                                views={['year', 'month', 'day']}
                                label="Select Date"
                                minDate={moment().subtract(1, 'year')}
                                maxDate={moment().add(1, 'year')}
                                value={monthDate}
                                onChange={(newValue) => setMonthDate(newValue)}
                                renderInput={(params) => (
                                    <Box sx={{ width: '100%' }}>
                                        <TextField
                                            {...params}
                                            className="date-picker-input"
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    color: '#1f443d',
                                                    fontWeight: '600',
                                                }
                                            }}
                                        />
                                    </Box>
                                )}
                            />
                        ) : (
                            <DesktopDatePicker
                                views={['year', 'month', 'day']}
                                label="Select Date"
                                minDate={moment().subtract(1, 'year')}
                                maxDate={moment().add(1, 'year')}
                                value={monthDate}
                                onChange={(newValue) => setMonthDate(newValue)}
                                renderInput={(params) => (
                                    <Box sx={{ width: 200 }}>
                                        <TextField
                                            {...params}
                                            className="date-picker-input"
                                            sx={{
                                                width: 220,
                                                '& .MuiInputBase-input': {
                                                    color: '#1f443d',
                                                    fontWeight: '600',
                                                }
                                            }}
                                        />
                                    </Box>
                                )}
                            />
                        )}
                    </Box>
                </Toolbar>

                {/* Full screen calendar */}
                <Box sx={{ mt: 3, bgcolor: "#fff", p: 2, borderRadius: "10px", height: "calc(100vh - 150px)" }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        views={["week", "day"]}
                        defaultView={isMobile ? "day" : "week"}
                        date={currentDate}
                        onNavigate={setCurrentDate}
                        onSelectEvent={handleSelectEvent}
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                        toolbar={false}
                        step={15}
                        timeslots={4}
                        dayLayoutAlgorithm="no-overlap"
                        formats={{
                            timeGutterFormat: "HH:mm",
                            dayFormat: "dddd, MMMM Do",
                            eventTimeRangeFormat: () => "",
                        }}
                        min={new Date(0, 0, 0, 5, 0, 0)} // Start at 5:00 AM
                        max={new Date(0, 0, 0, 23, 59, 0)} // End at 11:00 PM
                        eventPropGetter={(event) => {
                            let backgroundColor = "#1f443d";
                            if (event.person === "SONJA") {
                                backgroundColor = "#58855C";
                            }
                            return {
                                style: {
                                    backgroundColor: backgroundColor,
                                    color: "white",
                                    borderRadius: "8px",
                                    border: "none",
                                    padding: "2px 4px",
                                    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                                    marginBottom: "4px",
                                },
                            };
                        }}
                    />
                </Box>

                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ bgcolor: "#004000", color: "white", textAlign: "center" }}>
                        Reservation Details
                    </DialogTitle>
                    <DialogContent sx={{ p: 3, bgcolor: "#f0f0f0" }}>
                        <Typography variant="h6">
                            <strong>Name:</strong> {selectedEvent?.originalName || "Reserved"}
                        </Typography>
                        <Typography variant="h6">
                            <strong>Working:</strong> {selectedEvent?.person || "Reserved"}
                        </Typography>
                        <Typography variant="h6">
                            <strong>Start:</strong> {moment(selectedEvent?.start).format("HH:mm")}
                        </Typography>
                        <Typography variant="h6">
                            <strong>End:</strong> {moment(selectedEvent?.end).format("HH:mm")}
                        </Typography>
                        <Typography variant="h6">
                            <strong>Services:</strong> {selectedEvent?.type?.join(", ") || "N/A"}
                        </Typography>
                        <Typography variant="h6">
                            <strong>Description:</strong> {selectedEvent?.description || "No description provided"}
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ bgcolor: "#e3e3e3", p: 2 }}>
                        <Button onClick={handleCloseDialog} color="primary" variant="outlined">
                            Close
                        </Button>
                        {token && (
                            <>
                                <Button
                                    onClick={handleEditReservation}
                                    startIcon={<Edit />}
                                    color="warning"
                                    variant="outlined"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={handleOpenDeleteDialog}
                                    startIcon={<Delete />}
                                    color="error"
                                    variant="outlined"
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ textAlign: "center" }}>
                        Are you sure you want to delete this reservation?
                    </DialogTitle>
                    <DialogActions sx={{ bgcolor: "#e3e3e3", p: 2 }}>
                        <Button onClick={handleCloseDeleteDialog} color="primary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteReservation} color="error" variant="outlined">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </LocalizationProvider>
    );
};

export default Reservations;