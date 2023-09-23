import express from "express";
import { body } from "express-validator";
import { getAll, addOnce, getOnce, putOnce } from "../controllers/player.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
   //body("age").isInt({ min: 18, max: 100 }),
   body("password").isLength({min:5,max:20}),
    addOnce
    
  );

router
  .route("/:id")
  .get(getOnce)
  .put(
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    //body("age").isInt({ min: 18, max: 100 }),
    
    getOnce
  );

export default router;
