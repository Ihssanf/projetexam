import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("/rooms/all-rooms");
                setRooms(response.data);
            } catch (err) {
                setError(err.message || "Erreur lors du chargement des salles.");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette salle ?")) {
            try {
                await axios.delete(`/rooms/delete/room/${id}`);
                setRooms(rooms.filter((room) => room.id !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression de la salle :", error);
            }
        }
    };
    if (loading) {
        return <p>Chargement des salles...</p>;
    }

    if (error) {
        return <p>Erreur: {error}</p>;
    }

    return (
        <div className="container mt-4">
            <h2>Liste des Salles</h2>
            <Link to="/admin/rooms/add" className="btn btn-primary mb-3">Ajouter une Salle</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Prix par heure</th>
                    <th>Photo</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {rooms.map((room) => (
                    <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.roomType}</td>
                        <td>{room.pricePerHour}</td>
                        <td>
                            {room.photo && (
                                <img
                                    src={`data:image/jpeg;base64,${room.photo}`}
                                    alt="Room"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            )}
                        </td>

                        <td>
                            <Link to={`/admin/rooms/edit/${room.id}`} className="btn btn-sm btn-secondary mr-2">Modifier</Link>
                            <button onClick={()=> handleDelete(room.id)} className="btn btn-sm btn-danger">Supprimer</button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomList;