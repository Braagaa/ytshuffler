const AWS = require('aws-sdk');
const path = require('path');
const {baseUrl} = require('../express-functions');

AWS.config.update({
	accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
});

const SES = new AWS.SES();

//add picture with a absolute URL in header tag
//maybe from S3 eg https://....
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
	<header>
	</header>
	<div style="background-color: #f06d54; font-family: 'Raleway', sans-serif; max-width: 90%; margin: 3em auto; padding: 2em 0; color: white;">
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
	const regUrl = (baseUrl(req) + '/auth/register/confirm/' + jwt);
	return SES.sendEmail({
		Destination: {
			ToAddresses: [email]
		},
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: emailTemplate(regUrl)
				}
			},
			Subject: {
				Charset: 'UTF-8',
				Data: 'Registration to YTShuffler'
			}
		},
		Source: process.env.EMAIL
	})
		.promise();
};

module.exports = {sendRegistrationEmail};
