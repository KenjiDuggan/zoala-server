var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    schedule: [

    ],
});

module.exports = mongoose.model('Cardio', CardioSchema);
