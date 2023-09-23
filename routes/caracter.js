import express from "express";
import { body } from "express-validator";

import multer from "../middlewares/multer-config.js";

import { getAll, addOnce, getOnce, putOnce } from "../controllers/caracter.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
  
    body("nameC").isLength({ min: 5 }),
  
    addOnce
  );

router
  .route("/:id")
  .get(getOnce)
  .put(
    
    body("nameC").isLength({ min: 5 }),
   
  );

export default router;
