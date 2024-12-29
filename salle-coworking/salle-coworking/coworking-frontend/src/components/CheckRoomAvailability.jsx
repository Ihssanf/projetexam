import React, { useState } from "react";
import axios from "axios";

function CheckRoomAvailability() {
    const [roomId, setRoomId] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [availability, setAvailability] = useState(null);

    const checkAvailability = async () => {
        try {
            const response = await axios.get("/rooms/check-availability", {
                params: {
                    id: roomId,
                    date: date,
                    heureDebut: startTime,
                    heureFin: endTime,
                },
            });

            setAvailability(response.data);
        } catch (error) {
            console.error("Erreur lors de la vérification de la disponibilité :", error);
        }
    };

    return (
        <div>
            <h3>Vérifier la disponibilité d'une salle</h3>
            <div>
                <label>Salle (ID) :</label>
                <input type="number" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            </div>
            <div>
                <label>Date :</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
                <label>Heure Début :</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div>
                <label>Heure Fin :</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
            <button onClick={checkAvailability}>Vérifier</button>
            {availability !== null && (
                <div>
                    {availability ? (
                        <p style={{ color: "green" }}>La salle est disponible.</p>
                    ) : (
                        <p style={{ color: "red" }}>La salle n'est pas disponible.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default CheckRoomAvailability;
