const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur-controller');
const authenticate = require('../middleware/authorize');

/**
 * @swagger
 * /api/utilisateurs:
 *  get:
 *    description: Get all utilisateurs from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: utilisateurs fetched successfully.
 */
router.get('/utilisateurs',authenticate, utilisateurController.getUtilisateurs);

/**
 * @swagger
 * /api/utilisateur:
 *  post:
 *    description: Use to add utilisateur in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add utilisateur
 *        description: Add utilisateur in DB.
 *        schema:
 *          type: object
 *          required:
 *            - nom
 *            - prenom
 *            - email
 *            - addresse
 *            - status
 *            - password
 *          properties:
 *            nom:
 *              type: string
 *            prenom:
 *              type: string
 *            email:
 *              type: string
 *            addresse:
 *              type: string
 *            status:
 *              type: boolean
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: utilisateur added successfully.
 */
router.post('/utilisateur',[
    check('nom').trim().isLength({min:1}),
    check('prenom').trim().isLength({min:1}),
    check('email').trim().isLength({min:1}),
    check('addresse').trim().isLength({min:1}),
    check('status').trim().isLength({min:1}),
    check('password').trim().isLength({min:1})
],utilisateurController.postUtilisateur);


/**
 * @swagger
 * /api/signin:
 *  post:
 *    description: Use to authenticate
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Use to authenticate
 *        description: Use to authenticate.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: authentication.
 */
router.post('/signin',[
    check('email').trim().isLength({min:1}),
    check('password').trim().isLength({min:1})
],utilisateurController.sign_in);


/**
 * @swagger
 * /api/utilisateur/{utilisateurId}:
 *  put:
 *    description: Used to update utilisateur in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: utilisateurId
 *      - in: body
 *        name: Update Utilisateur
 *        description: Update utilisateur in DB.
 *        schema:
 *          type: object
 *          required:
 *          properties:
 *          nom:
 *            type: string
 *          prenom:
 *            type: string
 *          email:
 *            type: string
 *          addresse:
 *            type: string
 *          status:
 *            type: boolean
 *          password:
 *            type: string
 *    responses:
 *      '200':
 *        description: Utilisateur item updated successfully.
 */

router.put('/utilisateur/:utilisateurId',authenticate, utilisateurController.updateUtilisateur);


/**
 * @swagger
 * /api/utilisateur/{utilisateurId}:
 *  delete:
 *    description: Removes utilisateur item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: utilisateurId
 *        description: Remove Utilisateur Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - utilisateurId
 *          properties:
 *            utilisateurId:
 *              type: string
 *    responses:
 *      '200':
 *        description: Utilisateur removed successfully.
 */


router.delete('/utilisateur/:utilisateurId',authenticate, utilisateurController.deleteUtilisateur);


module.exports = router;
