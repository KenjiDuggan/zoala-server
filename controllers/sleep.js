const SleepModel = require('../models/sleep');
const UserModel = require('../models/user');

const SleepController = {

    async postSleep(req, res) {
        try {

            const user = await UserModel.find({
                _id: req.user._id
            }, function(err, item) {
                res.send(item);
            });

            if (!user) {
                res.json({success: false, msg: 'No user under this account'});
            }

            await SleepModel.create({
                schedule: req.body.day
            }, (error, Sleep) => {
                if (error){
                    console.log(error);
                } else {
                UserModel.findOneAndUpdate(
                    {_id: req.user._id},
                    {$push: {sleeps: sleep}},
                    function(error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    }
                )
                console.log(sleep);
                }
            })
        } catch (error) {
            console.log(error);
            res.status(403).send({success: false, msg: 'Unauthorized, y tho.'});
        }
    },

    async findSleep(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            });

            const sleeps = await SleepModel.find({'_id': { $in: user.sleeps } }, function (error, foundSleep) {
                if(error){
                    console.log(error);
                } else {
                    res.send(foundSleep);
                }
            });
        } catch (error) {
            res.status(403).send({success: false, msg: 'Failed to get Gainz plan by id.'});
        }
    },

    async getSleep(req, res) {
        try {  
            console.log(req);
            const user = await UserModel.findOne({
                _id: req.user._id
            });

            res.send(user.sleeps);
        } catch (error) {
            console.log(error);
            res.status(403).send({success: false, msg: 'Failed to get Gainz'});
        }
    },

    async deleteSleep(req, res) {
        try {
            const user = await UserModel.findOne({
                username: res.params.username
            });

            if (!user) {
                console.log("User not found");
            } else {
                console.log(user.sleeps);
                console.log(req.params.id);
                user.Sleeps.splice(user.sleeps.indexOf(req.params.id), 1);
                console.log(user.Sleeps);
                SleepModel.findOneAndDelete({ _id: req.params.id }, (err, deletedSleep) => {
                  if (err) {
                    console.log(err);
                    } else {
                    console.log(deletedSleep._id);
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

export default SleepController;
