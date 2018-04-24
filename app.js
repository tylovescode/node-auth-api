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
	res.json({
		message: 'Post created'
	});
});

app.post('/api/login', (req, res) => {
	//Mock user
	const user = {
		id: 1,
		username: 'ty',
		email: 'ty@tymiller.net'
	}

	//Payload, Secret Key, Callback - returns token to user
	jwt.sign({user}, 'secretkey', (err, token) => {
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

	} else {
		res.sendStatus(403);
	}
}

app.listen(5000, () => console.log('Server started on port 5000'));