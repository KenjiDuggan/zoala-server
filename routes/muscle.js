import MuscleController from "../controllers/muscle";
import passport from 'passport';
import express from 'express';
require('../config/passport')(passport);
const MuscleRouter = express.Router();

MuscleRouter.post("/", passport.authenticate('jwt', { session: false}), MuscleController.createMuscle);
MuscleRouter.get("/", passport.authenticate('jwt', { session: false}), MuscleController.readAllMuscle);
MuscleRouter.get("/:id", passport.authenticate('jwt', { session: false}), MuscleController.readMuscle);
MuscleRouter.put("/:id", passport.authenticate('jwt', { session: false}), MuscleController.updateMuscle);
MuscleRouter.delete("/:id", passport.authenticate('jwt', { session: false}), MuscleController.deleteMuscle);

export {MuscleRouter};
