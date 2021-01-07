require('dotenv').config();
const express = require('express');
const sendMail = require('./mail');

const app = express();
const path = require('path');
const router = express.Router();


// Configuring our data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.post('/email', (req, res) => {
    // res.sendFile(path.join(__dirname + '/contact-us.html'));
    //TODO
    //send email here
    const { firstName, userPhone, userEmail, userMessage } = req.body;
    console.log('Data: ', req.body);

    sendMail(firstName, userPhone, userEmail, userMessage, function (err, data) {
        if (err) {
            res.status(500).send({
                type: 'error',
                text: 'Email could not been sent, please try again later.',
            });
        } else {
            res.status(200).send({
                type: 'sucess',
                text: 'Email has been sent!',
            });
        }
    });
});

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router);
app.use(express.static(__dirname + '/public'));

app.listen(process.env.port || 3000);


console.log('Server is running correctly ...');

