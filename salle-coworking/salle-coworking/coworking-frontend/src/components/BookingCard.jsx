import React from 'react';

const BookingCard = ({ booking }) => {
    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString(); // Formats the date in a readable format
    };

    const formatTime = (time) => {
        const newTime = new Date(time);
        return newTime.toLocaleTimeString(); // Formats the time in a readable format
    };

    return (
        <div className="booking-card">
            <p><strong>Code de Confirmation:</strong> {booking.bookingConfirmationCode || 'N/A'}</p>
            <p><strong>Date:</strong> {formatDate(booking.date)}</p>
            <p><strong>Heure Début:</strong> {formatTime(booking.heureDebut)}</p>
            <p><strong>Heure Fin:</strong> {formatTime(booking.heureFin)}</p>
            <p><strong>Client:</strong> {booking.clientFullName}</p>
        </div>
    );
};

export default BookingCard;
