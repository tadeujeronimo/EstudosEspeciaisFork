const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./src/routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

module.exports = app;
