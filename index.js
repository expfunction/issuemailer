const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());

// Read environment variables for SMTP settings from .env file
require('dotenv').config();
// Read environment variables
const APP_PORT = process.env.APP_PORT;
const SMTP_SERVICE = process.env.SMTP_SERVICE;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

// Express
app.post('api/ReportIssue', (req, res) => {
    // Get request properties from request body
    const imagepath = req.body.imagepath,
        userguid = req.body.userguid,
        stationid = req.body.stationid,
        explanation = req.body.explanation,
        iletisime_gecilsin = req.body.iletisime_gecilsin,
        telefon = req.body.telefon,
        mail = req.body.mail;

    // Print on console
    console.log('Imagepath:', imagepath);
    console.log('Userguid:', userguid);
    console.log('Stationid:', stationid);
    console.log('Explanation:', explanation);
    console.log('Iletisime_gecilsin:', iletisime_gecilsin);
    console.log('Telefon:', telefon);
    console.log('Mail:', mail);

    // Create transporter
    let transporter = nodemailer.createTransport({
        service: SMTP_SERVICE,
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    })

    let mailOptions = {
        from: 'support@lixhium.com',
        to: RECIPIENT_EMAIL,
        subject: "Lixhium Support Request",
        text: `Imagepath:${imagepath}\n Userguid: ${userguid}\nStationid: ${stationid}\nExplanation: ${explanation}\nIletisime_gecilsin: ${iletisime_gecilsin}\nTelefon: ${telefon}\nMail: ${mail}`,
    }

    transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email Sent');

            // Close connection
            transporter.close();
        }
    });
    // Send success response
    res.send('Mail sent');
});

// Print on console
console.log('Server is running on port:', APP_PORT);
app.listen(APP_PORT);