const express = require('express');
const { registration, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register',registration);
router.post('/login', login)

module.exports = router;