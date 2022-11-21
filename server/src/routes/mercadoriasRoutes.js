const express = require('express');
const mercadoriasControllers = require('../controllers/mercadoriasControllers');

const router = express.Router();

router.get('/', mercadoriasControllers.getAllMercadorias);
router.post('/', mercadoriasControllers.addNewMercadoria);

module.exports = router;