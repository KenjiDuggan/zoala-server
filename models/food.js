var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String
    },
    schedule: [

    ],
});

module.exports = mongoose.model('Food', FoodSchema);
