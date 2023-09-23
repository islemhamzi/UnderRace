import express from 'express';
import { body } from 'express-validator';

import Lobby from '../models/lobby.js';
import Player from '../models/player.js';

const router = express.Router();

// GET route for all lobbies
router.get('/', async (req, res) => {
  try {
    const lobbies = await Lobby.find();
    res.json(lobbies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route for creating a new lobby
router.post('/', async (req, res) => {
  // Find the player by name
  const player = await Player.findOne({ name: req.body.creator });

  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }

  const lobby = new Lobby({
    creator: player._id,
    players: req.body.players,
    lobbyname: req.body.lobbyname
  });

  try {
    const newLobby = await lobby.save();
    res.status(201).json(newLobby);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET route for a specific lobby
router.get('/:id', getLobby, (req, res) => {
  res.json(res.lobby);
});

// DELETE route for deleting a lobby
router.delete('/:id', getLobby, async (req, res) => {
  try {
    await res.lobby.remove();
    res.json({ message: 'Lobby deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware function to get a lobby by ID
async function getLobby(req, res, next) {
  let lobby;
  try {
    lobby = await Lobby.findById(req.params.id).populate('players');
    if (lobby == null) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.lobby = lobby;
  next();
}

export default router;
