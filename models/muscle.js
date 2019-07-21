import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

export default mongoose.model('MuscleModel', MuscleSchema);
