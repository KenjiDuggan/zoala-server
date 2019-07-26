import MuscleController from "../controllers/muscle";
import passport from 'passport';
import express from 'express';
require('../config/passport')(passport);
const MuscleRouter = express.Router();

MuscleRouter.post("/", passport.authenticate('jwt', { session: false}), MuscleController.postMuscle);
MuscleRouter.get("/", passport.authenticate('jwt', { session: false}), MuscleController.getMuscle);
MuscleRouter.get("/:id", passport.authenticate('jwt', { session: false}), MuscleController.findMuscle);
MuscleRouter.delete("/muscle/:user/:id", passport.authenticate('jwt', { session: false}), MuscleController.deleteMuscle);

export {MuscleRouter};