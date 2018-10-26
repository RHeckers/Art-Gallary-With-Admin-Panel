const express = require('express');
const router = express.Router();
const bulkWrite = require('../models/bulkWrite');
const checkAuth = require('../middleware/check-auth');

// import models
const ArtCollection = require('../models/artCollection');

router.put('/', checkAuth, (req, res, next) => {
    let bulkWrite = req.body;
    ArtCollection.bulkWrite(bulkWrite)
    .then(collections => {
        res.status(200).json(collections);

    })
    .catch(err => console.log(err));

});

    
    

module.exports = router;