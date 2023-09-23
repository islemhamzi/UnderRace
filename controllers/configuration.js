import { validationResult } from "express-validator";

import Configuration from "../models/configuration.js";

export function getAll(req, res) {
  Configuration.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          soundC: docs[i].soundC,
          langueC: docs[i].langueC,
          settingsC: docs[i].settingsC,
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
    Configuration.create({
      soundC: req.body.soundC,
      langueC: req.body.langueC,
      settingsC: req.body.settingsC,
     
      //image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    })
      .then((newConfiguration) => {
        res.status(200).json({
          soundC: newConfiguration.soundC,
          langueC: newConfiguration.langueC,
          settingsC: newConfiguration.settingsC,
          
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
  Configuration.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newConfiguration = {};
  if(req.file == undefined) {
    newConfiguration = {
      soundC: req.body.soundC,
      langueC: req.body.langueC,
      settingsC: req.body.settingsC,
     
    }
  }
  else {
    newConfiguration = {
      soundC: req.body.soundC,
      langueC: req.body.langueC,
      settingsC: req.body.settingsC,
      
    }
  }
  Configuration.findByIdAndUpdate(req.params.id, newConfiguration)
    .then((doc1) => {
      Configuration.findById(req.params.id)
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
