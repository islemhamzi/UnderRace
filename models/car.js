import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const carSchema = new Schema(
    {
        idC: {
            type: Number,
            required: true
        },
        color : {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
     
    },
    {
        timestamps: true
    }
);

export default model('Car', carSchema);