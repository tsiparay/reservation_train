const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const billetController = require('../controllers/billet-controller');
const authenticate = require('../middleware/authorize');

  /**
 * @swagger
 * /api/billets:
 *  get:
 *    description: Get all billets from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: billets fetched successfully.
 */
router.get('/billets',authenticate, billetController.getbillets);


/**
 * @swagger
 * /api/billet:
 *  post:
 *    description: Use to add billet in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add 10 billet
 *        description: Add 10 billet in DB.
 *        schema:
 *          type: object
 *          required:
 *          properties:
 *    responses:
 *      '200':
 *        description: billet added successfully.
 */
router.post('/billet',authenticate, [],billetController.postbillet);



/**
 * @swagger
 * /api/billet/{billetId}:
 *  put:
 *    description: Use to add billet in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: billetId
 *      - in: body
 *        name: Update billet
 *        description: Update billet in DB.
 *        schema:
 *          type: object
 *          required:
 *            - identificationbillet
 *            - isreserve
 *            - isconsome
 *          properties:
 *            identificationbillet:
 *              type: string
 *            isreserve:
 *              type: boolean
 *            isconsome:
 *              type: boolean
 *    responses:
 *      '200':
 *        description: billet added successfully.
 */
router.put('/billet/:billetId', authenticate, billetController.updatebillet);


/**
 * @swagger
 * /api/billet/{billetId}:
 *  delete:
 *    description: Removes billet item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: billetId
 *        description: Remove billet Item from DB.
 *        schema:
 *          type: string
 *          required:
 *          properties:
 *    responses:
 *      '200':
 *        description: billet removed successfully.
 */

router.delete('/billet/:billetId', authenticate, billetController.deletebillet);


module.exports = router;  
