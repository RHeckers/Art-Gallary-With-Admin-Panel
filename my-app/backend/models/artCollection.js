const mongoose = require('mongoose');

const artCollectionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artCollection: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('ArtCollection', artCollectionSchema);

