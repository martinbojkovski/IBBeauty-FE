import { useState, useEffect, useRef, useContext, useMemo } from "react";
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
import { ArrowBack, ArrowForward, Today, AddCircle, Edit, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AuthContext } from '../AuthContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

    moment.updateLocale("en", {
        week: {
            dow: new Date().getDay(),
            doy: 1,
        },
    });

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
                    title: `RESERVED\n${moment(res.reservationStart).format("HH:mm")} - ${moment(res.reservationEnd).format("HH:mm")}`,
                    originalName: res.name,
                    person: res.person,
                    start: moment(res.reservationStart).local().toDate(),
                    end: moment(res.reservationEnd).local().toDate(),
                    type: res.type,
                    description: res.description,
                }))
            );
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    const handleSelectEvent = (event) => {

        // 1️⃣ FREE SLOT → ADD NEW (only if logged in)
        if (event.isFree) {
            if (!token) return;

            navigate("/reservations/add", {
                state: {
                    start: event.start,
                    end: event.end,
                    person: event.person,
                },
            });
            return; // ⬅️ CRITICAL: stop here
        }

        // 2️⃣ TAKEN APPOINTMENT → EDIT (only if logged in)
        if (!token) return;

        setSelectedEvent(event);
        setOpenDialog(true);
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

    const handleNext = () => {
        const nextDate = moment(currentDate).add(isMobile ? 1 : 1, isMobile ? "days" : "weeks");
        setCurrentDate(nextDate.toDate());
        setMonthDate(nextDate); // Sync with DatePicker
    };

    const handleBack = () => {
        const prevDate = moment(currentDate).subtract(isMobile ? 1 : 1, isMobile ? "days" : "weeks");
        setCurrentDate(prevDate.toDate());
        setMonthDate(prevDate); // Sync with DatePicker
    };

    const handleToday = () => {
        const today = moment();
        setCurrentDate(today.toDate());
        setMonthDate(today); // Sync with DatePicker
    };

    const generateFreeSlots = (events, slotMinutes = 90) => {
        const FREE_SLOT_START = moment().subtract(0, "days").startOf("day"); // 14 days ago
        const FREE_SLOT_END = moment().add(1, "month").endOf("day");
        const people = ["IVANA", "SONJA"];
        const startHour = 8;
        const endHour = 20;

        const allSlots = [];

        let dayCursor = FREE_SLOT_START.clone();

        while (dayCursor.isSameOrBefore(FREE_SLOT_END, "day")) {
            const dayStart = dayCursor.clone().hour(startHour).minute(0);
            const dayEnd = dayCursor.clone().hour(endHour).minute(0);

            people.forEach(person => {
                // Get busy slots for this person
                const busy = events
                    .filter(e => e.person === person && !e.isFree)
                    .map(e => ({
                        start: moment(e.start),
                        end: moment(e.end),
                    }));

                let timeCursor = dayStart.clone();

                while (timeCursor.isBefore(dayEnd)) {
                    const slotStart = timeCursor.clone();
                    const slotEnd = timeCursor.clone().add(slotMinutes, "minutes");

                    const overlaps = busy.some(b =>
                        slotStart.isBefore(b.end) && slotEnd.isAfter(b.start)
                    );

                    if (!overlaps && slotEnd.isSameOrBefore(dayEnd)) {
                        const slotTitle = token
                            ? `ADD\n${slotStart.format("HH:mm")} - ${slotEnd.format("HH:mm")}`
                            : `FREE\n${slotStart.format("HH:mm")} - ${slotEnd.format("HH:mm")}`;

                        allSlots.push({
                            id: `free-${person}-${slotStart.toISOString()}`,
                            title: slotTitle,
                            start: slotStart.toDate(),
                            end: slotEnd.toDate(),
                            person,
                            isFree: true,
                            isAddSlot: token ? true : false
                        });
                    }

                    timeCursor.add(slotMinutes, "minutes");
                }
            });

            dayCursor.add(1, "day");
        }

       return allSlots;
    };

    const calendarEvents = useMemo(() => {
        const freeSlots = generateFreeSlots(events, 90);

        const displayEvents = events.map((event) => ({
            ...event,
            title: token
                ? `${event.originalName}\n${moment(event.start).format("HH:mm")} - ${moment(event.end).format("HH:mm")}`
                : `RESERVED\n${moment(event.start).format("HH:mm")} - ${moment(event.end).format("HH:mm")}`,
        }));

        return [...displayEvents, ...freeSlots];
    }, [events, token]);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Paper elevation={4} sx={{ p: 2, bgcolor: "white", borderRadius: "10px", height: "auto" }}>
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
                                {isMobile ? "Prev" : "Prev"}
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
                <Toolbar>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "16px",
                            justifyContent: isMobile ? "center" : "flex-start",
                            paddingLeft: isMobile ? 0 : "25px",
                            width: "100%",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div
                                style={{
                                    width: 24,
                                    height: 24,
                                    backgroundColor: "#1f443d",
                                    border: "1px solid black",
                                }}
                            />
                            <span style={{ fontWeight: "bold" }}>IVANA</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div
                                style={{
                                    width: 24,
                                    height: 24,
                                    backgroundColor: "#58855C",
                                    border: "1px solid black",
                                }}
                            />
                            <span style={{ fontWeight: "bold" }}>SONJA</span>
                        </div>
                    </div>
                </Toolbar>


                {/* Full screen calendar */}
                <Box
                    sx={{
                        mt: 3,
                        bgcolor: "#fff",
                        p: 2,
                        borderRadius: "10px",
                        overflow: "hidden", // 👈 important
                    }}
                >
                    <Calendar
                        localizer={localizer}
                        events={calendarEvents}
                        startAccessor="start"
                        endAccessor="end"
                        views={["week", "day"]}
                        defaultView={isMobile ? "day" : "week"}
                        date={currentDate}
                        onNavigate={setCurrentDate}
                        onSelectEvent={handleSelectEvent}
                        components={{
                            event: ({ event }) => {
                                // If it's a free slot with + icon
                                if (event.isAddSlot) {
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <AddCircleIcon style={{ fontSize: 24, color: 'white' }} />
                                            <span style={{ fontSize: 12 }}>{event.title.split("\n")[1]}</span>
                                        </div>
                                    );
                                }

                                // Default event rendering
                                return <span>{event.title}</span>;
                            },
                        }}
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
                            let className = "event-ivana";

                            if (event.person === "SONJA") {
                                backgroundColor = "#58855C";
                                className = "event-sonja";
                            }

                            // FREE SLOTS
                            if (event.isFree) {

                                // NOT LOGGED IN
                                if (!token) {
                                    return {
                                        className,
                                        style: {
                                            backgroundColor,
                                            color: "white",
                                            borderRadius: "8px",
                                            border: "none",
                                            padding: "2px 4px",
                                            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                                            marginBottom: "4px",
                                            whiteSpace: "pre-line"  // add this
                                        },
                                    };
                                }
                                // LOGGED IN
                                return {
                                    className,
                                    style: {
                                        backgroundColor,
                                        color: "white",
                                        borderRadius: "8px",
                                        border: "none",
                                        padding: "2px 4px",
                                        boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                                        marginBottom: "4px",
                                        whiteSpace: "pre-line"  // add this
                                    },
                                };
                            }else {
                                // TAKEN → RED
                                return {
                                    className,
                                    style: {
                                        backgroundColor: "#d32f2f",
                                        color: "white",
                                        borderRadius: "8px",
                                        border: "none",
                                        padding: "2px 4px",
                                        boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                                        marginBottom: "4px",
                                        whiteSpace: "pre-line"  // add this

                                    },
                                };
                            }
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
                            <strong>Date:</strong> {moment(selectedEvent?.start).format("MMMM D YYYY")}
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