const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const reservationController = require('../controllers/reservation-controller');
const authenticate = require('../middleware/authorize');

/**
 * @swagger
 * /api/reservations:
 *  get:
 *    description: Get all reservations from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: reservations fetched successfully.
 */
router.get('/reservations',authenticate, reservationController.getreservations);


/**
 * @swagger
 * /api/reservation:
 *  post:
 *    description: Use to add reservation in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add reservation
 *        description: Add reservation in DB.
 *        schema:
 *          type: object
 *          required:
 *           - id_villedepart
 *           - id_villearrive
 *           - placereserve
 *           - id_bus
 *           - id_utilisateur
 *          properties:
 *           id_villedepart:
 *            type: string
 *           id_villearrive:
 *            type: string
 *           placereserve:
 *            type: number
 *           id_bus:
 *            type: string
 *           id_utilisateur:
 *            type: string
 *    responses:
 *      '200':
 *        description: reservation added successfully.
 */

router.post('/reservation',authenticate, [],reservationController.postreservation);


/**
 * @swagger
 * /api/reservation/{reservationId}:
 *  put:
 *    description: Use to add reservation in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: reservationId
 *      - in: body
 *        name: Add reservation
 *        description: Add reservation in DB.
 *        schema:
 *          type: object
 *          required:
 *           - billets
 *          properties:
 *           billets:
 *            type: "ArrayOfObject [ {id_billet: xxx}]"
 *    responses:
 *      '200':
 *        description: reservation added successfully.
 */

router.put('/reservation/:reservationId', authenticate, reservationController.updatereservation);


/**
 * @swagger
 * /api/reservation/{reservationId}:
 *  delete:
 *    description: Removes reservation item from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: reservationId
 *      - in: body
 *        name: remove reservation
 *        description: Removes reservation item from DB.
 *        schema:
 *          type: object
 *          required:
 *           - reservationId
 *          properties:
 *           reservationId:
 *            type: string
 *    responses:
 *      '200':
 *        description: recherche successfully.
 */
router.delete('/reservation/:reservationId', authenticate, reservationController.deletereservation);



/**
 * @swagger
 * /api/recherche:
 *  post:
 *    description: rechercher billets sur trajets
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: rechercher
 *        description: rechercher billets sur trajets
 *        schema:
 *          type: object
 *          required:
 *           - id_villedepart
 *           - id_villearrive
 *          properties:
 *           id_villedepart:
 *            type: string
 *           id_villearrive:
 *            type: string
 *    responses:
 *      '200':
 *        description: recherche successfully.
 */
router.post('/recherche', authenticate, reservationController.recherchebillet_byvilledepart_villearrive);



/**
 * @swagger
 * /api/rechercheparbillet:
 *  post:
 *    description: rechercher billets sur trajets
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: rechercher
 *        description: rechercher par billet sur trajets
 *        schema:
 *          type: object
 *          required:
 *           - identificationbillet
 *          properties:
 *           identificationbillet:
 *            type: string
 *    responses:
 *      '200':
 *        description: recherche successfully.
 */
router.post('/rechercheparbillet', authenticate, reservationController.recherchebillet_bybillet);

module.exports = router;
