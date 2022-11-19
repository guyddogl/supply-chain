const express = require('express');
const app = express();
const cors = require('cors');
const { validateAuthorization } = require('./middlewares/validateAuthorization');
const usersRoutes = require('./routes/usersRoutes');

app.use(cors());
app.use(express.json());
app.use(validateAuthorization);

app.use('/usuarios', usersRoutes);

module.exports = app;