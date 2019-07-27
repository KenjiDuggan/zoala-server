import CardioModel from '../models/cardio';
import UserModel from'../models/user';

const OK = 200; 
const CREATED = 201; 
const BAD_REQUEST = 400; 
const UNAUTHORIZED = 401;
const SERVER_ERROR = 500; 

const CardioController = {

    async postCardio(req, res) {
        try {
            const user = await UserModel.findOne({
                _id: req.user._id
            }, function(err, item) {
                res.status(OK).send(item);
            });

            if (!user) {
                res.status(UNAUTHORIZED).json({success: true, msg: 'Successful created new Cardio under current user.'});
            }

            await CardioModel.create({
                name: name,
                description: description,
                schedule: req.body.days
            }, (error, cardio) => {
                if (error){
                    console.log(error);
                } else {
                UserModel.findOneAndUpdate( {_id: req.user._id}, {$push: {cardios: cardio}},
                        function(error, success) {
                            if (error) {
                                res.status().json({msg: 'Error has occured.'});
                                console.log(error);
                            } else {
                                res.status().json({msg: 'Usermodel has been updated.'});
                                console.log(success);
                            }
                        }
                )}
            })
        } catch (error) {
            res.status(SERVER_ERROR).send({success: false, msg: 'Unauthorized.'});
        }
    },

    async findCardio(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            }, function(err, item) {
                res.status(OK).send(item);
            });
            await CardioModel.find({'_id': { $in: user.Cardios } }, function (error, foundCardio) {
                if(error){
                    res.status(BAD_REQUEST).send({error: error});
                } else {
                    res.status(OK).send(foundCardio);
                }
            });
        } catch (error) {
            res.status(SERVER_ERROR).send({success: false, msg: 'Failed to get Gainz plan by id.'});
        }
    },

    async getCardio(req, res) {
        try {  
            const user = await UserModel.findOne({
                _id: req.user._id
            });
            res.status(OK).send(user.Cardios);
        } catch (error) {
            res.status(BAD_REQUEST).send({success: false, msg: 'Failed to get Gainz'});
        }
    },

    async deleteCardio(req, res) {
        try {
            const user = await UserModel.findOne({
                username: res.params.username
            });

            if (!user) {
                res.status(BAD_REQUEST).json({success: false, msg: 'No user under this account'});
            } else {
                console.log(user.Cardios);
                console.log(req.params.id);
                user.Cardios.splice(user.Cardios.indexOf(req.params.id), 1);
                console.log(user.Cardios);
                CardioModel.findOneAndDelete({ _id: req.params.id }, (err, deletedCardio) => {
                  if (err) {
                    console.log(err);
                    } else {
                    console.log(deletedCardio._id);
                    }
                });
                user.save();
                res.status(OK).json({msg: 'Cardio has been deleted by Id from User.'});
            }

        } catch (error) {
            res.status(403).send({success: false, msg: 'Failed to delete Cardio plan.'});
        }
    }
};

export default CardioController;
