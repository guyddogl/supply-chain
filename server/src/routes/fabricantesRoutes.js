const express = require('express');
const fabricantesControllers = require('../controllers/fabricantesControllers');

const router = express.Router();

router.get('/', fabricantesControllers.getAllFabricantes);
router.post('/', fabricantesControllers.addNewFabricante);

module.exports = router;