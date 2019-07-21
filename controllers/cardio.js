import CardioModel from '../models/cardio';
import UserModel from'../models/user';

const CardioController = {

    async postCardio(req, res) {
        try {
            let username = req.body.username;
            let name, description;

            if (req.body.name == "")
                name = "N/A";
            else
                name = req.body.name;

            if (req.body.description == "")
                description = "N/A";
            else
                description = req.body.description;

            console.log(req);
            const user = await UserModel.findOne({
                username: username,
            });

            if (!user) {
                res.json({success: true, msg: 'Successful created new Cardio under current user.'});
            }

            await CardioModel.create({
                name: name,
                description: description,
                schedule: req.body.days
            }, (error, Cardio) => {
                if (error){
                    console.log(error);
                } else {
                UserModel.findOneAndUpdate(
                    {_id: req.user._id},
                    {$push: {Cardios: Cardio}},
                    function(error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    }
                )
                console.log(Cardio);

                }
            })
        } catch (error) {
            res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
    },

    async findCardio(req, res) {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            });

            const Cardios = await CardioModel.find({'_id': { $in: user.Cardios } }, function (error, foundCardio) {
                if(error){
                    console.log(error);
                } else {
                    res.send(foundCardio);
                }
            });
        } catch (error) {
            res.status(403).send({success: false, msg: 'Failed to get Gainz plan by id.'});
        }
    },

    async getCardio(req, res) {
        try {  
            console.log(req);
            const user = await UserModel.findOne({
                _id: req.user._id
            });

            res.send(user.Cardios);
        } catch (error) {
            console.log(error);
            res.status(403).send({success: false, msg: 'Failed to get Gainz'});
        }
    },

    async deleteCardio(req, res) {
        try {
            const user = await UserModel.findOne({
                username: res.params.username
            });

            if (!user) {
                console.log("User not found");
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
                res.send();
            }

        } catch (error) {
            res.status(403).send({success: false, msg: 'Failed to delete Gainz plan.'});
        }
    }
};

export default CardioController;