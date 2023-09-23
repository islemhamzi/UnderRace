import express from "express";
import { body } from "express-validator";

import multer from "../middlewares/multer-config.js";

import { getAll, addOnce, getOnce, putOnce } from "../controllers/configuration.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
   // multer("image", 5 * 1024 * 1024),
    body("soundC"),
    body("langueC"),
    body("settingsC"),
  
    addOnce
  );

router
  .route("/:id")
  .get(getOnce)
  .put(
    body("soundC"),
    body("langueC"),
    body("settingsC"),
  
    putOnce
  );

export default router;
