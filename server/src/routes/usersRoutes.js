const express = require('express');
const usersControllers = require('../controllers/usersControllers');

const router = express.Router();

router.get('/:username', usersControllers.getUserByUsername);

module.exports = router;