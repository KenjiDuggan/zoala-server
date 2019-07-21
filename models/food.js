import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var FoodSchema = new Schema({
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

export default mongoose.model('FoodModel', FoodSchema);
