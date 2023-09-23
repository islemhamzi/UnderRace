import express from "express";
import { body } from "express-validator";

import multer from "../middlewares/multer-config.js";

import { getAll, addOnce, getOnce, putOnce } from "../controllers/car.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
    //multer("image", 5 * 1024 * 1024),
   
    // body("idC").isNumeric(),
    // body("name").isLength({ min: 5 }),
    
    // body("color").isLength({ min: 5 }),
    
    
    addOnce
  );

router
  .route("/:id")
  .get(getOnce)
  .put(
 //   multer("image", 5 * 1024 * 1024),
    body("idC").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
    body("color"),
   
    putOnce
  );

export default router;
