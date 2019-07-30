const SleepModel = require('../models/sleep');
const UserModel = require('../models/user');

const OK = 200; 
const CREATED = 201; 
const BAD_REQUEST = 400; 
const NOT_FOUND = 403;
const SERVER_ERROR = 500; 

const SleepController = {

    async postSleep(req, res) {
        try {

            const user = await UserModel.find({
                _id: req.user._id
            }, function(err, item) {
                res.status(OK).send(item);
            });

            if (!user) {
                res.status(NOT_FOUND).json({success: false, msg: 'No user under this account'});
            }

            await SleepModel.create({
                schedule: req.body.hours
            }, (error, sleep) => {
                if (error){
                    console.log(error);
                } else {
                UserModel.findOneAndUpdate( {_id: req.user._id}, {$push: {sleeps: sleep}},
                    function(error, success) {
                        if (error) {
                            res.status(BAD_REQUEST).json({msg: 'Error has occured while trying to update User.'});
                        } else {
                            res.status(CREATED).json({msg: 'UserModel has been updated.'});
                        }
                    }
                )
                console.log(sleep);
                }
            })
        } catch (error) {
            console.log(error);
            res.status(SERVER_ERROR).send({success: false, msg: 'Something does not work.'});
        }
    },

    async findSleep(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            });

            await SleepModel.find({'_id': { $in: user.sleeps } }, function (error, foundSleep) {
                if(error){
                    res.status(BAD_REQUEST).json({error: error});
                } else {
                    res.status(OK).send(foundSleep);
                }
            });
            console.log(sleeps);
        } catch (error) {
            res.status(SERVER_ERROR).send({success: false, msg: 'Failed to get Gainz plan by id.'});
        }
    },

    async getSleep(req, res) {
        try {  
            const user = await UserModel.findOne({
                _id: req.user._id
            });
            res.status(OK).send(user.sleeps);
        } catch (error) {
            res.status(SERVER_ERROR).send({success: false, msg: 'Failed to get Gainz'});
        }
    },

    async deleteSleep(req, res) {
        try {
            const user = await UserModel.findOne({
                username: res.params.username
            });
            if (!user) {
                res.status(NOT_FOUND).json({success: false, msg: 'No user under this account'});
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
            res.status(SERVER_ERROR).send({success: false, msg: 'Failed to delete Gainz plan.'});
        }
    }
};

export default SleepController;
