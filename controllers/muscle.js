const MuscleModel = require('../models/muscle');
const UserModel = require('../models/user');

const OK = 200; 
const CREATED = 201; 
const BAD_REQUEST = 400; 
const NOT_FOUND = 403;
const SERVER_ERROR = 500; 

const MuscleController = {

    async postMuscle(req, res) {
        try {
            const user = await UserModel.find({
                _id: req.user._id
            }, function(err, item) {
                res.status(OK).end(item);
            });
            if (!user) {
                res.status(NOT_FOUND).end({success: false, msg: 'No user under this account'});
            }
            await MuscleModel.create({
                name: req.body.name,
                description: req.body.description,
                schedule: req.body.days
            }, (error, muscle) => {
            if (error){
                console.log(error);
            } else {
            console.log(muscle)
            console.log(req.user._id) 
            UserModel.findOneAndUpdate({ _id: req.user._id },{ $push: { muscles: muscle } },
                function(error, success) {
                    if (error) {
                        res.status(BAD_REQUEST).end({msg: 'Error has occured while trying to updating UserModel.'});
                    } else {
                        res.status(CREATED).end({msg: 'UserModel has been updated.'});
                    }
                }
            )}
          })
        } catch (error) {
            res.status(SERVER_ERROR).end({success: false, msg: 'Unauthorized, y tho.'});
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
            console.log(user);
            console.log(user.muscles);
            res.status(OK).send({ muscles: user.muscles });
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
                res.status(NOT_FOUND).json({success: false, msg: 'No user under this account'});
            } else {
                user.muscles.splice(user.muscles.indexOf(req.data.id), 1);
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
