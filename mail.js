const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'testcc1704@gmail.com',
        pass: '0123321Aa',
    },
});

const sendMail = (firstName, userPhone, userEmail, userMessage, cb) => {
    console.log(firstName, userPhone, userEmail, userMessage);
    const mailOptions = {
        sender: firstName,
        from: userEmail,
        to: 'testcc1704@gmail.com',
        subject: 'You have recieved a message from Centrality Research Website',
        text: `${userMessage} --- Phone number registered ${userPhone}`,
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

// Exporting the sendmail
module.exports = sendMail;