import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    CircularProgress,
    Button,
    Tooltip,
    Snackbar,
    Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./BookingManagement.css"

const BookingManagement = ({}) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const API_BASE_URL = 'http://localhost:9090';

    const fetchBookings = async () => {
        setLoading(true)
        try{
            const response = await axios.get(`${API_BASE_URL}/bookings/all-bookings`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            setBookings(response.data);
            console.log('Bookings fetched:', response.data);

        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError('Error fetching bookings')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings()
    }, []);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleDeleteBooking = async (id) => {
        if (window.confirm('Voulez-vous supprimer cette réservation ?')) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/bookings/delete-booking/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                if (response.status === 200) {
                    setSuccessMessage('Réservation supprimée avec succès!');
                    setOpenSnackbar(true);
                    fetchBookings();
                } else {
                    const errorData = await response.text()
                    setError('Erreur lors de la suppression de la réservation : ' + errorData);
                    console.error('Erreur lors de la suppression de la réservation :', errorData);

                }
            } catch (err) {
                setError('Erreur lors de la suppression de la réservation ');
                console.error('Erreur lors de la suppression de la réservation', err);
            }
        }
    };


    const formatDate = (date) => {
        try {
            const newDate = new Date(date);
            return  newDate.toLocaleDateString()
        }catch (e){
            return "Invalid Date"
        }
    };


    const formatTime = (time) => {
        try {
            if (Array.isArray(time)) {
                const timeStr = `1970-01-01T${String(time[0]).padStart(2, '0')}:${String(time[1]).padStart(2, '0')}`;
                const newTime = new Date(timeStr);
                return newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                return "Invalid Time Format";
            }
        } catch (e) {
            return "Invalid Date";
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 2, textAlign: 'center',
                paddingBottom: 2, borderBottom: '2px solid #f0f0f0' }}>
                Gestion des Réservations
            </Typography>

            {loading ? (
                <Box  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , minHeight: 100}}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box  sx={{padding: 3, textAlign: 'center'}}>
                    <Alert severity="error" sx={{marginBottom: 2}}>
                        {error}
                    </Alert>
                    <Button component={Link} to="/admin"  variant="contained" sx={{ mt: 2, backgroundColor: '#1976d2',
                        "&:hover":{backgroundColor: 'white', color: '#1976d2' , border: '2px solid #1976d2' }}}>Aller au panel admin</Button>
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f8f8f8' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#333', padding: 2, borderBottom: '2px solid #e0e0e0' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#333', padding: 2, borderBottom: '2px solid #e0e0e0' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#333', padding: 2, borderBottom: '2px solid #e0e0e0' }}>Heure Début</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#333', padding: 2, borderBottom: '2px solid #e0e0e0' }}>Heure Fin</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#333', padding: 2, borderBottom: '2px solid #e0e0e0' }}>Nom client</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#333', padding: 2, borderBottom: '2px solid #e0e0e0', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id} hover>
                                    <TableCell sx={{padding: 2}}> {booking.id}</TableCell>
                                    <TableCell sx={{padding: 2}}>{formatDate(booking.date)}</TableCell>
                                    <TableCell sx={{padding: 2}}>{formatTime(booking.heureDebut)}</TableCell>
                                    <TableCell sx={{padding: 2}}>{formatTime(booking.heureFin)}</TableCell>
                                    <TableCell sx={{padding: 2}}>{booking.bookingConfirmationCode}</TableCell>
                                    <TableCell sx={{ padding: 2, textAlign: 'center' }}>
                                        <Tooltip title="Supprimer la réservation">
                                            <IconButton color="error" onClick={() => handleDeleteBooking(booking.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                    component={Link}
                    to="/admin"
                    variant="contained"
                    sx={{ backgroundColor: '#1976d2',
                        color: 'white',
                        '&:hover': { backgroundColor: '#1565c0' }}}
                >
                    Retour au Panel Admin
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default BookingManagement;