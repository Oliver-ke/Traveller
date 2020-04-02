var path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

// add cors middleware
app.use(cors());

app.use(express.static('dist'));

// object to hold app data
let projectData = {};

// setup express body-perser for json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// route to get data
app.get('/api/trip', (req, res) => {
	return res.status(200).json(projectData);
});

//route to save data
app.post('/api/trip', (req, res) => {
	const { location, date, userResponse } = req.body;
	const userPayload = { location, date, userResponse };
	projectData = userPayload;
	return res.status(201).json({ message: 'Item added', userResponse });
});

// endpoint to serve page
app.get('/', (req, res) => {
	res.sendFile('dist/index.html');
});

// server port, using 5000 or env during production
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
