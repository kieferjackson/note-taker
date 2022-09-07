const express = require('require');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);