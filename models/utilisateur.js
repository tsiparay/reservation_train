const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const utilisateurSchema = new Schema({
        "nom": {
            "type": "string",
            "trim": true,
            "required": true
        },
        "prenom": {
            "type": "string",
            "trim": true,
            "required": true
        },
        "email": {
            "type": "string",
            "unique": true,
            "lowercase": true,
            "trim": true,
            "required": true
        },
        "addresse": {
            "type": "string",
            "required": true
        },
        "status": {
            "type": "boolean",
            "required": true
        },
        "hash_password": {
            "type": "string"
        },
        //"trajets" : { "type" : Array , "default" : [] }
    },
    { timestamps: true }
);

utilisateurSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};


module.exports = mongoose.model("Utilisateur",utilisateurSchema);
