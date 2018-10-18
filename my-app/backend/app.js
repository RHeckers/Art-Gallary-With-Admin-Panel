const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const ArtCollection = require('./models/artCollection');

const app = express();

mongoose.connect('mongodb+srv://rheckers:B83bWrT4DII2I1q0@cluster0-uidwd.mongodb.net/art-gallary?retryWrites=true', { useNewUrlParser: true })
 .then(() => {
     console.log('Connected to database!')
 })
 .catch(() => {
     console.log('Connection to database failed')
 });

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Inlavid image type');
        if(isValid){
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extention = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + extention);
    }
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-Width, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methodes", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join("backend/images")));

app.post('/api/artCollection', multer({storage: fileStorage}).array("images"), (req, res, next) => {
    console.log(req.files);
    const url = req.protocol + "://" + req.get("host");
    const imgPaths = []
    for(let i = 0; i < req.files.length; i++){
        imgPaths.unshift(url + "/images/" + req.files[i].filename);
    }
    const artcollection = new ArtCollection({
        title: req.body.title,
        artCollection: imgPaths
    });
    console.log(artcollection);
    artcollection.save().then(createdCollection => {
        res.status(201).json({
            ...createdCollection,
            id: createdCollection._id
        });
    });
    
});

app.get('/api/artCollections',(req, res, next) => {
    ArtCollection.find()
      .then(collections => {
          res.status(200).json(collections);
      });
});

module.exports = app;