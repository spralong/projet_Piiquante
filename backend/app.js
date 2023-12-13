const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


const helmet = require('helmet');


const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

mongoose.connect(`mongodb+srv://sebastienpralong:didier12@cluster0$.ykis5ck.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`,
// mongoose.connect(`mongodb+srv://${process.env.IDENTIFIANT}:${process.env.MDP}@${process.env.MY_BASE}.ykis5ck.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('connexion réussie '))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);


// Permet d'accéder à notre API depuis n'importe quelle origine (3000 / 4200) / Evite erreur CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;