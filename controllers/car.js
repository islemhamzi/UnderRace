import { validationResult } from "express-validator";
import Car from "../models/car.js";



export function getAll(req, res) {
  Car.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          idC: docs[i].idC,
          name: docs[i].name,
          color: docs[i].color,
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
    Car.create({
      idC: req.body.idC,
      name: req.body.name,
      color: req.body.color,
      
      //image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    })
      .then((newcar) => {
        res.status(200).json({
          idC: newcar.idC,
          name: newcar.name,
          color: newcar.color,
          
         // image: newGame.image,
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
  let newcar = {};
  if(req.file == undefined) {
    newcar = {
      idC: req.body.title,
      name: req.body.name,
      color: req.body.color,
     
    }
  }
  else {
    newcar = {
      idC: req.body.idC,
      name: req.body.name,
      color: req.body.color,
      
      //image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
    }
  }
  car.findByIdAndUpdate(req.params.id, newcar)
    .then((doc1) => {
      car.findById(req.params.id)
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
