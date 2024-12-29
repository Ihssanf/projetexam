import React from 'react';

const RoomCard = ({ room, onBook }) => {
    return (
        <div className="room-card">
            {room.photo && <img src={`data:image/jpeg;base64,${room.photo}`} alt={room.roomType} />}
            <h3>{room.roomType}</h3>
            <p>Prix/heure: {room.pricePerHour}€</p>
            <button onClick={() => onBook(room.id)} >Réserver</button>
        </div>
    );
};

export default RoomCard;
