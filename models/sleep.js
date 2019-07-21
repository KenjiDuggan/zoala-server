import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var SleepMuscleSchema = new Schema({

    schedule: [

    ],
});

export default mongoose.model('SleepModel', SleepSchema);
