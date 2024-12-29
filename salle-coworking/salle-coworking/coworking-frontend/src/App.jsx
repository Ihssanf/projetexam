import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import RoomsSection from './components/RoomsSection';
import BookingModal from './components/BookingModal';
import BookingsSection from './components/BookingsSection';
import AuthForm from './components/AuthForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import BookingManagement from './components/BookingManagement'; // Ensure this is imported
import EditBooking from './components/EditBooking';  // Import the EditBooking component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt'));
    const [showRooms, setShowRooms] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser') || '');
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [authFormType, setAuthFormType] = useState(null);

    const API_BASE_URL = "http://localhost:9090";

    useEffect(() => {
        fetchUserBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setLoggedInUser(localStorage.getItem('loggedInUser') || '');
        handleCloseAuthModal();
    };

    const handleHomeClick = () => {
        setShowRooms(false);
        setShowBookings(false);
    };

    const handleRoomsClick = () => {
        setShowRooms(true);
        setShowBookings(false);
    };

    const handleBookingsClick = () => {
        setShowRooms(false);
        setShowBookings(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('userRoles');
        setIsLoggedIn(false);
        setLoggedInUser('');
        setShowRooms(false);
        setShowBookings(false);
        window.location.reload();
    };

    const handleBook = (roomId) => {
        setSelectedRoomId(roomId);
        setIsBookingModalOpen(true);
    };

    const handleBookSuccess = () => {
        setIsBookingModalOpen(false);
        fetchUserBookings();
    };

    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
    };

    const fetchUserBookings = async () => {
        if (!isLoggedIn) {
            setBookings([]);
            return;
        }
        setLoadingBookings(true);

        try {
            const email = localStorage.getItem('loggedInUser');
            const response = await fetch(`${API_BASE_URL}/bookings/user/${email}/bookings`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            } else {
                setBookings([]);
                const errorData = await response.text();
                console.error('Erreur lors de la récupération des réservations:', errorData);
            }
        } catch (error) {
            console.error("Erreur de fetch", error);
            setBookings([]);
        } finally {
            setLoadingBookings(false);
        }
    };

    const handleOpenModal = (type) => {
        setAuthFormType(type);
        setShowAuthForm(true);
    };

    const handleCloseAuthModal = () => {
        setShowAuthForm(false);
        setAuthFormType(null);
    };

    return (
        <Router>
            <div className="App">
                <Navbar
                    onHomeClick={handleHomeClick}
                    onRoomsClick={handleRoomsClick}
                    onBookingsClick={handleBookingsClick}
                    isLoggedIn={isLoggedIn}
                    logout={handleLogout}
                    loggedInUser={loggedInUser}
                    onOpenModal={handleOpenModal}
                />
                <Routes>
                    <Route path="/" element={
                        <HomeSection isLoggedIn={isLoggedIn}>
                            {showRooms && <RoomsSection onBook={handleBook} />}
                            {showBookings && (
                                <BookingsSection bookings={bookings} loading={loadingBookings} />
                            )}
                            {showAuthForm && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 9999,
                                    }}
                                    onClick={(e) => {
                                        if (e.target === e.currentTarget) {
                                            handleCloseAuthModal();
                                        }
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: '#fff',
                                            padding: '20px',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            position: 'relative',
                                            zIndex: 10000,
                                            maxWidth: '500px',
                                            width: '90%',
                                        }}
                                    >
                                        <AuthForm
                                            type={authFormType}
                                            onAuthSuccess={handleLoginSuccess}
                                            onCloseModal={handleCloseAuthModal}
                                        />
                                    </div>
                                </div>
                            )}
                        </HomeSection>
                    } />
                    <Route path="/rooms" element={<RoomsSection onBook={handleBook} />} />
                    <Route path="/admin/*" element={<Admin />} />
                    <Route path="/bookings" element={<BookingManagement />} /> {/* Added bookings route */}
                    <Route path="/edit-booking/:id" element={<EditBooking />} /> {/* Route for editing a booking */}
                </Routes>
                <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={handleCloseBookingModal}
                    roomId={selectedRoomId}
                    onBookSuccess={handleBookSuccess}
                />
            </div>
        </Router>
    );
}

export default App;
