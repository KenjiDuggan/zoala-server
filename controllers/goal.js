
const GoalModel = require('../models/goal');
const UserModel = require('../models/user');

const OK = 200; 
const CREATED = 201; 
const BAD_REQUEST = 400; 
const NOT_FOUND = 403;
const SERVER_ERROR = 500; 

const GoalController = {

    async postGoal(req, res) {
        try {
            const user = await UserModel.find({
                _id: req.user._id
            });
            
            if (!user) {
                res.status(NOT_FOUND).end({success: false, msg: 'No user under this account'});
            }
            await GoalModel.create({
                dailie: req.body.dailie,
                urgent: req.body.urgent,
                ongoing: req.body.ongoing,
                health: req.body.health
            }, (error, goal) => 
            {
            if (error){
                console.log(error);
            } else {
            UserModel.findOneAndUpdate({ _id: req.user._id },{ $push: {goals: goal} },
                function(error, success) {
                    if (error) {
                        res.status(BAD_REQUEST).end({msg: 'Error has occured while trying to updating UserModel.'});
                    } else {
                        res.status(CREATED).end({msg: 'UserModel has been updated.'})
                    }
                }
            )}
          })
        } catch (error) {
            console.log(error);
            res.status(SERVER_ERROR).end({success: false, msg: 'Something went wrong.'});
        }
    },

    async findGoal(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            }, function(err, item) {
                res.status(OK).end(item);
            });
            await GoalModel.find({'_id': { $in: user.goals } }, 
            function (error, foundGoal) {
                if(error){
                    res.status(BAD_REQUEST).end({error: error});
                } else {
                    res.status(OK).end(foundGoal);
                }
            });
            console.log(foundGoals);
        } catch (error) {
            res.status(SERVER_ERROR).end({success: false, msg: 'Failed to get Goals plan by id.'});
        }
    },

    async getGoal(req, res) {
        try {  
            const user = await UserModel.findOne({
                _id: req.user._id
            });
            res.status(OK).end(user.goals);
        } catch (error) {
            res.status(SERVER_ERROR).end({success: false, msg: 'Failed to get goals'});
        }
    },

    async deleteGoal(req, res) {
        try {
            const user = await UserModel.findOne({
                username: res.params.username
            });
            if (!user) {
                res.status(NOT_FOUND).end({success: false, msg: 'No user under this account'});
            } else {
                user.goals.splice(user.goals.indexOf(req.params.id), 1);
                GoalModel.findOneAndDelete({ _id: req.params.id }, (err, deletedGoal) => {
                  if (err) {
                    console.log(err);
                    } else {
                    console.log(deletedGoal._id);
                    }
                });
                user.save();
                res.status(OK).end({msg: 'Goal has been deleted by Id from User.'});
            }
        } catch (error) {
            res.status(SERVER_ERROR).end({success: false, msg: 'Failed to delete Goals plan.'});
        }
    }
};

export default GoalController;