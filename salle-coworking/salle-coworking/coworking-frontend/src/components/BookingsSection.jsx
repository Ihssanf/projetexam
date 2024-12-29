import React from 'react';
import BookingCard from './BookingCard';

const BookingsSection = ({ bookings, loading }) => {
    return (
        <div id="bookingSection" style={{ display: 'block' }}>
            <h2>Mes Réservations</h2>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div id="bookingsContainer">
                    {bookings.length === 0 ? (
                        <p>Aucune réservation.</p>
                    ) : (
                        bookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default BookingsSection;
