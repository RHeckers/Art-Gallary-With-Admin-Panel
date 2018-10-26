const mongoose = require('mongoose');

const bulkWriteSchema = mongoose.Schema({
    updateOne: {
        filter: { _id: {type: String,  required: true} },
        update: {
          $set: {
            index: {type: Number,  required: true}}
                }
                }
});

module.exports = mongoose.model('BulkWrite', bulkWriteSchema);

