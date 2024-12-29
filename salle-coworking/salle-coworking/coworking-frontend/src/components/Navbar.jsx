import React, { useState, useEffect } from 'react';
import {
    FaHome, FaBuilding, FaCalendarAlt,
    FaSignOutAlt, FaUserPlus, FaSignInAlt, FaPlus
} from 'react-icons/fa';
import Profile from "./Profil.jsx";
import { Snackbar, Alert } from '@mui/material';
import BookingModal from "./BookingModal";
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ onHomeClick, onBookingsClick, isLoggedIn, logout, loggedInUser, onOpenModal }) => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const API_BASE_URL = 'http://localhost:9090';
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    setErrorMessage('Vous devez vous connecter pour accéder aux salles.');
                    setTimeout(() => setErrorMessage(null), 3000);
                    return;
                }
                const apiUrl = `${API_BASE_URL}/rooms/all-rooms`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setRooms(data);
                } else {
                    const errorText = await response.text();
                    console.error("Error fetching rooms:", response.status, errorText);
                    setErrorMessage(`Erreur lors du chargement des salles: ${response.status} ${errorText}`);
                    setTimeout(() => setErrorMessage(null), 3000);
                }
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setErrorMessage(`Erreur lors du chargement des salles: ${err.message}`);
                setTimeout(() => setErrorMessage(null), 3000);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users/user-profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);

                    // Définir le rôle utilisateur après récupération des données
                    const role = data.roles && data.roles.length > 0 ? data.roles[0].name : null; // Supposons que les rôles sont dans un tableau
                    console.log(role);
                    setUserRole(role);
                } else {
                    const errorData = await response.json();
                    console.error("Erreur:", errorData.message || "Impossible de charger les informations de l'utilisateur");
                }
            } catch (e) {
                console.error("Erreur lors de la communication avec le serveur:", e);
            }
        };

        if (isLoggedIn) {
            fetchRooms();
            fetchUserProfile(); // Fetch user profile here
        }
    }, [isLoggedIn, API_BASE_URL]);
    console.log(userRole);
    const handleOpenProfileModal = () => {
        setIsProfileModalOpen(true);
    };
    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };
    const handleOpenBookingModal = () => {
        setIsBookingModalOpen(true);
    };
    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
    };
    const handleCloseSnackbar = () => {
        setErrorMessage(null);
    }

    const handleBookSuccess = () => {
        onBookingsClick();
    };

    const handleRoomsClickWithCheck = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            navigate('/rooms')
        } else {
            setErrorMessage('Vous devez vous connecter pour accéder aux salles');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    const handleBookingsClickWithCheck = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            onBookingsClick(); // Call the onBookingsClick prop
        } else {
            setErrorMessage('Vous devez vous connecter pour accéder aux réservations');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    const handleLogout = () => {
        // Clear JWT token from localStorage
        localStorage.removeItem('jwt');

        // Call the logout function from props (if any)
        logout();

        // Redirect to the homepage and force a reload to clear any session data
        navigate("/");
        window.location.reload(); // This forces the page to reload to reset the session
    };

    const newColor = '#a17025';
    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '10px 15px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s ease',
    };

    const buttonStyle = {
        backgroundColor: newColor,
        border: 'none',
        color: 'white',
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '25px',
        fontWeight: 'bold',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s ease',
    };

    return (
        <nav style={{
            background: `linear-gradient(45deg, ${newColor}, #825a21)`,
            padding: '12px 20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
        }}>
            <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <a href="#" style={{ ...linkStyle, fontSize: '20px', marginRight: '30px' }}>
                        AGORA
                    </a>
                    <li>
                        <a href="/" onClick={onHomeClick} style={linkStyle}
                           onMouseEnter={e => e.target.style.backgroundColor = '#825a21'}
                           onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                            <FaHome style={{ marginRight: '8px' }} />
                            Accueil
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={handleRoomsClickWithCheck} style={linkStyle}
                           onMouseEnter={e => e.target.style.backgroundColor = '#825a21'}
                           onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                            <FaBuilding style={{ marginRight: '8px' }} />
                            Salles
                        </a>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <a href="#" onClick={handleOpenBookingModal} style={linkStyle}
                               onMouseEnter={e => e.target.style.backgroundColor = '#825a21'}
                               onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                                <FaPlus style={{ marginRight: '8px' }} />
                                Réserver
                            </a>
                        </li>
                    )}

                </div>

                <div>
                    {user && userRole === "ROLE_ADMIN" && (
                        <li className="nav-item">
                            <NavLink className="nav-link admin-link" aria-current="page" to={"/admin"}>
                                Mode Administrateur
                            </NavLink>
                        </li>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {isLoggedIn ? (
                        <li style={{ display: 'flex', alignItems: 'center' }}>
                            <span
                                onClick={handleOpenProfileModal}
                                id="username"
                                aria-label="Ouvrir le profil utilisateur"
                                style={{
                                    color: 'white',
                                    fontSize: '16px',
                                    marginRight: '20px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                }}>
                                {loggedInUser || 'Utilisateur'}
                            </span>
                            <button id="logoutBtn" onClick={handleLogout} style={buttonStyle}
                                    onMouseEnter={e => e.target.style.backgroundColor = '#825a21'}
                                    onMouseLeave={e => e.target.style.backgroundColor = newColor}>
                                <FaSignOutAlt style={{ marginRight: '8px' }} />
                                Déconnexion
                            </button>
                            <Profile
                                open={isProfileModalOpen}
                                onClose={handleCloseProfileModal}
                                loggedInUser={loggedInUser}
                            />
                        </li>
                    ) : (
                        <li>
                            <a href="#" id="registerLink" onClick={(e) => { e.preventDefault(); onOpenModal('register'); }}
                               style={{ ...linkStyle, marginRight: '20px' }}
                               onMouseEnter={e => e.target.style.color = '#825a21'}
                               onMouseLeave={e => e.target.style.color = 'white'}>
                                <FaUserPlus style={{ marginRight: '8px' }} />
                                Inscription
                            </a>
                            <a href="#" id="loginLink" onClick={(e) => { e.preventDefault(); onOpenModal('login'); }}
                               style={linkStyle}
                               onMouseEnter={e => e.target.style.color = '#825a21'}
                               onMouseLeave={e => e.target.style.color = 'white'}>
                                <FaSignInAlt style={{ marginRight: '8px' }} />
                                Connexion
                            </a>
                        </li>
                    )}
                </div>
            </ul>
            <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={handleCloseSnackbar}
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error" onClose={handleCloseSnackbar}>{errorMessage}</Alert>
            </Snackbar>
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={handleCloseBookingModal}
                rooms={rooms}
                onBookSuccess={handleBookSuccess}
            />
        </nav>
    );
};

export default Navbar;
