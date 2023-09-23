import { validationResult } from "express-validator";

import Caracter from "../models/caracter.js";



export function getAll(req, res) {
  Caracter.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          nameC: docs[i].nameC,
         
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
    Caracter.create({
      
      nameC: req.body.nameC,
      
      
      //image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    })
      .then((newcaracter) => {
        res.status(200).json({
         
          nameC: newcaracter.nameC,
         
          
         // image: newGame.image,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
  Caracter.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newcaracter = {};
  if(req.file == undefined) {
    newcaracter = {
      
      nameC: req.body.nameC,
      
     
    }
  }
  else {
    newcaracter = {
     
      nameC: req.body.nameC,
     
      
      //image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
    }
  }
  caracter.findByIdAndUpdate(req.params.id, newcaracter)
    .then((doc1) => {
      caracter.findById(req.params.id)
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
