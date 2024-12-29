// HomeSection.js
import React, { useState, useEffect, useRef } from 'react';
import './HomeSection.css';
import {Container, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel, Card, CardContent, CardMedia, Grid} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ServicesSection from "./ServicesSection";
import './HomeSection.css';
import StarIcon from '@mui/icons-material/Star';


const HomeSection = ({ isLoggedIn, children, isBookingModalOpen }) => {
    const [selectedDate, setSelectedDate] = useState('Today');
    const [selectedPeople, setSelectedPeople] = useState(1);
    const navigate = useNavigate();
    const newColor = '#a17025';
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [overlayImage, setOverlayImage] = useState(null);
    const [transitioning, setTransitioning] = useState(false);
    const intervalRef = useRef(null);
    const [animatedIndex, setAnimatedIndex] = useState(0);
    const imageUrls = [
        "https://ctfassets.imgix.net/vh7r69kgcki3/46VeGE2tnqmkRLYI6VEJeh/9e35ea0ec8c67569128be3f0bccff6eb/Web_150DPI-20221216_WeWork_Product_Shoot_Q4_3.jpg?auto=format%20compress&fit=crop&q=50&w=750px",
        "https://www.displaynote.com/content/uploads/2023/03/iStock-1333390966-1.jpg",
        "https://www.avocor.com/wp-content/uploads/2020/04/meeting-room-blog.jpg"
    ];
    const handleDateChange = (e) => setSelectedDate(e.target.value);
    const handlePeopleChange = (e) => setSelectedPeople(e.target.value);

    const features = [
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAyYR_zPDrfJa4HuStgStmZl5sBDWmI6rMUlnFlgJXRIsgJ2S93CL6MPcm9oDbdCFp5U&usqp=CAU",
            title: "Équipement Moderne",
            description: "Profitez de projecteurs de pointe, de tableaux interactifs, et d'une connectivité internet haute vitesse pour toutes vos présentations."
        },
        {
            image: "https://cdn.prod.website-files.com/636bbf9c519296f08f480299/650cabf48a2f6febc7874bb0_blog%20-%20hero%20-%20how%20to%20better%20manage%20your%20tech%20offices.jpg",
            title: "Aménagements Flexibles",
            description: "Nos salles peuvent être configurées pour s'adapter à la taille et au type de votre réunion, qu'il s'agisse d'une petite discussion ou d'une grande conférence."
        },
        {
            image: "https://i.pinimg.com/originals/da/23/e7/da23e7d352b7549cf16bee90cc7631ce.jpg",
            title: "Emplacements Stratégiques",
            description: "Nos salles sont disponibles dans des emplacements stratégiques et accessibles, assurant un accès facile à vos participants, que ce soit en ville ou en périphérie."
        },
        {
            image: "https://cdn.iqboard.net/img/business-images/IQMeet%20AVS200%20is%20great%20assist%20for%20medium%20to%20large%20meeting%20room%20occasion.webp",
            title: "Technologie de Pointe",
            description: "Profitez de notre équipement audiovisuel de qualité supérieure, de la visioconférence aux écrans interactifs, pour une communication fluide."
        },
        {
            image: "https://resources.owllabs.com/hubfs/Blog-Image_1152x768-20.jpg",
            title: "Environnement Confortable",
            description: "Nos salles sont conçues pour vous offrir un environnement calme, confortable et propice à la concentration, assurant ainsi le succès de vos réunions."
        },
        {
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ80kk73zH7lvDQQTxCPrN7NFPYEbi3NhwwHg&s",
            title:"Salles Modulables",
            description: "La configuration de nos salles est flexible, ce qui permet de les adapter à différents types de réunions, vous garantissant un espace parfait."
        }
    ];


    useEffect(() => {
        setOverlayImage(imageUrls[currentImageIndex]);

        intervalRef.current = setInterval(() => {
            setTransitioning(true); // Start transitioning

            // Quick transition to avoid white background when the cycle restarts
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
                setTransitioning(false);
            }, 300); // Quick transition time during image change

        }, 3000); // Change image every 3 seconds

        return () => clearInterval(intervalRef.current);
    }, [currentImageIndex, imageUrls]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (animatedIndex < features.length) {
                setAnimatedIndex(prevIndex => prevIndex + 1);
            } else{
                clearInterval(timer)
            }
        }, 500); // Adjust time as you like
        return () => clearInterval(timer);

    }, [animatedIndex,features]);


    const handleBookNowClick = () => {
        navigate('/rooms');
    };


    return (
        <Box className="home-section">
            {/* Hero Section */}
            <Box
                className={`hero-section ${transitioning ? 'transitioning' : ''}`}
                sx={{
                    backgroundImage: `url(${imageUrls[currentImageIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '0 20px',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: isBookingModalOpen ? 0.5 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                }}
            >
                {overlayImage && (
                    <Box
                        className="overlay-image"
                        sx={{
                            backgroundImage: `url(${overlayImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            transition: 'opacity 0.3s ease-in-out', // Quick transition to minimize white
                            opacity: transitioning ? 1 : 0
                        }}
                    />
                )}
                {!isBookingModalOpen && (
                    <Box
                        className="hero-text"
                        sx={{
                            maxWidth: 700,
                            position: 'relative',
                            transition: 'opacity 0.4s ease',
                            opacity: transitioning ? 0 : 1
                        }}>
                        <Typography variant="h1" sx={{
                            fontSize: '4rem',
                            fontWeight: '700',
                            marginBottom: 1.5,
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            transition: 'transform 0.3s ease-in-out',
                            "&:hover": {
                                transform: 'scale(1.02)'
                            }

                        }}>Réservez des Salles de Réunion</Typography>
                        <Typography variant="body1" sx={{
                            fontSize: '1.5rem',
                            marginBottom: 3,
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease-in-out',
                            "&:hover": {
                                transform: 'scale(1.02)'
                            }
                        }}  onClick={handleBookNowClick}>Des espaces modernes pour vos réunions, conférences et événements. Réservez dès maintenant!</Typography>
                    </Box>
                )}
            </Box>

            {/* Booking Section */}
            <Container maxWidth="md" sx={{ mt: 8, mb: 5 }}>
                <Box className="booking-section" sx={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    transition: 'box-shadow 0.3s ease',
                    "&:hover": {
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    }
                }}>
                    <Typography variant="h4" sx={{
                        fontSize: '2rem',
                        color: newColor,
                        marginBottom: 3,
                        transition: 'transform 0.3s ease-in-out',
                        "&:hover": {
                            transform: 'scale(1.02)'
                        }
                    }}>{isLoggedIn ? 'Bienvenue, vous êtes connecté' : 'Veuillez vous connecter pour réserver'}</Typography>
                    <Box className="booking-options" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 5,
                        flexWrap: 'wrap'
                    }}>
                        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="date-label">Date</InputLabel>
                            <Select labelId="date-label" id="date" label="Date" value={selectedDate} onChange={handleDateChange} sx={{
                                borderRadius: '25px',
                                "&:hover": { borderColor: newColor }
                            }}>
                                <MenuItem value={"Today"}>Today</MenuItem>
                                <MenuItem value={"Tomorrow"}>Tomorrow</MenuItem>
                                <MenuItem value={"Next Week"}>Next Week</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ m: 1, minWidth: 180 }}>
                            <InputLabel id="people-label">Nombre de personnes</InputLabel>
                            <Select labelId="people-label" id="people" label="Nombre de personnes" value={selectedPeople} onChange={handlePeopleChange} sx={{
                                borderRadius: '25px',
                                "&:hover": { borderColor: newColor }
                            }}>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10+</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button className="cta-booking" variant="contained" sx={{
                        padding: '15px 40px',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: 'white',
                        borderRadius: '30px',
                        border: 'none',
                        marginTop: 3,
                        backgroundColor: newColor,
                        transition: 'transform 0.3s ease-in-out',
                        "&:hover": {
                            backgroundColor: 'white',
                            color: newColor,
                            border: `2px solid ${newColor}`,
                            transform: 'scale(1.05)'
                        }
                    }}>Trouver une salle</Button>
                </Box>
            </Container>
            <ServicesSection />
            {/* Feature Sections */}
            <Container maxWidth="lg" sx={{ mt: 8, mb: 5 }}>
                <Typography variant="h4" sx={{
                    fontSize: '2rem',
                    color: newColor,
                    textAlign: 'center',
                    marginBottom: 3,
                    transition: 'transform 0.3s ease-in-out',
                    "&:hover": {
                        transform: 'scale(1.02)'
                    }
                }}>Nos Salles de Réunion</Typography>
                <Box sx={{padding: '20px'}}>
                    <Grid container spacing={4} >
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={4} key={index} sx={{
                                opacity: index <= animatedIndex ? 1 : 0,
                                transition: 'all 0.5s ease-in-out'
                            }}>
                                <Card sx={{height:'100%'}}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={feature.image}
                                        alt={feature.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: newColor, fontWeight: 'bold'}}>{feature.title}</Typography>
                                        <Typography variant="body2" sx={{ color: '#555', marginTop: 1 }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
            {/* About Us Section */}
            <Container maxWidth="md" sx={{ mt: 8, mb: 5}}>
                <Box className="about-us-section" sx={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                }}>
                    <Typography variant="h4" sx={{
                        fontSize: '2rem',
                        color: newColor,
                        marginBottom: 3,
                        transition: 'transform 0.3s ease-in-out',
                        "&:hover": {
                            transform: 'scale(1.02)'
                        }
                    }}>À propos d'Agora</Typography>
                    <Typography variant="body1" sx={{
                        fontSize: '1.2rem',
                        color: '#555',
                        marginBottom: 3
                    }}>
                        Agora est votre partenaire idéal pour des espaces de réunion flexibles et modernes. Nous sommes engagés à fournir des solutions d'espaces de travail qui répondent à vos besoins et à vos objectifs. Réservez dès maintenant et découvrez la différence.
                    </Typography>
                </Box>
            </Container>
            {/* Client Feedback Section */}
            <Container maxWidth="md" sx={{ mt: 8, mb: 5 }}>
                <Box className="feedback-section" sx={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                }}>
                    <Typography variant="h4" sx={{
                        fontSize: '2rem',
                        color: newColor,
                        marginBottom: 3,
                        transition: 'transform 0.3s ease-in-out',
                        "&:hover": {
                            transform: 'scale(1.02)'
                        }
                    }}>Témoignages de Nos Clients</Typography>
                    <Box  sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap'}}>
                        <Card sx={{ maxWidth: 300 , padding: 2,  transition: 'box-shadow 0.3s ease',
                            "&:hover": {
                                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                            }}}>
                            <CardContent>
                                <Typography variant="body2" sx={{
                                    color: '#555',
                                    marginBottom: 2
                                }}>
                                    <StarIcon sx={{color: '#FFD700', marginRight:0.5}}/>
                                    <StarIcon sx={{color: '#FFD700', marginRight:0.5}}/>
                                    <StarIcon sx={{color: '#FFD700', marginRight:0.5}}/>
                                    <StarIcon sx={{color: '#FFD700', marginRight:0.5}}/>
                                    "Les salles d'Agora ont toujours été parfaites pour nos réunions. Elles sont modernes, bien équipées, et le personnel est très serviable."
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: '#777' }}>- Jean D.</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: 300, padding: 2,  transition: 'box-shadow 0.3s ease',
                            "&:hover": {
                                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                            }}}>
                            <CardContent>
                                <Typography variant="body2" sx={{
                                    color: '#555',
                                    marginBottom: 2
                                }}>
                                    <StarIcon sx={{color: '#FFD700', marginRight:0.5}}/>
                                    <StarIcon sx={{color: '#FFD700', marginRight:0.5}}/>
                                    <StarIcon sx={{color: '#FFD700', marginRight:0.5}}/>
                                    <StarIcon sx={{color: '#FFD700', marginRight:0.5}}/>
                                    <StarIcon sx={{color: '#FFD700', marginRight:0.5}}/>
                                    "La flexibilité des salles d'Agora est un atout majeur. Nous pouvons réserver à la dernière minute et trouver toujours un espace qui correspond à nos besoins."
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: '#777' }}>- Marie L.</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>

            {/* Footer */}
            <footer className="footer" style={{ backgroundColor: '#333', color: 'white', padding: 3, textAlign: 'center', }}>
                <Box className="footer-links"
                     sx={{
                         display: 'flex',
                         justifyContent: 'center',
                         gap: 1,
                         a: {
                             color: 'white',
                             textDecoration: 'none',
                             margin: '0 15px',
                             "&:hover": { color: newColor }
                         }
                     }}>
                    <Button onClick={()=>{}} sx={{
                        color: 'white',
                        textDecoration: 'none',
                        margin: '0 15px',
                        "&:hover": { color: newColor },
                        padding: 0,
                        minWidth:0
                    }}>À propos</Button>
                    <Button onClick={()=>{}} sx={{
                        color: 'white',
                        textDecoration: 'none',
                        margin: '0 15px',
                        "&:hover": { color: newColor },
                        padding: 0,
                        minWidth:0
                    }}>Termes et Conditions</Button>
                    <Button onClick={()=>{}} sx={{
                        color: 'white',
                        textDecoration: 'none',
                        margin: '0 15px',
                        "&:hover": { color: newColor },
                        padding: 0,
                        minWidth:0
                    }}>Politique de confidentialité</Button>
                    <Button onClick={()=>{}} sx={{
                        color: 'white',
                        textDecoration: 'none',
                        margin: '0 15px',
                        "&:hover": { color: newColor },
                        padding: 0,
                        minWidth:0
                    }}>Contact</Button>
                </Box>
                <Typography variant="body2" sx={{ marginTop: 2 }}> © 2024 Agora - Tous droits réservés</Typography>
            </footer>

            {children}
        </Box>
    );
};

export default HomeSection;