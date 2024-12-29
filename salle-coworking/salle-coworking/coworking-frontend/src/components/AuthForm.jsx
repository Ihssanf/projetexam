// AuthForm.js
import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Grid,
    Container,
    Paper,
    InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type, onAuthSuccess, onCloseModal }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const API_BASE_URL = "http://localhost:9090";
    const navigate = useNavigate();
    const brownColor = '#a17025';
    const lightBrown = '#d4a85f';
    const beigeColor = '#f0e6d8';


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const url =
                type === "register"
                    ? `${API_BASE_URL}/auth/register-user`
                    : `${API_BASE_URL}/auth/login`;
            const body =
                type === "register"
                    ? JSON.stringify({ firstName, lastName, email, password })
                    : JSON.stringify({ email, password });
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            });

            if (response.ok) {
                if (type === "register") {
                    alert("Inscription réussie! Veuillez vous connecter.");
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    onCloseModal()
                } else {
                    const data = await response.json();
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("loggedInUser", data.email);
                    onAuthSuccess();
                    alert("Connexion réussie!");
                    navigate("/");
                }
            } else {
                let errorData = "Une erreur s'est produite";
                try {
                    errorData = await response.json(); // Tentative de récupérer un JSON d'erreur
                    if (errorData && errorData.message) {
                        errorData = errorData.message
                    }
                    // Afficher le message d'erreur du backend
                } catch (parseError) {
                    errorData = await response.text(); // Utilisation de text si pas de JSON
                }
                setError(errorData);
            }
        } catch (err) {
            setError(
                type === "register"
                    ? "Erreur lors de l'inscription"
                    : "Erreur lors de la connexion"
            );
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${lightBrown}, ${beigeColor})`,
                    }}
                >
                    <Box textAlign="center" mb={3}>
                        <AccountCircleIcon
                            sx={{ fontSize: 60, color: brownColor, mb: 1 }}
                        />
                        <Typography variant="h4" fontWeight="bold" sx={{ color: '#333'}}>
                            {type === "register" ? "Créer un compte" : "Connexion"}
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        {type === "register" && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="firstName"
                                        label="Prénom"
                                        variant="outlined"
                                        required
                                        value={firstName}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon  sx={{color: brownColor}} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{backgroundColor: 'white'}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="lastName"
                                        label="Nom"
                                        variant="outlined"
                                        required
                                        value={lastName}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon sx={{color: brownColor}} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{backgroundColor: 'white'}}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        <TextField
                            fullWidth
                            margin="normal"
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            required
                            value={email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{color: brownColor}}/>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{backgroundColor: 'white'}}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="password"
                            label="Mot de passe"
                            type="password"
                            variant="outlined"
                            required
                            value={password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{color: brownColor}} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{backgroundColor: 'white'}}
                        />
                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3, py: 1.5, fontWeight: "bold" , borderRadius: 2, backgroundColor: 'white', color: brownColor, border: `1px solid ${brownColor}`,
                                    "&:hover":{backgroundColor: '#e0e0e0'}
                                }}
                            >
                                {type === "register" ? "S'inscrire" : "Se connecter"}
                            </Button>
                        </motion.div>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default AuthForm;