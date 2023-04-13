const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const billetModel = require('../models/billet');

exports.getbillets = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 30;
    return billetModel.find()
        .countDocuments()
        .then(count => {
            console.log({ count });
            billetModel.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .then(billets => {
                    res.status(200).json({
                        message: "billets fetched",
                        billets: billets,
                    })
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err)
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })


};


function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

exports.postbillet = async (req, res, next) => {
    for (let i = 0; i < 10; i++){
        const id10 = makeid(7);
        billetModel.findOne({
            identificationbillet:  id10
        }).then((identificationbillet)=> {
            if(identificationbillet){
                    //  return;
            }
        }).then(()=>{
            let billet0 = new billetModel({
                identificationbillet : id10,
                isreserve : false,
                isconsome : false
            });
            billet0.save()
                .then(result => {

                })
                .catch(err => {
                    console.log(err)
                })
        }).catch((err)=>{   });
    }
    res.status(200).json({
        message: "10 billets created Successfully!",
    })
};

exports.updatebillet = (req, res, next) => {
    billetModel.findByIdAndUpdate(
        req.params.billetId,
        req.body,
        { new: true },
    ).then(billet => {
        if (!billet) {
            const error = new Error("No billet Found");
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({
            message: "billet Item updated succesfully",
            billet: billet
        })
    }).catch(err => {
        console.log(err);

        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

};

exports.deletebillet = (req, res, next) => {
    const billetId = req.params.billetId;
    console.log(billetId)
    billetModel.findByIdAndRemove(billetId).then((value)=> {
        res.status(200).json({
            message: "billet deleted succesfully",
        })
    }).catch((err)=>{
      //  if (err) return next(err);
    })
};
