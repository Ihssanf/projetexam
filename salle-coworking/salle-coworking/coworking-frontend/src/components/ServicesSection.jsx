// ServicesSection.js
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import {
    Coffee,
    SmokingRooms,
    LocalLibrary,
    Print,
    Wifi,
    MeetingRoom,
    Kitchen,
    SportsBar,
    Accessible,
    ArrowBackIos,
    ArrowForwardIos
} from '@mui/icons-material';
import "./ServiceSection.css"


const ServicesSection = () => {
    const services = [
        {
            name: 'Café',
            description: 'Savourez notre café de qualité pour vos pauses.',
            icon: <Coffee sx={{ fontSize: '2rem', color: '#a17025' }} />,
            photo: 'https://images.unsplash.com/photo-1478640335386-1aa391482455?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Espace Fumeur',
            description: 'Profitez d\'un espace fumeur confortable et aéré.',
            icon: <SmokingRooms sx={{ fontSize: '2rem', color: '#a17025' }} />,
            photo: 'https://images.unsplash.com/photo-1595574853618-5a67e8a14b30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Bibliothèque',
            description: 'Consultez notre sélection de livres et de ressources.',
            icon: <LocalLibrary sx={{ fontSize: '2rem', color: '#a17025' }} />,
            photo: 'https://images.unsplash.com/photo-1530541891405-9235a7f14900?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Impression',
            description: 'Imprimez vos documents rapidement et facilement.',
            icon: <Print sx={{ fontSize: '2rem', color: '#a17025' }} />,
            photo: 'https://images.unsplash.com/photo-1637385395697-bb2a13791a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Wi-Fi Haut Débit',
            description: 'Profitez d\'une connexion Wi-Fi rapide et fiable.',
            icon: <Wifi sx={{ fontSize: '2rem', color: '#a17025' }} />,
            photo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d38e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Salle de réunion',
            description: 'Organisez vos réunions dans nos espaces dédiés.',
            icon: <MeetingRoom sx={{ fontSize: '2rem', color: '#a17025' }} />,
            photo: 'https://images.unsplash.com/photo-1612225389627-4a77134d594b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Cuisine Équipée',
            description: 'Utilisez notre cuisine pour préparer vos repas.',
            icon: <Kitchen sx={{ fontSize: '2rem', color: '#a17025' }} />,
            photo: 'https://images.unsplash.com/photo-1576161787930-b1d9ca84984f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Bar',
            description: 'Venez prendre un verre entre collègues.',
            icon: <SportsBar sx={{ fontSize: '2rem', color: '#a17025' }} />,
            photo: 'https://images.unsplash.com/photo-1615927596558-4362e396b97a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            name: 'Accès Handicapé',
            description: 'Nos locaux sont accessibles aux personnes à mobilité réduite.',
            icon: <Accessible sx={{ fontSize: '2rem', color: '#a17025' }} />,
            photo: 'https://images.unsplash.com/photo-1622338599030-973c220b69e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
    ];

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 3;

    const handleNext = () => {
        if (startIndex + itemsPerPage < services.length) {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - itemsPerPage);
        }
    };

    const displayedServices = services.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Box sx={{
            padding: '40px 20px',
            backgroundColor: '#f0f0f0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#333' }}>Nos Services</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Grid container spacing={3} sx={{ justifyContent: 'center', marginBottom: 2 }}>
                    {displayedServices.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} >
                            <Card className="service-card" sx={{ maxWidth: 345, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 3,
                                    backgroundColor: '#f0f0f0'
                                }}>
                                    <Box sx={{marginBottom: 1, }}>
                                        {service.icon}
                                    </Box>
                                    <Typography variant="h6" sx={{ color: '#a17025', fontWeight: 'bold'}}>{service.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ color: '#555',  textAlign: 'center'}}>
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <IconButton onClick={handlePrev} disabled={startIndex === 0}>
                        <ArrowBackIos color={"primary"}/>
                    </IconButton>
                    <IconButton onClick={handleNext} disabled={startIndex + itemsPerPage >= services.length}>
                        <ArrowForwardIos  color={"primary"} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ServicesSection;