const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const phpExpress = require('php-express')({
    binPath: 'php'
});

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router);
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');
app.all(/.+\.php$/, phpExpress.router);

app.listen(process.env.port || 3000);


console.log('Server is running correctly ...');

