import FoodModel from '../models/food.js';
import UserModel from'../models/user.js';

const OK = 200; 
const CREATED = 201; 
const BAD_REQUEST = 400; 
const NOT_FOUND = 403;
const SERVER_ERROR = 500; 

const FoodController = {

    async postFood(req, res) {
        try {
            const user = await UserModel.findOne({
                email: req.body.email
            });

            if (!user) {
                res.status(NOT_FOUND).end({success: true, msg: 'Successful created new Food under current user.'});
            }
            await FoodModel.create({
                name: req.body.name,
                description: req.body.description,
                schedule: req.body.meals
            }, (error, food) => {
                if (error){
                    console.log(error);
                } else {
                UserModel.findOneAndUpdate( {_id: req.user._id}, {$push: {foods: food}},
                    function(error, success) {
                        if (error) {
                            res.status(BAD_REQUEST).end({msg: 'Error has occured.'});
                            console.log(error);
                        } else {
                            res.status(CREATED).end({msg: 'Usermodel has been updated.'});
                            console.log(success);
                        }
                    }
                )}
            })
        } catch (error) {
            res.status(SERVER_ERROR).end({success: false, msg: 'Unauthorized.'});
        }
    },

    async findFood(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            }, function(err, item) {
                res.status(OK).end(item);
            });
            await FoodModel.find({'_id': { $in: user.foods } }, function (error, foundFood) {
                if(error){
                    res.status(BAD_REQUEST).end({error: error});
                } else {
                    res.status(OK).end(foundFood);
                }
            });
             } catch (error) { 
            res.status(SERVER_ERROR).end({success: false, msg: 'Failed to get Gainz plan by id.'});
        }
    },

    async getFood(req, res) {
        try {  
            const user = await UserModel.findOne({
                username: req.user.username
            });
            res.status(OK).send({ foods: user.foods });
        } catch (error) {
            res.status(BAD_REQUEST).end({success: false, msg: 'Failed to get Gainz'});
        }
    },

    async deleteFood(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.params.username
            });
            if (!user) {
                res.status(NOT_FOUND).end({success: false, msg: 'No user under this account'});
            } else {
                let id = req.params.id
                user.foods.splice(id, 1);
                FoodModel.findOneAndDelete({_id: id}, (err, deletedFood) => {
                  if (err) {
                    console.log(err);
                    } else {
                    console.log(deletedFood);
                    }
                });
                user.save();
                res.status(OK).end({msg: 'Food has been deleted by Id from User.'});
            }

        } catch (error) {
            res.status(SERVER_ERROR).end({success: false, msg: 'Failed to delete Food plan.'});
        }
    }
};

export default FoodController;
