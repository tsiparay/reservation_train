const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billetSchema = new Schema({
      "identificationbillet": {
        "type": "string",
        "unique": true,
        "required": true
      },
      "isreserve": {
        "type": "boolean",
        "required": true
      },
      "isconsome": {
        "type": "boolean",
        "required": true
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("billet",billetSchema);
