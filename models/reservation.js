const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
      "villedepart": {
        "type": "object",
        "required": true
      },
      "villearrive": {
        "type": "object",
        "required": true
      },
       "billets" : { "type" : Array ,"required": true, "default" : [] },
        "bus": {
        "type": "object",
        "required": true
      },
      "utilisateur": {
        "type": "object",
        "required": true
      },
    },
    { timestamps: true }
)

module.exports = mongoose.model("reservation",reservationSchema);
