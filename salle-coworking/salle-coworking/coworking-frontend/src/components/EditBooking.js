import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBooking = () => {
    const { id } = useParams();  // Get the booking ID from the URL
    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        roomType: '',
        date: '',
        startTime: '',
        endTime: '',
    });

    // Fetch the current booking details when the component is mounted
    useEffect(() => {
        fetchBookingDetails(id);
    }, [id]);

    const fetchBookingDetails = async (bookingId) => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            const response = await fetch(`http://localhost:9090/bookings/booking/${bookingId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBooking(data);
            } else {
                console.error('Failed to fetch booking details');
                alert('Error: Failed to fetch booking details.');
            }
        } catch (error) {
            console.error('Error fetching booking details:', error);
            alert('Error fetching booking details. Please try again.');
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            const response = await fetch(`http://localhost:9090/bookings/booking/${id}`, {
                method: 'PUT',  // Assuming PUT for updating the booking
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(booking), // Send the updated booking data
            });

            if (response.ok) {
                alert('Booking updated successfully');
                navigate('/bookings');  // Navigate back to bookings page after success
            } else {
                const errorMessage = await response.text();
                console.error('Failed to update booking:', errorMessage);
                alert('Error: Failed to update booking.');
            }
        } catch (error) {
            console.error('Error updating booking:', error);
            alert('Error updating booking. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    return (
        <div className="container mt-4">
            <h2>Edit Booking</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Room Type</label>
                    <input
                        type="text"
                        name="roomType"
                        value={booking.roomType}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={booking.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Start Time</label>
                    <input
                        type="time"
                        name="startTime"
                        value={booking.startTime}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>End Time</label>
                    <input
                        type="time"
                        name="endTime"
                        value={booking.endTime}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn btn-primary mt-3" onClick={handleSave}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditBooking;
