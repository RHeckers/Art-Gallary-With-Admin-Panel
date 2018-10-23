const express = require('express');
const multer = require('multer');
const router = express.Router();
const ArtCollection = require('../models/artCollection');

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

router.post('/addImages', multer({storage: fileStorage}).array("images"), (req, res, next) => {
    console.log(req.files);
    const url = req.protocol + "://" + req.get("host");
    const imgPaths = []
    for(let i = 0; i < req.files.length; i++){
        imgPaths.push(url + "/images/" + req.files[i].filename);
    }
    res.status(201).json(imgPaths);
});

router.post('/', multer({storage: fileStorage}).array("images"), (req, res, next) => {
    console.log(req.files);
    const url = req.protocol + "://" + req.get("host");
    const imgPaths = []
    for(let i = 0; i < req.files.length; i++){
        imgPaths.push(url + "/images/" + req.files[i].filename);
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

router.get('/',(req, res, next) => {
    ArtCollection.find()
      .then(collections => {
          res.status(200).json(collections.reverse());
      });
});

router.put('/:id', (req, res, next) => {
    const newCollection = new ArtCollection({
        _id: req.body.id,
        title: req.body.title,
        artCollection: req.body.artCollection
    })
    ArtCollection.updateOne({_id: req.params.id}, newCollection)
        .then(result => {
            console.log(result)
            res.status(200).json({msg: 'Post Updated!'})
        })
        .catch(err => console.log(err));
});

router.delete('/:id', (req, res, next) => {
    ArtCollection.deleteOne({_id: req.params.id})
      .then(result => {
        console.log(result['artCollection']);
        res.status(200).json({msg: "Post deleted!"})
      })
      .catch(err => res.status(400).json({ msg: 'Something went wrong deleting the user!'}));
});

module.exports = router;