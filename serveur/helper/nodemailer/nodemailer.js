const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
dotenv.config()

module.exports = {


    send: (destEmail,token,username, reset=false) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: destEmail,
            subject: !reset? 'email confirmation' :'reset password',
             template: !reset ? 'index' : "reset",
             context: {
                 username: username,
                 link: token
             }

        };
        transporter.use('compile', hbs({
            viewEngine: {            
             extName:'.handlebars',
            partialsDir:path.resolve(__dirname,"views"),
            defaultLayout: false,
        },
            viewPath: path.resolve(__dirname, "views"),
            extName: ".handlebars"

        }))

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('email sent ')
            }
        })
    }
}

