const express = require('express');
const app = express();
const cors = require('cors');
const { validateAuthorization } = require('./middlewares/validateAuthorization');
const usersRoutes = require('./routes/usersRoutes');
const fabricantesRoutes = require('./routes/fabricantesRoutes');
const mercadoriasRoutes = require('./routes/mercadoriasRoutes');

app.use(cors());
app.use(express.json());
app.use(validateAuthorization);

app.use('/usuarios', usersRoutes);
app.use('/fabricantes', fabricantesRoutes);
app.use('/mercadorias', mercadoriasRoutes);

module.exports = app;