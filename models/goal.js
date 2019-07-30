import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var GoalSchema = new Schema({
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

module.exports = mongoose.model('GoalModel', GoalSchema);
