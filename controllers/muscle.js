const MuscleModel = require('../models/muscle');
const UserModel = require('../models/user');

const OK = 200; 
const CREATED = 201; 
const BAD_REQUEST = 400; 
const NOT_FOUND = 403;
const UNAUTHORIZED = 401;
const SERVER_ERROR = 500; 

const MuscleController = {

    async postMuscle(req, res) {
        try {
            const user = await UserModel.find({
                _id: req.user._id
            }, function(err, item) {
                res.status(OK).send(item);
            });

            if (!user) {
                res.status(UNAUTHORIZED).json({success: false, msg: 'No user under this account'});
            }

            await MuscleModel.create({
                name: name,
                description: description,
                schedule: req.body.days
            }, (error, muscle) => 
            {
            if (error){
                console.log(error);
            } else {
            UserModel.findOneAndUpdate({ _id: req.user._id },{ $push: {muscles: muscle} },
                function(error, success) {
                    if (error) {
                        res.status(BAD_REQUEST).json({msg: 'Error has occured while trying to updating UserModel.'});
                    } else {
                        res.status(CREATED).json({msg: 'UserModel has been updated.'})
                    }
                }
            )}
          })
        } catch (error) {
            console.log(error);
            res.status(SERVER_ERROR).send({success: false, msg: 'Unauthorized, y tho.'});
        }
    },

    async findMuscle(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            }, function(err, item) {
                res.status(OK).send(item);
            });
            await MuscleModel.find({'_id': { $in: user.muscles } }, 
            function (error, foundMuscle) {
                if(error){
                    res.status(BAD_REQUEST).json({error: error});
                } else {
                    res.status(OK).send(foundMuscle);
                }
            });
            console.log(muscles);
        } catch (error) {
            res.status(SERVER_ERROR).send({success: false, msg: 'Failed to get Gainz plan by id.'});
        }
    },

    async getMuscle(req, res) {
        try {  
            const user = await UserModel.findOne({
                _id: req.user._id
            });
            res.status(OK).send(user.muscles);
        } catch (error) {
            res.status(SERVER_ERROR).send({success: false, msg: 'Failed to get Gainz'});
        }
    },

    async deleteMuscle(req, res) {
        try {
            const user = await UserModel.findOne({
                username: res.params.username
            });
            if (!user) {
                res.status(BAD_REQUEST).json({success: false, msg: 'No user under this account'});
            } else {
                user.muscles.splice(user.muscles.indexOf(req.params.id), 1);
                MuscleModel.findOneAndDelete({ _id: req.params.id }, (err, deletedMuscle) => {
                  if (err) {
                    console.log(err);
                    } else {
                    console.log(deletedMuscle._id);
                    }
                });
                user.save();
                res.status(OK).json({msg: 'Muscle has been deleted by Id from User.'});
            }
        } catch (error) {
            res.status(SERVER_ERROR).json({success: false, msg: 'Failed to delete Gainz plan.'});
        }
    }
};

export default MuscleController;
