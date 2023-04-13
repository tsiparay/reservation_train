const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const villeSchema = new Schema({
      "nom": {
        "type": "string",
        "required": true,
          "unique": true,
          "trim": true
      },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Ville",villeSchema);
