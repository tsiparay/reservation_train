const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const villeController = require('../controllers/ville-controller');
const authenticate = require('../middleware/authorize');

  /**
 * @swagger
 * /api/villes:
 *  get:
 *    description: Get all villes from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: villes fetched successfully.
 */
router.get('/villes',authenticate, villeController.getvilles);

/**
 * @swagger
 * /api/ville:
 *  post:
 *    description: Use to add ville in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add ville
 *        description: Add ville in DB.
 *        schema:
 *          type: object
 *          required:
 *            - nom
 *          properties:
 *            nom:
 *              type: string
 *    responses:
 *      '200':
 *        description: ville added successfully.
 */
router.post('/ville', authenticate,[
    check('nom').trim().isLength({min:1}),
],villeController.postville);


 /**
 * @swagger
 * /api/ville/{villeId}:
 *  put:
 *    description: Used to update ville in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: villeId
 *      - in: body
 *        name: Update ville
 *        description: Update ville in DB.
 *        schema:
 *          type: object
 *          required:
 *          properties:
 *          nom:
 *            type: string
 *    responses:
 *      '200':
 *        description: ville item updated successfully.
 */
router.put('/ville/:villeId',authenticate, villeController.updateville);
/**
 * @swagger
 * /api/ville/{villeId}:
 *  delete:
 *    description: Removes ville item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: villeId
 *        description: Remove ville Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - villeId
 *          properties:
 *            villeId:
 *              type: string
 *    responses:
 *      '200':
 *        description: ville removed successfully.
 */





router.delete('/ville/:villeId',authenticate, villeController.deleteville);


module.exports = router;  
