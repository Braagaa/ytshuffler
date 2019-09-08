const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

const {shuffler} = require('./routes/');

const app = express();

app.set('env', process.env.NODE_ENV || 'DEV');
app.set('port', process.env.PORT || '3001');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/shuffler', shuffler);

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'DEV' ? err : {};

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
