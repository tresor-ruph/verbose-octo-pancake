const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
// const hbs = require('nodemailer-express-handlebars')
dotenv.config()

module.exports = {


    send: (destEmail,token) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: destEmail,
            subject: 'email confirmation',
            html: `<a href='http://localhost:8000/api/confirmEmail/${token}' >confirm mail</a>`
        };
        // transporter.use('compile', hbs({
        //     viewEngine: 'express-handlebars',
        //     viewPath: '/serveur/helper/nodemailer/views/'
        // }))

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('email sent ')
            }
        })
    }
}

