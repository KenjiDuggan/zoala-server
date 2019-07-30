import FoodController from "../controllers/food.js";
import passport from 'passport';
import express from 'express';
require('../config/passport')(passport);
const FoodRouter = express.Router();

FoodRouter.post("/", passport.authenticate('jwt', { session: false}), FoodController.postFood);
FoodRouter.get("/", passport.authenticate('jwt', { session: false}), FoodController.getFood);
FoodRouter.get("/:id", passport.authenticate('jwt', { session: false}), FoodController.findFood);
FoodRouter.delete("/food/:user/:id", passport.authenticate('jwt', { session: false}), FoodController.deleteFood);

export {FoodRouter};
