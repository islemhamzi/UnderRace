import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const configurationSchema = new Schema(
    {
        soundC: {
            type: Number,
            required: true
        },
        langueC: {
            type: String,
            required: true
        },
        settingsC: {
            type: String,
            required: true
        },
     
    },
    {
        timestamps: true
    }
);

export default model('Configuration', configurationSchema);