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
                username: req.body.username
            });

            if (!user) {
                res.status(UNAUTHORIZED).send({success: true, msg: 'Successful created new Cardio under current user.'});
            }

            await CardioModel.create({
                name: req.body.name,
                description: req.body.description,
                schedule: req.body.days
            }, (error, cardio) => {
                if (error){
                    console.log(error);
                } else {
                UserModel.findOneAndUpdate( {_id: req.user._id}, {$push: {cardios: cardio}},
                        function(error, success) {
                            if (error) {
                                res.status(BAD_REQUEST).send({msg: 'Error has occured.'});
                                console.log(error);
                            } else {
                                res.status(CREATED).send({msg: 'Usermodel has been updated.'});
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
            });

            await CardioModel.find({'_id': { $in: user.cardios } }, function (error, foundCardio) {
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
                username: req.user.username
            });
            res.status(OK).send({ cardios: user.cardios });
        } catch (error) {
            res.status(BAD_REQUEST).send({success: false, msg: 'Failed to get Gainz'});
        }
    },

    async deleteCardio(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.user.username
            });
            let id = req.params.id
            if (!user) {
                res.status(BAD_REQUEST).json({success: false, msg: 'No user under this account'});
            } else {
                user.cardios.splice(id, 1);
                CardioModel.findOneAndDelete({ _id: id }, (err, deletedCardio) => {
                  if (err) {
                    console.log(err);
                    } else {
                    console.log(deletedCardio);
                    }
                });
                user.save();
                res.status(OK).json({msg: 'Cardio has been deleted by Id from User.'});
            }

        } catch (error) {
            res.status(SERVER_ERROR).send({success: false, msg: 'Failed to delete Cardio plan.'});
        }
    }
};

export default CardioController;
