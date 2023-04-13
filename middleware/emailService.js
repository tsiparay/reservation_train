const config = require('../config/app');
const nodemailer = require("nodemailer");
/**
* Fonction permettant d'envoyer des email
* @param req
* @param res
* @returns {*}
*/
async function sendmail(recipient, subject, text) {

    let transporter = nodemailer.createTransport({
        host: config.smtp.host,//"smtp.xxx.com",
        port: config.smtp.port,
        secure: config.smtp.secure, // true for 465, false for other ports eg 587
        auth: {
            user: config.smtp.auth.user,//'gmail.com', // generated ethereal user
            pass: config.smtp.auth.pass,// // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    try {
        let info = await transporter.sendMail({
            // from: '"Email envoi 👻" <foo@example.com>', // sender address
            from: 'Mario<tsiparaymario@gmail.com>', // sender address
            to: recipient,
            subject: subject,
            html: text,
        });

        if(info){
            return Promise.resolve(true);
        }
    } catch (err) {
        console.log(err)
        // callback({status:"ERROR",message: err});
    }
}

module.exports = { sendmail };
