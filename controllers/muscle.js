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
                username: req.user.username
            }, function(err, item) {
                res.status(OK).send(item);
            });
            if (!user) {
                res.status(NOT_FOUND).send({success: false, msg: 'No user under this account'});
            }
            await MuscleModel.create({
                name: req.body.name,
                description: req.body.description,
                schedule: req.body.days
            }, (error, muscle) => {
            if (error){
                console.log(error);
            } else {
            UserModel.findOneAndUpdate({ _id: req.user._id },{ $push: { muscles: muscle } },
                function(error, success) {
                    if (error) {
                        res.status(BAD_REQUEST).send({msg: 'Error has occured while trying to updating UserModel.'});
                    } else {
                        res.status(CREATED).end();
                    }
                }
            )}
          })
        } catch (error) {
            res.status(SERVER_ERROR).send({success: false, msg: 'Unauthorized, y tho.'});
        }
    },

    async findMuscle(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.user.username
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
                username: req.user.username
            });
            res.status(OK).send({ muscles: user.muscles });
        } catch (error) {
            res.status(SERVER_ERROR).send({success: false, msg: 'Failed to get Gainz'});
        }
    },

    async deleteMuscle(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.user.username
            });
            let id = req.params.id
            if (!user) {
                res.status(NOT_FOUND).json({success: false, msg: 'No user under this account'});
            } else {
                user.muscles.splice(id, 1);
                MuscleModel.findOneAndUpdate({ _id: id }, (err, deleteMuscle) => {
                  if (err) {
                    console.log(err);
                    } else {
                    console.log(deleteMuscle);
                    }
                });
                user.save();
                res.status(OK).json({msg: 'Muscle has been deleted by Id from User.'});
            }
            // let id = req.params.id;
            // UserModel.findOneAndUpdate(query, {$pull: {"muscles": {"_id": id}}}, function(err, data){
            //     if(err){
            //         return res.status(500).json({'error' : 'error in deleting address'});
            //     }
            //     res.json(data);
            // })
        } catch (error) {
            console.log(error);
            console.log(res.params.id)
            res.status(SERVER_ERROR).json({success: false, msg: 'Failed to delete Gainz plan.'});
        }
    }
};

export default MuscleController;
