const jwt = require("jsonwebtoken");
const utilisateur = require("../controllers/utilisateur-controller");
const config = require("../config/app");

const authenticate = (req, res, next) => {
    const authorization = req.headers["authorization"];
    if (authorization) {
        const token = authorization.replace("Bearer ", "").replace("bearer ", "");
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            console.log("the decoded",decoded);
            if (decoded) {
            //     return res.status(200).send({ message: "Authentication effectué avec succèss", profile: decoded });
            // }
                req.utilisateur = decoded;
                return next();
            }
        } catch (e) {}
    }else{
        try {
            return res.status(401).send({ error: "Unauthorized", message: "Authentication failed (token). authorization" });
        } catch (e) {}
    }
};

module.exports = authenticate;
