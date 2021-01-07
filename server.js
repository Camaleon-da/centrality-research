const express = require('express');
const sendMail = require('public/js/mail');

const app = express();
const path = require('path');
const router = express.Router();


// Configuring our data parsing
app.use(express.urlencoded({
    extend: false
}));
app.use(express.json());
app.post('/email', (req, res) => {
    // res.sendFile(path.join(__dirname + '/contact-us.html'));
    //TODO
    //send email here
    const { name, subject, email, text } = req.body;
    console.log('Data: ', req.body);

    sendMail(name, email, subject, text, function (err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error' });
        } else {
            res.status({ message: 'Email sent!!!' });
        }
    });
    // res.json({ message: 'Message received!!!' })
});

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router);
app.use(express.static(__dirname + '/public'));

app.listen(process.env.port || 3000);


console.log('Server is running correctly ...');

