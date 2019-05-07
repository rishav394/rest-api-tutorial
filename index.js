const express = require('express');
const apiRoute = require('./routes/api');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
	'mongodb://localhost/rest-api-tut',
	{
		useNewUrlParser: true,
	},
	(err) => {
		if (!err) {
			console.log('Connected to mongodb');
		}
	},
);
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', apiRoute);
app.use((err, req, res, next) => {
	res.status(422);
	res.send({
		error: err.message,
	});
});

app.get('/', (req, res) => {
	res.sendStatus(200);
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('App listening on port ' + port + '!');
});
