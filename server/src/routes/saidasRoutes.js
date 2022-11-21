const express = require('express');
const saidasControllers = require('../controllers/saidasControllers');

const router = express.Router();

router.get('/', saidasControllers.getAllSaidas);
router.post('/', saidasControllers.addNewSaida);

module.exports = router;