const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = (firstName, userPhone, userEmail, userMessage, cb) => {
    console.log(firstName, userPhone, userEmail, userMessage);
    const mailOptions = {
        sender: firstName,
        from: userEmail,
        to: process.env.EMAIL_USER,
        subject: 'You have recieved a message from Centrality Research Website',
        text: `Message sent by ${firstName} (${userEmail})
            ________________________________________________
            ${userMessage} \n 
            Phone number registered ${userPhone}.

            Recieved from centralityresearch.com!
        `,
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