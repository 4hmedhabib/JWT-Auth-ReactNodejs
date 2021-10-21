const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = [
	{
		username: 'John',
		title: 'John Post 1'
	},
	{
		username: 'Jane',
		title: 'Jane Post 1'
	}
];

app.post('/signup', (req, res) => {
	res.json(posts);
});

app.post('/login', (req, res) => {
	// Authentication User

	const username = req.body.username;
	const user = { name: username };

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

	res.json(accessToken);
});

app.listen(3000, () => {
	console.log('SERVER RUNNING PORT = ', 3000);
});
