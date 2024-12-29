// Profile.js
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Modal,
    Container,
    Paper,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Button,
    Divider,
    Grid,
    ListItemIcon
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Profile = ({ onClose, open }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = 'http://localhost:9090';
    const brownColor = '#a17025';
    const lightBrown = '#d4a85f';
    const beigeColor = '#f0e6d8';

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/users/user-profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    setError(null);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "Impossible de charger les informations de l'utilisateur");
                }
            } catch (e) {
                setError("Erreur lors de la communication avec le serveur");
            } finally {
                setLoading(false);
            }
        };

        if (open) fetchUserProfile();
    }, [open]);

    if (!open) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Container maxWidth="sm" sx={{mt: 2 , mb: 2}}>
                <Paper
                    elevation={4}
                    style={{
                        padding: '20px',
                        textAlign: 'center',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${beigeColor}, ${lightBrown})`
                    }}
                >
                    <Typography variant="h5" gutterBottom  sx={{ fontWeight: 'bold', color: brownColor}}>
                        Informations de l'utilisateur
                    </Typography>
                    {loading ? (
                        <Typography  sx={{color: '#555'}}>Chargement du profil...</Typography>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        margin: 'auto',
                                        backgroundColor: lightBrown
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: 60, color: 'white' }}/>
                                </Avatar>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <List>
                                        <ListItem >
                                            <ListItemText
                                                primary={<Typography variant="body1" sx={{ fontWeight: 'bold', color: brownColor}}>First Name</Typography>}
                                                secondary={<Typography variant="body1" sx={{color: '#555'}}>{user?.firstName || 'N/A'}</Typography>}
                                            />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                primary={<Typography variant="body1" sx={{ fontWeight: 'bold', color: brownColor}}>Last Name</Typography>}
                                                secondary={<Typography variant="body1" sx={{color: '#555'}}>{user?.lastName || 'N/A'}</Typography>}
                                            />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                primary={<Typography variant="body1" sx={{ fontWeight: 'bold', color: brownColor}}>Email</Typography>}
                                                secondary={<Typography variant="body1" sx={{color: '#555'}}>{user?.email || 'N/A'}</Typography>}
                                            />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText
                                                primary={<Typography variant="body1" sx={{ fontWeight: 'bold', color: brownColor}}>Roles</Typography>}
                                                secondary={
                                                    Array.isArray(user?.roles) && user.roles.length > 0 ? (
                                                        <List>
                                                            {user.roles.map((role, index) => (
                                                                <ListItem key={index}>
                                                                    <ListItemIcon><LocalOfferIcon sx={{color: brownColor}}/> </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={
                                                                            <Typography variant="body1"  sx={{color: '#555'}}>
                                                                                {typeof role === 'object' ? role.name || JSON.stringify(role) : role}
                                                                            </Typography>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    ) : (
                                                        <Typography variant="body1" sx={{color: '#555'}}>N/A</Typography>
                                                    )
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>


                            <Divider sx={{ margin: '20px 0' }} />
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: brownColor}}>
                                Historique des réservations
                            </Typography>
                            <Typography variant="body1"  sx={{color: '#555'}}>
                                Vous n'avez aucune réservation en cours
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ marginTop: '20px', borderRadius: 2, backgroundColor: 'white', color: brownColor , border:`1px solid ${brownColor}`,
                                    "&:hover":{ backgroundColor: '#e0e0e0'}
                                }}
                                onClick={() => alert('Suppression du compte non implémentée')}
                            >
                                Supprimer compte
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Modal>
    );
};

export default Profile;