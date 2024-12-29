import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import axios from 'axios';

const RoomsSection = ({ onBook }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch rooms data from API
        axios.get('http://localhost:9090/rooms/all-rooms')
            .then(response => {
                console.log("Rooms Data:", response.data); // Log the response data
                setRooms(response.data); // Update state with the rooms data
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the rooms!', error);
                setLoading(false);
            });
    }, []);

    return (
        <div id="roomsSection" style={{ display: 'block' }}>
            <h2>Salles Disponibles</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div id="roomsContainer">
                    {rooms.length === 0 ? (
                        <p>No rooms available</p>
                    ) : (
                        rooms.map(room => (
                            <RoomCard key={room.id} room={room} onBook={onBook} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default RoomsSection;
