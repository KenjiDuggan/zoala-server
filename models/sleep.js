import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var SleepSchema = new Schema({
    schedule: [
        
    ],
    comment: {
        type: String
    },
    special: [
        
    ]
});

module.exports = mongoose.model('SleepModel', SleepSchema);
