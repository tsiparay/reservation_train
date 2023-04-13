const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const busavecsiegeModel = require('../models/busavecsiege');

exports.getbusavecsieges = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 30;
    return busavecsiegeModel.find()
        .countDocuments()
        .then(count => {
            console.log({ count });
            busavecsiegeModel.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .then(busavecsieges => {
                    res.status(200).json({
                        message: "busavecsieges fetched",
                        busavecsieges: busavecsieges,
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



exports.postbusavecsiege = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    
    const immatriculation = req.body.immatriculation;
    const nombresiege_sanschauffeur = req.body.nombresiege_sanschauffeur;
    const placeoccupe = req.body.placeoccupe;

    busavecsiegeModel.findOne({
        immatriculation: req.body.immatriculation
    }).then((immatriculation)=> {
        if(immatriculation){
             res.status(401).json({ message: 'Immatriculation is already existed.' });
           //  return;
        }
    }).then(()=>{
        let busavecsiege0 = new busavecsiegeModel({
            immatriculation,
            nombresiege_sanschauffeur,
            placeoccupe
        });
        busavecsiege0.save()
            .then(result => {
                res.status(200).json({
                    message: "busavecsiege Added Successfully!",
                })
            })
            .catch(err => {
                console.log(err)
            })
    }).catch((err)=>{

    });


};

exports.updatebusavecsiege = (req, res, next) => {
    busavecsiegeModel.findByIdAndUpdate(
        req.params.busavecsiegeId,
        req.body,
        { new: true },
    ).then(busavecsiege => {
        if (!busavecsiege) {
            const error = new Error("No busavecsiege Found");
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({
            message: "busavecsiege Item updated succesfully",
            busavecsiege: busavecsiege
        })
    }).catch(err => {
        console.log(err);

        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

};

exports.deletebusavecsiege = (req, res, next) => {
    const busavecsiegeId = req.params.busavecsiegeId;
    console.log(busavecsiegeId)
    busavecsiegeModel.findByIdAndRemove(busavecsiegeId).then((value)=> {
        res.status(200).json({
            message: "busavecsiege deleted succesfully",
        })
    }).catch((err)=>{
      //  if (err) return next(err);
    })
};
