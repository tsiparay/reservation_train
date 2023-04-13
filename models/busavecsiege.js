const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busavecsiegeSchema = new Schema({
      "immatriculation": {
        "type": "string",
          "unique": true,
          "trim": true,
        "required": true
      },
      "nombresiege_sanschauffeur": {
        "type": "Number",
        "required": true
      },
      "placeoccupe": {
            "type": "Number",
            "required": true
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("busavecsiege",busavecsiegeSchema);
