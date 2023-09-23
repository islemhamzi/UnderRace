import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const lobbySchema = new Schema({
  creator: {
    type: String,
    ref: 'Player',
    required: true
  },
  lobbyname:{
    type: String,
    required : true
  },
  players: [{
    type: String,
    ref: 'Player',
    required: true
  }]
});
export default model('Lobby', lobbySchema);


