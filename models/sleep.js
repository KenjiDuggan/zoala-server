import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var SleepSchema = new Schema({
    schedule: [

    ],
});

module.exports = mongoose.model('SleepModel', SleepSchema);
