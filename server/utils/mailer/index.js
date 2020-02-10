const nodemailer = require('nodemailer');
const path = require('path');
const {baseUrl} = require('../express-functions');

const emailTemplate = url => `
<!DOCTYPE html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
	<style>
		.wrapper {
			background: #f06d54;
			font-family: 'Raleway', sans-serif;
			max-width: 90%;
			margin: 3em auto;
			padding: 2em 0;
			color: white;
		}

		header {
			padding: 2em 0;
			display: flex;
			justify-content: center;
			margin-bottom: 3em;
		}

		h1 {
			display: inline;
			margin: 0;
			text-align: center;
			font-size: 5em;
			align-self: flex-end;
			margin-bottom: 10px;
		}

		a {
			text-decoration: underline;
			display: inherit;
			cursor: pointer;
		}

		.message {
			font-size: 1.5em;
			text-align: center;
			margin-bottom: 1em;
		}
	</style>
</head>
<body>
	<div style="background-color: #f06d54; font-family: 'Raleway', sans-serif; max-width: 90%; margin: 3em auto; padding: 2em 0; color: white;">
		<header>
			<img style="display: block; margin: 0 auto 2em;" src="cid:titleeltit@ytshuffler.com"/>
		</header>
		<div style="font-size: 1.2em; padding: 20px; text-align: center; margin-bottom: 1em;" class="message">Click on the link to complete your registration to YTShuffler. You have 24 hours to complete your registration. If time expires, you may reregister again with the same email.</div>
		<a href="${url}" style="font-size: 1.5em; text-align: center; margin-bottom: 1em; text-decoration: underline; display: inherit; cursor: pointer;">Click here!</a>
	</div>
</body>`;

const config = {
	service: "hotmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD
	}
};

const sendRegistrationEmail = (req, email) => jwt => {
	const transporter = nodemailer.createTransport(config);
	const regUrl = (baseUrl(req) + '/auth/register/confirm/' + jwt);
	return transporter.sendMail({
		to: email,
		subject: 'Registration',
		html: emailTemplate(regUrl),
		attachments: [{
			filename: 'title.png',
			path: path.join(__dirname, 'title.png'),
			cid: 'titleeltit@ytshuffler.com'
		}]
	});
};

module.exports = {sendRegistrationEmail};
