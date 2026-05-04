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
import { CircularProgress } from "@mui/material";
import { readCache, writeCache } from "../utils/Cache";


// ─── Module-level constants & setup ──────────────────────────────────────────
// Moved outside component so it never re-runs on render
const localizer = momentLocalizer(moment);

moment.updateLocale("en", {
    week: { dow: 1, doy: 1 },
});

const SLOT_MINUTES = 90;
const START_HOUR = 8;
const END_HOUR = 20;
const PEOPLE = ["IVANA", "SONJA"];

// Stable calendar min/max — created once, not on every render
const CAL_MIN = new Date(0, 0, 0, 5, 0, 0);
const CAL_MAX = new Date(0, 0, 0, 23, 59, 0);

// ─── Free-slot generator ─────────────────────────────────────────────────────
// Pure function outside the component — not recreated on every render.
// Only depends on `events`, not on `token`.
const generateFreeSlots = (events) => {
    const FREE_SLOT_START = moment().startOf("day");
    const FREE_SLOT_END = moment().add(1, "month").endOf("day");

    const allSlots = [];

    // Build a per-person busy-intervals lookup once
    const busyByPerson = {};
    PEOPLE.forEach((person) => {
        busyByPerson[person] = events
            .filter((e) => e.person === person)
            .map((e) => ({
                start: moment(e.start),
                end: moment(e.end),
            }));
    });

    let dayCursor = FREE_SLOT_START.clone();

    while (dayCursor.isSameOrBefore(FREE_SLOT_END, "day")) {
        PEOPLE.forEach((person) => {
            const busy = busyByPerson[person];
            let timeCursor = dayCursor.clone().hour(START_HOUR).minute(0);
            const dayEnd = dayCursor.clone().hour(END_HOUR).minute(0);

            while (timeCursor.isBefore(dayEnd)) {
                const slotStart = timeCursor.clone();
                const slotEnd = timeCursor.clone().add(SLOT_MINUTES, "minutes");

                if (slotEnd.isSameOrBefore(dayEnd)) {
                    const overlaps = busy.some(
                        (b) => slotStart.isBefore(b.end) && slotEnd.isAfter(b.start)
                    );

                    if (!overlaps) {
                        const timeLabel = `${slotStart.format("HH:mm")} - ${slotEnd.format("HH:mm")}`;
                        allSlots.push({
                            id: `free-${person}-${slotStart.toISOString()}`,
                            // Title is token-neutral — label swap happens in calendarEvents memo
                            timeLabel,
                            start: slotStart.toDate(),
                            end: slotEnd.toDate(),
                            person,
                            isFree: true,
                        });
                    }
                }

                timeCursor.add(SLOT_MINUTES, "minutes");
            }
        });

        dayCursor.add(1, "day");
    }

    return allSlots;
};

// ─── Static event style maps ─────────────────────────────────────────────────
// Defined once, referenced by object key — no new objects on every render
const BASE_STYLE = {
    color: "white",
    borderRadius: "8px",
    border: "1px solid white",
    padding: "2px 4px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
    marginBottom: "4px",
    whiteSpace: "pre-line",
};

const EVENT_STYLES = {
    ivanaFree:  { ...BASE_STYLE, backgroundColor: "#1f443d" },
    sonjaFree:  { ...BASE_STYLE, backgroundColor: "#58855C" },
    taken:      { ...BASE_STYLE, backgroundColor: "#d32f2f" },
};

// ─── EventCell renderer (stable reference) ───────────────────────────────────
const EventCell = ({ event }) => {
    if (event.isAddSlot) {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <AddCircleIcon style={{ fontSize: 24, color: "white" }} />
                <span style={{ fontSize: 12 }}>{event.timeLabel}</span>
            </div>
        );
    }
    return <span>{event.title}</span>;
};

// ─── Component ───────────────────────────────────────────────────────────────
const Reservations = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [monthDate, setMonthDate] = useState(moment());
    const { token, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const fetched = useRef(false);

    // ── Sync currentDate when monthDate picker changes
    useEffect(() => {
        setCurrentDate(moment(monthDate).toDate());
    }, [monthDate]);

    // ── Fetch once on mount
    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;
        fetchReservations();
    }, []);

    const mapReservations = (data) => {
        return [...data] // ✅ clone first
            .sort((a, b) => {
                if (a.person === b.person) return 0;
                return a.person === "IVANA" ? -1 : 1;
            })
            .map((res) => {
                const start = moment(res.reservationStart).local().toDate();
                const end = moment(res.reservationEnd).local().toDate();

                return {
                    id: res.id,
                    originalName: res.name,
                    person: res.person,
                    start,
                    end,
                    type: res.type,
                    description: res.description,
                    timeLabel: `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
                };
            });
    };

    const fetchReservations = async () => {
        // 1. Try cache
        const cached = readCache();
        if (cached) {
            setEvents(mapReservations(cached)); // ✅ reuse
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/reservation", {
            });
            if (!response.ok) throw new Error("Failed to fetch reservations");

            const data = await response.json();

            // 2. Save RAW data
            writeCache(data);

            // 3. Map once
            setEvents(mapReservations(data));

        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setLoading(false);
        }
    };

    // ── Expensive: only when events change (no token dependency)
    const freeSlots = useMemo(() => generateFreeSlots(events), [events]);

    // ── Cheap: title/label swap only — re-runs only on token or slot/event changes
    const calendarEvents = useMemo(() => {
        const displayEvents = events.map((event) => ({
            ...event,
            title: token
                ? `${event.originalName}\n${event.timeLabel}`
                : `RESERVED\n${event.timeLabel}`,
        }));

        const displaySlots = freeSlots.map((slot) => ({
            ...slot,
            title: token ? `ADD\n${slot.timeLabel}` : `FREE\n${slot.timeLabel}`,
            isAddSlot: !!token,
        }));

        return [...displayEvents, ...displaySlots];
    }, [events, freeSlots, token]);

    // ── Navigation handlers
    const handleNext = () => {
        const next = moment(currentDate).add(1, isMobile ? "days" : "weeks");
        setCurrentDate(next.toDate());
        setMonthDate(next);
    };

    const handleBack = () => {
        const prev = moment(currentDate).subtract(1, isMobile ? "days" : "weeks");
        setCurrentDate(prev.toDate());
        setMonthDate(prev);
    };

    const handleToday = () => {
        const today = moment();
        setCurrentDate(today.toDate());
        setMonthDate(today);
    };

    // ── Event interaction
    const handleSelectEvent = (event) => {
        if (event.isFree) {
            if (!token) return;
            navigate("/reservations/add", {
                state: { start: event.start, end: event.end, person: event.person },
            });
            return;
        }
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

    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

    const handleDeleteReservation = async () => {
        try {
            const response = await fetch(`/api/reservation/delete/${selectedEvent.id}`, {
                method: "DELETE",
                headers: { Authorization: `${token}` },
            });
            if (!response.ok) throw new Error("Failed to delete reservation");

            const cached = readCache();
            const updated = cached.filter(r => r.id !== selectedEvent.id);
            writeCache(updated);

            setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
            handleCloseDeleteDialog();
            handleCloseDialog();
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    const handleAddReservation = () => navigate("/reservations/add");

    // ── Stable eventPropGetter — returns pre-built style objects
    const eventPropGetter = (event) => {
        let className = event.person === "SONJA" ? "event-sonja" : "event-ivana";

        if (event.isFree) {
            return {
                className,
                style: event.person === "SONJA"
                    ? EVENT_STYLES.sonjaFree
                    : EVENT_STYLES.ivanaFree,
            };
        }

        return {
            className,
            style: EVENT_STYLES.taken,
        };
    };

    // ── Stable components map — object identity won't change between renders
    const calendarComponents = useMemo(() => ({ event: EventCell }), []);

    // ── Stable formats object
    const calendarFormats = useMemo(() => ({
        timeGutterFormat: "HH:mm",
        dayFormat: "dddd, MMMM Do",
        eventTimeRangeFormat: () => "",
    }), []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                    gap: 2
                }}
            >
                <CircularProgress sx={{ color: "success.main" }} />
                <Typography sx={{ color: "success.main", fontWeight: 500 }}>
                    Loading...
                </Typography>
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Paper elevation={4} sx={{ p: 2, bgcolor: "white", borderRadius: "10px", height: "auto" }}>
                {/* ── Toolbar ── */}
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
                        {isMobile && (
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Viewing: {moment(currentDate).format("dddd, MMMM D")}
                            </Typography>
                        )}

                        <Box display="flex" gap={1} width={isMobile ? "100%" : "auto"} justifyContent="center">
                            <Button onClick={handleBack} startIcon={<ArrowBack />} variant="outlined" color="success" fullWidth={isMobile}>
                                Prev
                            </Button>
                            <Button onClick={handleToday} startIcon={<Today />} variant="outlined" color="success" fullWidth={isMobile}>
                                Today
                            </Button>
                            <Button onClick={handleNext} endIcon={<ArrowForward />} variant="outlined" color="success" fullWidth={isMobile}>
                                Next
                            </Button>
                        </Box>

                        {isMobile ? (
                            <MobileDatePicker
                                views={["year", "month", "day"]}
                                label="Select Date"
                                minDate={moment().subtract(1, "year")}
                                maxDate={moment().add(1, "year")}
                                value={monthDate}
                                onChange={setMonthDate}
                                renderInput={(params) => (
                                    <Box sx={{ width: "100%" }}>
                                        <TextField
                                            {...params}
                                            fullWidth
                                            sx={{ "& .MuiInputBase-input": { color: "#1f443d", fontWeight: "600" } }}
                                        />
                                    </Box>
                                )}
                            />
                        ) : (
                            <DesktopDatePicker
                                views={["year", "month", "day"]}
                                label="Select Date"
                                minDate={moment().subtract(1, "year")}
                                maxDate={moment().add(1, "year")}
                                value={monthDate}
                                onChange={setMonthDate}
                                renderInput={(params) => (
                                    <Box sx={{ width: 200 }}>
                                        <TextField
                                            {...params}
                                            sx={{ width: 220, "& .MuiInputBase-input": { color: "#1f443d", fontWeight: "600" } }}
                                        />
                                    </Box>
                                )}
                            />
                        )}
                    </Box>
                </Toolbar>

                {/* ── Legend ── */}
                <Toolbar>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                            justifyContent: isMobile ? "center" : "flex-start",
                            pl: isMobile ? 0 : "25px",
                            width: "100%",
                        }}
                    >
                        {[
                            { color: "#1f443d", label: "IVANA" },
                            { color: "#58855C", label: "SONJA" },
                        ].map(({ color, label }) => (
                            <Box key={label} display="flex" alignItems="center" gap="6px">
                                <Box sx={{ width: 24, height: 24, backgroundColor: color, border: "1px solid black" }} />
                                <span style={{ fontWeight: "bold" }}>{label}</span>
                            </Box>
                        ))}
                    </Box>
                </Toolbar>

                {/* ── Calendar ── */}
                <Box sx={{ mt: 3, bgcolor: "#fff", p: 2, borderRadius: "10px", overflow: "hidden" }}>
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
                        components={calendarComponents}
                        eventPropGetter={eventPropGetter}
                        formats={calendarFormats}
                        style={{ height: "100%", width: "100%" }}
                        toolbar={false}
                        step={15}
                        timeslots={4}
                        dayLayoutAlgorithm="no-overlap"
                        min={CAL_MIN}
                        max={CAL_MAX}
                    />
                </Box>

                {/* ── Details Dialog ── */}
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ bgcolor: "#004000", color: "white", textAlign: "center" }}>
                        Reservation Details
                    </DialogTitle>
                    <DialogContent sx={{ p: 3, bgcolor: "#f0f0f0" }}>
                        {[
                            ["Name", selectedEvent?.originalName ?? "Reserved"],
                            ["Working", selectedEvent?.person ?? "Reserved"],
                            ["Date", moment(selectedEvent?.start).format("MMMM D YYYY")],
                            ["Start", moment(selectedEvent?.start).format("HH:mm")],
                            ["End", moment(selectedEvent?.end).format("HH:mm")],
                            ["Services", selectedEvent?.type?.join(", ") ?? "N/A"],
                            ["Description", selectedEvent?.description ?? "No description provided"],
                        ].map(([label, value]) => (
                            <Typography key={label} variant="h6">
                                <strong>{label}:</strong> {value}
                            </Typography>
                        ))}
                    </DialogContent>
                    <DialogActions sx={{ bgcolor: "#e3e3e3", p: 2 }}>
                        <Button onClick={handleCloseDialog} color="primary" variant="outlined">
                            Close
                        </Button>
                        {token && (
                            <>
                                <Button onClick={handleEditReservation} startIcon={<Edit />} color="warning" variant="outlined">
                                    Edit
                                </Button>
                                <Button onClick={handleOpenDeleteDialog} startIcon={<Delete />} color="error" variant="outlined">
                                    Delete
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>

                {/* ── Delete Confirm Dialog ── */}
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