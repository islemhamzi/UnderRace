import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const playerSchema = new Schema(
    {
        idP: {
            type: Number,
            
        },
        password :{
            type:String,

        },
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
           
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        }
        
    },
    {
        timestamps: true
    }
);

export default model('Player', playerSchema);
