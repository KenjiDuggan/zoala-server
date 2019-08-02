import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var GoalSchema = new Schema({
    dailie: [

    ],
    ongoing: [

    ],
    urgent: [

    ],
    health: [
        
    ]
});

module.exports = mongoose.model('GoalModel', GoalSchema);
