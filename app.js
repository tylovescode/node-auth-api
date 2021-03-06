const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
	res.json({
		message: 'Welcome to the API'
	});
});

			//verifyToken is middleware function
app.post('/api/posts', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err) {
			res.sendStatus(403);
		} else {
			res.json({
		message: 'Post created',
		authData
		});
	}
	});
});

app.post('/api/login', (req, res) => {
	//Mock user
	const user = {
		id: 1,
		username: 'ty',
		email: 'ty@tymiller.net'
	}

	//Payload, Secret Key, Expires In, Callback -  then returns token to user
	//These options are in jwt documentation
	jwt.sign({user}, 'secretkey', { expiresIn: '3 days' }, (err, token) => {
		res.json({
			token
		});
	});
});

// FORMAT OF TOKEN
//Authorization: Bearer <access_token>


//Verify Token
function verifyToken(req, res, next) {
	//Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	if(typeof bearerHeader !== 'undefined') {
		//Split at the space - see FORMAT OF TOKEN above
		//Turns it into an array [bearer 0, access token 1]
		const bearer = bearerHeader.split(' ');
		//Get token from the split array
		const bearerToken = bearer[1];
		//Set the token
		req.token = bearerToken;
		//Next middleware
		next();
	} else {
		res.sendStatus(403);
	}
}

app.listen(5000, () => console.log('Server started on port 5000'));