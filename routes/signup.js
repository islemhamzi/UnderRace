import express from 'express';
import { body } from 'express-validator';

import Player from '../models/player.js';

const router = express.Router();

// Signup route
router.post('/sign', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').notEmpty().isLength({ min: 6 }),

], (req, res) => {
  const { name, email, password } = req.body;

  // Check if the player already exists with the specified email in the database
  Player.findOne({ email })
    .then((existingPlayer) => {
      if (existingPlayer) {
        // If the player already exists, return an error response
        return res.status(409).json({ error: 'Player already exists' });
      }

      // If the player doesn't exist, create a new player object and save it to the database
      const player = new Player({
        name,
        email,
        password,
      });

      return player.save();
    })
    .then((newPlayer) => {
      // If the player was successfully created, return a success response with the player data
      res.status(201).json({
        idP: newPlayer.idP,
        name: newPlayer.name,
        email: newPlayer.email,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

export default router;
