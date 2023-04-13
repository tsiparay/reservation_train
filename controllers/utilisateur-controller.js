const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const utilisateurModel = require('../models/utilisateur');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/app');


exports.getUtilisateurs = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 6;
    return utilisateurModel.find()
        .countDocuments()
        .then(count => {
            console.log({ count });
            utilisateurModel.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .then(utilisateurs => {
                    res.status(200).json({
                        message: "utilisateurs fetched",
                        utilisateurs: utilisateurs,
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


exports.sign_in = function(req, res) {
    utilisateurModel.findOne({
        email: req.body.email
    }).then((utilisateur)=> {
        if (!utilisateur || !utilisateur.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid utilisateur or password.' });
        }
        // exp: Math.floor(Date.now() / 1000) + config.jwtExpire,
        return res.json({ token: jwt.sign({ email: utilisateur.email, nom: utilisateur.nom, prenom: utilisateur.prenom, _id: utilisateur._id }, config.jwtSecret) });
    }).catch((err)=>{
     //   if (err) throw err;
    });
};

exports.loginRequired = function(req, res, next) {
    if (req.utilisateur) {
        next();
    } else {

        return res.status(401).json({ message: 'Unauthorized utilisateur!!' });
    }
};

exports.postUtilisateur = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    utilisateurModel.findOne({
        email: req.body.email
    }).then((utilisateur)=> {
        if (utilisateur ) {
            return res.status(401).json({ message: 'E-mail is already existed.' });
        }
    }).catch((err)=>{
        //if (err) throw err;
    });
    
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const addresse = req.body.addresse;
    const status = req.body.status;
    const hash_password = bcrypt.hashSync(req.body.password, 10);

    const utilisateur = new utilisateurModel({
        nom,
        prenom,
        email,
        addresse,
        status,
        hash_password
    });
    utilisateur.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Utilisateur Added Successfully!",
            })
        })
        .catch(err => {
            console.log(err)
        })
};

exports.updateUtilisateur = (req, res, next) => {
    const data = req.body;
    data.hash_password = req.body.password;
    data.password = undefined;

    //DELETE data.password;
    utilisateurModel.findByIdAndUpdate(
        req.params.utilisateurId,
        req.body,
        { new: true },
    ).then(utilisateur => {
        if (!utilisateur) {
            const error = new Error("No utilisateur Found");
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({
            message: "Utilisateur Item updated succesfully",
            utilisateur: utilisateur
        })
    }).catch(err => {
        console.log(err);

        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

};

exports.deleteUtilisateur = (req, res, next) => {
    const utilisateurId = req.params.utilisateurId;

    utilisateurModel.findByIdAndRemove(utilisateurId).then((value)=> {
        res.status(200).json({
            message: "Utilisateur deleted succesfully",
        })
    }).catch((err)=>{
      //  if (err) return next(err);
    })
};
