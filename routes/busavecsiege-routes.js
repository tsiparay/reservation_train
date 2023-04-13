const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const busavecsiegeController = require('../controllers/busavecsiege-controller');
const authenticate = require('../middleware/authorize');

  /**
 * @swagger
 * /api/busavecsieges:
 *  get:
 *    description: Get all busavecsieges from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: busavecsieges fetched successfully.
 */
router.get('/busavecsieges',authenticate, busavecsiegeController.getbusavecsieges);


/**
 * @swagger
 * /api/busavecsiege:
 *  post:
 *    description: Use to add busavecsiege in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add busavecsiege
 *        description: Add busavecsiege in DB.
 *        schema:
 *          type: object
 *          required:
 *            - immatriculation
 *            - nombresiege_sanschauffeur
 *            - placeoccupe
 *          properties:
 *            immatriculation:
 *              type: string
 *            nombresiege_sanschauffeur:
 *              type: Number
 *            placeoccupe:
 *              type: Number
 *    responses:
 *      '200':
 *        description: busavecsiege added successfully.
 */
router.post('/busavecsiege',authenticate, [
    check('immatriculation').trim().isLength({min:1}),
    check('nombresiege_sanschauffeur').trim().isLength({min:1}),
    check('placeoccupe').trim().isLength({min:1}),
],busavecsiegeController.postbusavecsiege);

 /**
 * @swagger
 * /api/busavecsiege/{busavecsiegeId}:
 *  put:
 *    description: Used to update busavecsiege in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: busavecsiegeId
 *      - in: body
 *        name: Update busavecsiege
 *        description: Update busavecsiege in DB.
 *        schema:
 *          type: object
 *          required:
 *          properties:
 *          immatriculation:
 *            type: string
 *          nombresiege_sanschauffeur:
 *            type: Number
 *          placeoccupe:
 *            type: Number
 *    responses:
 *      '200':
 *        description: busavecsiege item updated successfully.
 */
router.put('/busavecsiege/:busavecsiegeId', authenticate, busavecsiegeController.updatebusavecsiege);
/**
 * @swagger
 * /api/busavecsiege/{busavecsiegeId}:
 *  delete:
 *    description: Removes busavecsiege item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: busavecsiegeId
 *        description: Remove busavecsiege Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - immatriculation
 *            - nombresiege_sanschauffeur
 *            - placeoccupe
 *          properties:
 *            busavecsiegeId:
 *              type: string
 *    responses:
 *      '200':
 *        description: busavecsiege removed successfully.
 */





router.delete('/busavecsiege/:busavecsiegeId', authenticate, busavecsiegeController.deletebusavecsiege);


module.exports = router;  
