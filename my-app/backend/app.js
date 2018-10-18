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
        cd(error, "backend/images");
    },
    filename: (req, file, cd) => {
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

app.post('/api/artCollection', (res, req, next) => {
    const artcollection = new ArtCollection({
        title: req.body.title,
        artCollection: req.body.artCollection
    });
    console.log(artcollection);
    artcollection.save();
    res.status(201).json({ msg: 'Art collection successfully added'});
});

app.get('/api/artCollections', multer({storage: fileStorage}).array("image"),(req, res, next) => {
    // ArtCollection.find()
    //   .then(collections => {
    //       console.log(123);

    //       res.status(200).json(collections);
    //   });
    
    const artCollections = [
        {
            id: "denv23rfjkead", 
            title: 'Art Collection One',
            artCollection: [
                "http://www.damnmagazine.net/wp-content/uploads/2017/08/Unknown-6.jpeg",
                "https://media.npr.org/assets/img/2017/11/09/trh_how_art_changes_us_artwork-40eb6e2c7a2ffb492687286157d302ba396dcb9e-s1200.jpg", 
                "http://www.timespub.com/wp-content/uploads/2018/08/wall-art-2852231_960_720.jpg", 
                "https://cdn-images-1.medium.com/max/2000/1*AnmQd3T5y_k9M0e0rAfxYQ.jpeg"]
        },
        {
            id: "cdbavhk4we3fr33", 
            title: 'Art Collection Two',
            artCollection: [
                "https://emerotoolecom.files.wordpress.com/2018/07/161124132021-art-in-detail-tease-1-full-169.jpg",
                "https://media.npr.org/assets/img/2017/11/09/trh_how_art_changes_us_artwork-40eb6e2c7a2ffb492687286157d302ba396dcb9e-s1200.jpg", 
                "http://i.imgur.com/1wYVzIK.jpg", 
                "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/32afdc5e-Art-in-Paradise/ArtinParadisePattaya.jpg"]
        }
    ]
    res.status(200).json(artCollections);
});

module.exports = app;