const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const artCollectionRoutes = require('./routes/artCollections');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect('mongodb+srv://rheckers:B83bWrT4DII2I1q0@cluster0-uidwd.mongodb.net/art-gallary?retryWitres="true"', { useNewUrlParser: true })
 .then(() => {
     console.log('Connected to database!')
 })
 .catch(() => {
     console.log('Connection to database failed')
 });

app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-Width, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(bodyParser.json());

app.use('/api/artCollections', artCollectionRoutes);
app.use('/api/auth', authRoutes);


module.exports = app;