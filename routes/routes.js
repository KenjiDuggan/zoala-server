
const user = require("../controllers/user");
const muscle = require("../controllers/muscle");
const passport = require('passport');
require('../config/passport')(passport);

module.exports = (app) => {
    app.post("/register", user.register);
    app.post("/login", user.login);
    app.post("/muscle", passport.authenticate('jwt', { session: false}), muscle.postMuscle);
    app.get("/:id", passport.authenticate('jwt', { session: false}), muscle.findMuscle);
    app.get("/muscle/:id", passport.authenticate('jwt', { session: false}), muscle.getMuscle);
    app.delete("/muscle/:user/:id", passport.authenticate('jwt', { session: false}), muscle.deleteMuscle);
};
