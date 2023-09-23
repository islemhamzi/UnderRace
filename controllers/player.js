import { validationResult } from "express-validator";
import Player from "../models/player.js";

export function getAll(req, res) {
  Player.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          idP: docs[i].idP,
          name: docs[i].name,
          email: docs[i].email,
        });
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addOnce(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Player.create({
      idP: req.body.idP,
      name: req.body.name,
      email: req.body.email,
    })
      .then((newPlayer) => {
        res.status(200).json({
          idP: newPlayer.idP,
          name: newPlayer.name,
          email: newPlayer.email,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
  Player.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newPlayer = {
    idP: req.body.idP,
    name: req.body.name,
    email: req.body.email,
  };
  Player.findByIdAndUpdate(req.params.id, newPlayer)
    .then((doc1) => {
      Player.findById(req.params.id)
        .then((doc2) => {
          res.status(200).json(doc2);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
