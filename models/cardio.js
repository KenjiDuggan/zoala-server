import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

export default mongoose.model('CardioModel', CardioSchema);
