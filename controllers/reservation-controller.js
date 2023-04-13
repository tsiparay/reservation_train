
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const reservationModel = require('../models/reservation');
const busavecsiegeModel = require('../models/busavecsiege');
const utilisateurModel = require('../models/utilisateur');
const villeModel = require('../models/ville');
const billetModel = require('../models/billet');
const { sendmail } = require('../middleware/emailService');

exports.getreservations = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 30;
    return reservationModel.find()
        .countDocuments()
        .then(count => {
            console.log({ count });
            reservationModel.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .then(reservations => {
                    res.status(200).json({
                        message: "reservations fetched",
                        reservations: reservations,
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





exports.postreservation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    const id_villedepart = req.body.id_villedepart;
    const id_villearrive = req.body.id_villearrive;
    const placereserve = req.body.placereserve;
    const id_bus = req.body.id_bus;
    const id_utilisateur = req.body.id_utilisateur;


    let data = {};
    //utilisateurmodel
    //villedepartmodel
    //villearrivemodel
    //busmodel
    utilisateurModel.findOne({
        _id: id_utilisateur
    }).then((utilisateur)=> {
        data.utilisateur = utilisateur;
        villeModel.findOne({
            _id: id_villedepart
        }).then((villedepart)=> {
            data.villedepart = villedepart;
            villeModel.findOne({
                _id: id_villearrive
            }).then((villearrive)=> {
                data.villearrive = villearrive;
                busavecsiegeModel.findOne({
                    _id: id_bus
                }).then((bus)=> {
                    if( placereserve <= 0){
                        res.status(401).json({ message: 'your number of places is not correct.' });
                    }else if(bus.nombresiege_sanschauffeur === bus.placeoccupe && bus.nombresiege_sanschauffeur !== 0){
                        res.status(401).json({ message: 'Please choice another bus on this traject. This bus has no vacants seats.' });
                    }else if(placereserve + bus.placeoccupe > bus.nombresiege_sanschauffeur){
                        const placelibre = bus.nombresiege_sanschauffeur - bus.placeoccupe;
                        res.status(401).json({ message: 'Please choice another bus on this traject. this bus is almost full, there are only' + placelibre + ' seats left.' });
                    }else{
                        data.bus = {...bus._doc, placeoccupe: bus.placeoccupe + placereserve};
                    }
                }).then(()=>{

                    billetModel.find({
                        isreserve: false
                    }).limit(placereserve).then(async (billets)=> {
                        const newbillets = await billets.map( item => {
                                console.log('item',item)
                                const newbillet = {...item._doc, isreserve:true};
                                const msi =     billetModel.findOneAndUpdate(
                                       item.identificationbillet,
                                       newbillet,
                                       { new: false },
                                   );
                                console.log('findOneAndUpdate not work', msi);
                            return msi._update;
                        });
                         await newbillets.map( async item => {
                            const newbillet = {...item, isreserve:true};
                            const msi =   await  billetModel.findByIdAndUpdate(
                                item._id,
                                newbillet,
                                { new: false },
                            );
                            //return msi._update;
                        });
                        data.billets = newbillets;
                        let reservation0 = new reservationModel(data);
                        reservation0.save()
                            .then(result => {

                                //*********************************send mail
                                var text = "<b> Salut " + data.utilisateur.prenom + "</b> Vous venez d'éfféctuer une reservation de train sur l'app test Mario</b>  ";
                                var subject = "Reservation de train";
                                const sendmailpromise = sendmail(data.utilisateur.email, subject, text);
                                if (sendmailpromise) {
                                    res.status(200).json({
                                        message: "reservation Added Successfully!, e-mail de confirmation envoyé",
                                        reservation: data
                                    })
                                } else {
                                    res.json({
                                        status: "ERROR", message: "une erreur s'est produit lors de l'envoie du mail",
                                    });
                                }
                                //*********************************send mail

                            })
                            .catch(err => {
                                console.log(err)
                            })
                    });

                }).catch((err)=>{ });
            })
        }).catch((err)=>null);
    }).catch((err)=>null);

};

exports.updatereservation = async (req, res, next) => {

    let newbillets = [];
        for await (let item of req.body.billets){

        const msi =  await billetModel.findOneAndUpdate(
            {_id: item.id_billet},
            {$set : { isreserve:false}},
            {new: true}
        );
        console.log('new billets',msi);
        await newbillets.push(msi);
    }
    reservationModel.findByIdAndUpdate(
        req.params.reservationId,
        {billets: newbillets},
        { new: true },
    ).then(reservation => {
        if (!reservation) {
            const error = new Error("No reservation Found");
            error.statusCode = 404;
            throw error
        }

        //*********************************send mail
        var text = "<b> Salut " + reservation.utilisateur.prenom + "</b> Vous venez d'annuler votre reservation de train sur l'app test Mario</b>  ";
        var subject = "Reservation de train";
        const sendmailpromise = sendmail(reservation.utilisateur.email, subject, text);
        if (sendmailpromise) {
            res.status(200).json({
                message: "reservation annulé avec succèss, e-mail de confirmation envoyé.",
                reservation: reservation
            })
        } else {
            res.json({
                status: "ERROR", message: "une erreur s'est produit lors de l'envoie du mail",
            });
        }
        //*********************************send mail

    }).catch(err => {
        console.log(err);

        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

};

exports.deletereservation = (req, res, next) => {
    const reservationId = req.params.reservationId;
    console.log(reservationId)
    reservationModel.findByIdAndRemove(reservationId).then((value)=> {
        res.status(200).json({
            message: "reservation deleted succesfully",
        })
    }).catch((err)=>{
        //  if (err) return next(err);
    })
};




exports.recherchebillet_byvilledepart_villearrive = (req, res, next) => {
    const id_villedepart = req.body.id_villedepart;
    const id_villearrive = req.body.id_villearrive;


    console.log('id_villedepart',id_villedepart);

    res.status(200).json({
        message: "reservation recherché succesfully",
    })
};




exports.recherchebillet_bybillet = (req, res, next) => {



    res.status(200).json({
        message: "reservation recherché succesfully",
    })

};
