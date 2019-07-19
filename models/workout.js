var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    reps: {
        type: Number
    },
    weight: {
        type: Number
    },
    sets: {
        type: Number
    }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
