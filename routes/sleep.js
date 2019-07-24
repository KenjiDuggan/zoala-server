import SleepController from "../controllers/sleep";
import passport from 'passport';
import express from 'express';
require('../config/passport')(passport);
const SleepRouter = express.Router();

SleepRouter.post("/", passport.authenticate('jwt', { session: false}), SleepController.postSleep);
SleepRouter.get("/", passport.authenticate('jwt', { session: false}), SleepController.getSleep);
SleepRouter.get("/:id", passport.authenticate('jwt', { session: false}), SleepController.findSleep);
SleepRouter.delete("/sleep/:user/:id", passport.authenticate('jwt', { session: false}), SleepController.deleteSleep);

export {SleepRouter};