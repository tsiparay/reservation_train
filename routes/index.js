const express = require('express');
const utilisateurRoutes = require('./utilisateur-routes');
const villeRoutes = require('./ville-routes');
const busavecsiege = require('./busavecsiege-routes');
const billet = require('./billet-routes');
const reservation = require('./reservation-routes');
const router = express.Router();

router.use('/', utilisateurRoutes);
router.use('/', villeRoutes);
router.use('/', busavecsiege);
router.use('/', billet);
router.use('/', reservation);

module.exports = router;
