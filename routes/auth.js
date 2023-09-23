import express from 'express';
import { body } from 'express-validator';

import Player from '../models/player.js';

const router = express.Router();

// Login route
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),

], (req, res) => {
  const { email, password } = req.body;

  // Find the player with the specified email in the database
  Player.findOne({ email })
    .then((player) => {
      if (!player) {
        // If the player doesn't exist, return an error response
        return res.status(404).json({ error: 'Player not found' });
      }

      // If the player exists, compare the password with the one stored in the database
      if (password !== player.password) {
        // If the passwords don't match, return an error response
        return res.status(401).json({ error: 'Invalid password' });
      }

      // If the passwords match, return a success response with the player data
      res.status(200).json({
        idP: player.idP,
        name: player.name,
        email: player.email,
        
        
      });
      
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

export default router;
