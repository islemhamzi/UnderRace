import { validationResult } from "express-validator";

import Track from "../models/track.js";

export function getAll(req, res) {
  Track.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          id: docs[i]._id,
          name: docs[i].name,
          description: docs[i].description,
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
    Track.create({
      name: req.body.name,
      description: req.body.description,
     // image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    })
      .then((newTrack) => {
        res.status(200).json({
          name: newTrack.name,
          description: newTrack.description,
          image: newTrack.image,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
  Game.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newTrack = {};
  if(req.file == undefined) {
    newTrack = {
      name: req.body.name,
      description: req.body.description
    }
  }
  else {
    newTrack = {
      name: req.body.name,
      description: req.body.description,
     // image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
    }
  }
  Track.findByIdAndUpdate(req.params.id, newTrack)
    .then((doc1) => {
      Track.findById(req.params.id)
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