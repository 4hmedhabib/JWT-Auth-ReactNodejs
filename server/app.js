require('dotenv').config();

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

const authToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.sendStatus(403);
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(401);
		req.user = user;
		next();
	});
};

const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
};

app.get('/posts', authToken, (req, res) => {
	res.json(posts.filter((post) => post.username === req.user.name));
});

app.post('/login', (req, res) => {
	// Authentication User

	const username = req.body.username;
	const user = { name: username };

	const accessToken = generateAccessToken(user);
	const refreshToken = jwt.sign(user, process.env.REFERESH_TOKEN_SECRET);

	res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.listen(3001, () => {
	console.log('SERVER RUNNING PORT = ', 3001);
});
