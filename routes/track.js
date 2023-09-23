import express from "express";
import { body } from "express-validator";

import multer from "../middlewares/multer-config.js";

import { getAll, addOnce, getOnce, putOnce } from "../controllers/track.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
    multer("image", 5 * 1024 * 1024),
    body("name").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    addOnce
  );

router
  .route("/:id")
  .get(getOnce)
  .put(
    multer("image", 5 * 1024 * 1024),
    body("name").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    putOnce
  );

export default router;