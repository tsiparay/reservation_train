const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const villeModel = require('../models/ville');

exports.getvilles = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 6;
    return villeModel.find()
        .countDocuments()
        .then(count => {
            console.log({ count });
            villeModel.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .then(villes => {
                    res.status(200).json({
                        message: "villes fetched",
                        villes: villes,
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



exports.postville = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    
    const nom = req.body.nom;
    const ville = new villeModel({
        nom
    });
    ville.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "ville Added Successfully!",
            })
        })
        .catch(err => {
            console.log(err)
        })
};

exports.updateville = (req, res, next) => {
    villeModel.findByIdAndUpdate(
        req.params.villeId,
        req.body,
        { new: true },
    ).then(ville => {
        if (!ville) {
            const error = new Error("No ville Found");
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({
            message: "ville Item updated succesfully",
            ville: ville
        })
    }).catch(err => {
        console.log(err);

        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

};

exports.deleteville = (req, res, next) => {
    const villeId = req.params.villeId;
    villeModel.findByIdAndRemove(villeId).then((value)=> {
            res.status(200).json({
                message: "ville deleted succesfully"
            })
        }).catch((err)=>{
      //  if (err) return next(err);
    })
};
