
import UserController from "../controllers/user";
import passport from 'passport';
import express from 'express';
require('../config/passport')(passport);
const UserRouter = express.Router();

UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);
UserRouter.get("/me", UserController.me);

export {UserRouter};
