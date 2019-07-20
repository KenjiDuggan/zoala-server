var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MuscleSchema = new Schema({
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

module.exports = mongoose.model('Muscle', MuscleSchema);
