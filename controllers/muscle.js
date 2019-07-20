const Muscle = require('../models/muscle');
const User = require('../models/user');

module.exports = {
    async postMuscle(req, res) {
        try {
            let username = req.body.username;
            let name, description;

            if (req.body.name == "")
                name = "N/A";
            else
                name = req.body.name;

            if (req.body.description == "")
                description = "N/A";
            else
                description = req.body.description;

            console.log(req);
            const user = await User.findOne({
                username: username,
            });

            if (!user) {
                res.json({success: true, msg: 'Successful created new Muscle under current user.'});
            }

            const muscle = await Muscle.create({
                name: name,
                description: description,
                schedule: req.body.schedule
            }, (error, muscle) => {
                if (error){
                    console.log(error);
                } else {

                    console.log(muscle);
                    user.muscles.push(muscle._id);
                    user.save();
                    res.send(muscle);
                }
            })
        } catch (error) {
            res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    },

    async getMusclebyId(req, res) {
        try {
            const user = await User.findOne({
                username: req.params.id
            });

            const muscles = await Muscle.find({'_id': { $in: user.muscles } }, function (error, foundMuscle) {
                if(error){
                    console.log(error);
                } else {
                    res.send(foundMuscle);
                }
            });
        } catch (error) {
            res.status(403).send({success: false, msg: 'Failed to get Gainz plan by id.'});
        }
    },

    async getMuscle(req, res) {
        try {
            const muscle = await Muscle.findOne({
                _id: req.params.id,
            });
            res.send(muscle);
        } catch (error) {
            console.log(error);
            res.status(403).send({success: false, msg: 'Failed to get Gainz plan by id.'});
        }
    },

    async deleteMuscle(req, res) {
        try {
            const user = await User.findOne({
                username: res.params.username
            });

            if (!user) {
                console.log("User not found");
            } else {
                console.log(user.muscles);
                console.log(req.params.id);
                user.muscles.splice(user.muscles.indexOf(req.params.id), 1);
                console.log(user.muscles);
                Workout.findOneAndDelete({ _id: req.params.id }, (err, deletedMuscle) => {
                  if (err) {
                    console.log(err);
                    } else {
                    console.log(deletedMuscle._id);
                    }
                });
                user.save();
                res.send();
            }

        } catch (error) {
            res.status(403).send({success: false, msg: 'Failed to delete Gainz plan.'});
        }
    }
};
