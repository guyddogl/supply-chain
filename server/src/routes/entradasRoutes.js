const express = require('express');
const entradasControllers = require('../controllers/entradasControllers');

const router = express.Router();

router.get('/', entradasControllers.getAllEntradas);
router.post('/', entradasControllers.addNewEntrada);

module.exports = router;