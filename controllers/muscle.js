const MuscleModel = require('../models/muscle');
const UserModel = require('../models/user');

const MuscleController = {

    async postMuscle(req, res) {
        try {
            let name, description;

            if (req.body.name == "")
                name = "N/A";
            else
                name = req.body.name;

            if (req.body.description == "")
                description = "N/A";
            else
                description = req.body.description;

            console.log(req.body);

            const user = await UserModel.find({
                username: req.user.username
            }, function(err, item) {
                res.send(item);
            });

            if (!user) {
                res.json({success: false, msg: 'No user under this account'});
            }

            await MuscleModel.create({
                name: name,
                description: description,
                schedule: req.body.days
            }, (error, muscle) => {
                if (error){
                    console.log(error);
                } else {
                UserModel.findOneAndUpdate(
                    {_id: req.user._id},
                    {$push: {muscles: muscle}},
                    function(error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    }
                )
                console.log(muscle);
                }
            })
        } catch (error) {
            console.log(error);
            res.status(403).send({success: false, msg: 'Unauthorized, y tho.'});
        }
    },

    async findMuscle(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            });

            const muscles = await MuscleModel.find({'_id': { $in: user.muscles } }, function (error, foundMuscle) {
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
            console.log(req);
            const user = await UserModel.findOne({
                _id: req.user._id
            });

            res.send(user.muscles);
        } catch (error) {
            console.log(error);
            res.status(403).send({success: false, msg: 'Failed to get Gainz'});
        }
    },

    async deleteMuscle(req, res) {
        try {
            const user = await UserModel.findOne({
                username: res.params.username
            });

            if (!user) {
                console.log("User not found");
            } else {
                console.log(user.muscles);
                console.log(req.params.id);
                user.muscles.splice(user.muscles.indexOf(req.params.id), 1);
                console.log(user.muscles);
                MuscleModel.findOneAndDelete({ _id: req.params.id }, (err, deletedMuscle) => {
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

export default MuscleController;
