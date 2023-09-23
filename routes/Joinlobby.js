import express, { response } from 'express';
import { body } from 'express-validator';

import Lobby from '../models/lobby.js';
import Player from '../models/player.js';

const router = express.Router();

// POST route for adding a player to a lobby by lobby name
router.post('/', async (req, res) => {
  
  // Find the player by name
  const player = await Player.findOne({ name: req.body.name });
 

  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }

  // Find the lobby by name
  let lobby;
  try {
    lobby = await Lobby.findOne({ lobbyname: req.body.lobbyname });
    
    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // Check if the player is already in the lobby
  if (lobby.players.includes(player.name)) {
    return res.status(400).json({ message: 'Player is already in the lobby' });
  }

  // Add the player to the lobby's players list
  lobby.players.push(player.name);

  try {
    const updatedLobby = await lobby.save();
    res.status(200).json(updatedLobby);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
