import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const caracterSchema = new Schema(
    {
        nameC: {
            type: String,
            required: true
        },
    
     
    },
    {
        timestamps: true
    }
);

export default model('Caracter', caracterSchema);