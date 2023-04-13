//require('dotenv').config();
const baseURL = "mongodb://localhost:27017";

config = {
    baseUrl: baseURL,
    jwtSecret: process.env.APP_SECRET || "TESTMARIo",
    smtp: {
        host: "node157-eu.n0c.com",
        port: 465,
        secure: true, // true for 465, false for other ports eg 587
        auth: {
            user: 'elien@axesinnovations.net',
            pass: 'w(K(%%,031FKzFoXXF',
        }
    }

};


module.exports = config;
