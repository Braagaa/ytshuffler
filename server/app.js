const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const mongoose = require('mongoose');

const {youtube, shuffler, auth, users} = require('./routes/');

const app = express();
const db = mongoose.connect(
	process.env.REACT_APP_DB_URL, 
	{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
)
	.then(() => console.log('DataBase connected!'));

app.set('env', process.env.NODE_ENV || 'DEV');
app.set('port', process.env.PORT || '3001');
app.set('maxSongs', process.env.REACT_APP_MAX_NUMBER_SONGS || 100);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/youtube', youtube);
app.use('/shuffler', shuffler);
app.use('/auth', auth);
app.use('/users', users);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'DEV' ? err : {};
	console.log(err);
	res.status(err.status || 500);
	res.json({error: {
		errors: err.errors || [],
		code: err.status,
		message: err.message
	}});
});

app.listen(app.get('port'), () => 
	console.log(`Server listening at port: ${app.get('port')}`)
);

module.exports = app;
