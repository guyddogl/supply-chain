const express = require('express');
const app = express();
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes');

app.use(cors());
app.use(express.json());

app.use('/usuarios', usersRoutes);

module.exports = app;