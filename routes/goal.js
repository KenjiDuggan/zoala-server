import GoalController from "../controllers/goal";
import passport from 'passport';
import express from 'express';
require('../config/passport')(passport);
const GoalRouter = express.Router();

GoalRouter.post("/", passport.authenticate('jwt', { session: false}), GoalController.postGoal);
GoalRouter.get("/", passport.authenticate('jwt', { session: false}), GoalController.getGoal);
GoalRouter.get("/:id", passport.authenticate('jwt', { session: false}), GoalController.findGoal);
GoalRouter.delete("/Goal/:user/:id", passport.authenticate('jwt', { session: false}), GoalController.deleteGoal);

export {GoalRouter};
