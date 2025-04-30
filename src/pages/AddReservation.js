import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box, Button, TextField, Typography, Grid, Paper, MenuItem,
    Select, InputLabel, FormControl, Chip
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const ServiceEnum = ["MAKEUP", "LASHES", "NAILS", "EYE_BROWS"]; // Enum options

const AddReservation = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        date: null,
        start: null,
        end: null,
        type: [],  // Ensure it's an array for the multi-select
        description: ""
    });

    useEffect(() => {
        if (id) {
            fetchReservation();
        }
    }, [id]);

    const fetchReservation = async () => {
        try {
            const response = await fetch(`https://64.227.123.235:8080/reservation/${id}`, {
                headers: { "Authorization": `${token}` }
            });
            if (!response.ok) throw new Error("Failed to fetch reservation");
            const data = await response.json();

            // Update the formData with the correct field names
            setFormData({
                name: data.name,
                date: data.reservationStart ? dayjs(data.reservationStart) : null,  // Keep as dayjs object
                start: data.reservationStart ? dayjs(data.reservationStart) : null,   // Keep as dayjs object
                end: data.reservationEnd ? dayjs(data.reservationEnd) : null,         // Keep as dayjs object
                type: data.type || [],  // Ensure it's always an array
                description: data.description || ""
            });

            console.log(data); // Log the whole data to verify its structure
        } catch (error) {
            console.error("Error fetching reservation:", error);
        }
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTimeChange = (name, newValue) => {
        setFormData({ ...formData, [name]: newValue });
    };

    const handleDateChange = (newDate) => {
        setFormData({ ...formData, date: newDate });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = id ? "PATCH" : "POST";
            const url = id ? `https://64.227.123.235:8080/reservation/edit` : `https://64.227.123.235:8080/reservation/insert`;

            // Format data before sending
            const formattedData = {
                Id: id || undefined,  // Include the id only if it's an edit
                name: formData.name,
                start: formData.start && formData.date
                    ? dayjs(formData.date).set("hour", formData.start.hour()).set("minute", formData.start.minute()).set("second", 0).format("YYYY-MM-DD[T]HH:mm:ss")
                    : null,
                end: formData.end && formData.date
                    ? dayjs(formData.date).set("hour", formData.end.hour()).set("minute", formData.end.minute()).set("second", 0).format("YYYY-MM-DD[T]HH:mm:ss")
                    : null,
                type: formData.type,
                description: formData.description
            };

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", "Authorization": `${token}` },
                body: JSON.stringify(formattedData)
            });

            console.log(JSON.stringify(formattedData))
            console.log(token)

            if (!response.ok) throw new Error("Failed to save reservation");

            navigate("/reservations");
        } catch (error) {
            console.error("Error saving reservation:", error);
        }
    };

    const handleCancel = () => {
        navigate("/reservations");
    };

    return (
        <Box component={Paper} elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', marginTop: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                {id ? "Edit Reservation" : "Add Reservation"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Name Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Client Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Name"
                            variant="outlined"
                        />
                    </Grid>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* Reservation Date */}
                        <Grid item xs={12}>
                            <DatePicker
                                label="Reservation Date"
                                value={formData.date}
                                onChange={handleDateChange}
                                slotProps={{ textField: { fullWidth: true, required: true } }}
                            />
                        </Grid>

                        {/* Start Time */}
                        <Grid item xs={12}>
                            <TimePicker
                                label="Start Time"
                                value={formData.start}
                                onChange={(newValue) => handleTimeChange("start", newValue)}
                                ampm={false} // 24-hour format
                                minTime={dayjs().set("hour", 4).set("minute", 59)} // Start at 05:00 AM
                                maxTime={dayjs().set("hour", 23).set("minute", 0)} // End at 11:59 PM
                                slotProps={{ textField: { fullWidth: true, required: true } }}
                            />
                        </Grid>

                        {/* End Time */}
                        <Grid item xs={12}>
                            <TimePicker
                                label="End Time"
                                value={formData.end}
                                onChange={(newValue) => handleTimeChange("end", newValue)}
                                ampm={false} // 24-hour format
                                minTime={dayjs().set("hour", 5).set("minute", 0)} // Start at 05:00 AM
                                maxTime={dayjs().set("hour", 23).set("minute", 59)} // End at 11:59 PM
                                slotProps={{ textField: { fullWidth: true, required: true } }}
                            />
                        </Grid>
                    </LocalizationProvider>


                    {/* Service Type Field */}
                    <Grid item xs={12}>
                        <FormControl fullWidth required variant="outlined">
                            <InputLabel>Service Type</InputLabel>
                            <Select
                                multiple
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                label="Type of Service"
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} sx={{ margin: 0.5 }} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {ServiceEnum.map((service) => (
                                    <MenuItem key={service} value={service}>
                                        {service}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Description Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description (optional)"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                    </Grid>

                    {/* Buttons */}
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                type="button"
                                variant="contained"
                                color="error"
                                fullWidth
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                            >
                                {id ? "Update" : "Add"}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddReservation;
