// RoomDetailsModal.js
import React from 'react';
import {Modal, Box, Typography} from "@mui/material";

const RoomDetailsModal = ({ isOpen, onClose, room }) => {

    if(!isOpen || !room) return null;
    return (
        <Modal open={isOpen} onClose={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '500px',
                bgcolor: 'white',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <span className="close" onClick={onClose} style={{position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', fontSize: '1.5em'}}>×</span>
                <Typography variant="h5"  align="center" sx={{mb: 3}}>Détails de la Salle</Typography>
                {room.photo && (
                    <img src={`data:image/jpeg;base64,${room.photo}`} alt={room.roomType} style={{maxWidth: '200px'}}/>
                )}
                <Typography variant="body1" ><strong>Type:</strong> {room.roomType}</Typography>
                <Typography variant="body1"><strong>Prix par heure:</strong> {room.pricePerHour}€</Typography>
            </Box>
        </Modal>
    );
};

export default RoomDetailsModal;