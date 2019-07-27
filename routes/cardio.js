import CardioController from "../controllers/Cardio";
import passport from 'passport';
import express from 'express';
require('../config/passport')(passport);
const CardioRouter = express.Router();

CardioRouter.post("/", passport.authenticate('jwt', { session: false}), CardioController.postCardio);
CardioRouter.get("/", passport.authenticate('jwt', { session: false}), CardioController.getCardio);
CardioRouter.get("/:id", passport.authenticate('jwt', { session: false}), CardioController.findCardio);
CardioRouter.delete("/Cardio/:user/:id", passport.authenticate('jwt', { session: false}), CardioController.deleteCardio);

export {CardioRouter};
