var path = require('path');
const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');

// configure env
config();

const app = express();

// add cors middleware
app.use(cors());

app.use(express.static('dist'));

// setup express body-perser for json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// endpoint to handle app request
app.post('/nlp', (req, res) => {});

// endpoint to serve page
app.get('/', (req, res) => {
	res.sendFile('dist/index.html');
});

// server port, using 5000 or env during production
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
