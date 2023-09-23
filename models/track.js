import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const trackSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }

        //array of users 
    },
    {
        timestamps: true
    }
);

export default model('Track', trackSchema);