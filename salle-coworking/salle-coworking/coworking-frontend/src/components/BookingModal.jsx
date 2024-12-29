import React, { useState } from 'react';
import RoomDetailsModal from "./RoomDetailsModal";

const BookingModal = ({ isOpen, onClose, rooms, onBookSuccess }) => {
    const [clientFullName, setClientFullName] = useState('');
    const [date, setDate] = useState('');
    const [heureDebut, setHeureDebut] = useState('');
    const [heureFin, setHeureFin] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('on-site');
    const [rib, setRib] = useState('');
    const [error, setError] = useState('');
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);  // Receipt modal state
    const [receiptContent, setReceiptContent] = useState('');  // Content of the receipt
    const [paymentProcessed, setPaymentProcessed] = useState(false);  // State to track if payment has been processed

    const API_BASE_URL = 'http://localhost:9090';

    const handleOpenDetailsModal = (room) => {
        setSelectedRoomDetails(room);
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setSelectedRoomDetails(null);
        setIsDetailsModalOpen(false);
    };

    const handlePayment = () => {
        if (paymentMethod === 'online' && !rib) {
            setError('Veuillez entrer votre RIB.');
            return;
        }

        // Simulate payment success
        setTimeout(() => {
            alert(paymentMethod === 'online' ? 'Paiement en ligne réussi avec le RIB!' : 'Paiement sur place réussi!');
            generateReceipt();  // Immediately generate receipt after payment
            setPaymentProcessed(true);  // Mark payment as processed
            onBookSuccess();
            onClose();
        }, 1000); // Simulate network delay for payment
    };

    const generateReceipt = () => {
        const receipt = `
            Réservation confirmée:
            Nom: ${clientFullName}
            Date: ${date}
            Heure: ${heureDebut} - ${heureFin}
            Salle: ${rooms.find(room => room.id === Number(selectedRoom))?.roomType}
            Méthode de paiement: ${paymentMethod === 'online' ? 'Paiement en ligne (avec RIB)' : 'Paiement sur place'}
        `;
        setReceiptContent(receipt); // Set the receipt content
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!clientFullName || !date || !heureDebut || !heureFin || !selectedRoom) {
            setError('Tous les champs sont obligatoires.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/bookings/room/${selectedRoom}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({
                    clientFullName,
                    date,
                    heureDebut,
                    heureFin
                })
            });

            if (response.ok) {
                alert('Réservation réussie!');
                generateReceipt();  // Generate receipt after successful booking
                // Now show the button to view the receipt
            } else {
                const errorData = await response.text();
                setError(errorData || 'Erreur inconnue lors de la réservation.');
            }
        } catch (err) {
            setError('Une erreur est survenue lors de la réservation');
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'clientFullName':
                setClientFullName(value);
                break;
            case 'bookingDate':
                setDate(value);
                break;
            case 'bookingStartTime':
                setHeureDebut(value);
                break;
            case 'bookingEndTime':
                setHeureFin(value);
                break;
            case 'selectRoom':
                setSelectedRoom(value);
                break;
            case 'paymentMethod':
                setPaymentMethod(value);
                break;
            case 'rib':
                setRib(value);
                break;
            default:
                break;
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head><title>Reçu de Réservation</title></head>
                <body>
                    <pre>${receiptContent}</pre>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    if (!isOpen) return null;

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>×</span>
                <h2>Réserver une salle</h2>
                {error && <div className="error">{error}</div>}

                {/* Consulter mon reçu Button */}
                {receiptContent && !paymentProcessed && (
                    <button onClick={() => setIsReceiptModalOpen(true)}>Consulter mon reçu</button>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="selectRoom">Salle:</label>
                    <select
                        id="selectRoom"
                        value={selectedRoom}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Sélectionner une salle</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.roomType}
                            </option>
                        ))}
                    </select>
                    {selectedRoom && rooms.find(room => room.id === Number(selectedRoom)) && (
                        <button type="button" onClick={() => handleOpenDetailsModal(rooms.find(room => room.id === Number(selectedRoom)))}>Voir Détails</button>
                    )}
                    <input
                        type="text"
                        id="clientFullName"
                        placeholder="Nom complet du client"
                        required
                        value={clientFullName}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="bookingDate">Date</label>
                    <input
                        type="date"
                        id="bookingDate"
                        required
                        value={date}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="bookingStartTime">Heure Début:</label>
                    <input
                        type="time"
                        id="bookingStartTime"
                        required
                        value={heureDebut}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="bookingEndTime">Heure Fin:</label>
                    <input
                        type="time"
                        id="bookingEndTime"
                        required
                        value={heureFin}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Choisir la méthode de paiement:</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={handleInputChange}
                    >
                        <option value="on-site">Paiement sur place</option>
                        <option value="online">Paiement en ligne</option>
                    </select>
                    {paymentMethod === 'online' && (
                        <div>
                            <label htmlFor="rib">RIB:</label>
                            <input
                                type="text"
                                id="rib"
                                placeholder="Entrez votre RIB"
                                value={rib}
                                onChange={handleInputChange}
                                required
                            />
                            <br />
                        </div>
                    )}
                    <br />
                    <button type="submit">Confirmer Réservation</button>
                    <RoomDetailsModal isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal} room={selectedRoomDetails} />
                </form>
            </div>

            {/* Receipt Modal */}
            {isReceiptModalOpen && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <h2>Reçu de Réservation</h2>
                        <pre>{receiptContent}</pre>
                        <button onClick={handlePrint}>Imprimer le Reçu</button>
                        <button onClick={() => setIsReceiptModalOpen(false)}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingModal;
