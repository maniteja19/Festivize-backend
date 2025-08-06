const express = require('express');
const { createYear, getYears, updateYearStatus } = require('../controllers/yearController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');
const router = express.Router();

router.get('/years', authMiddleware, getYears);
router.post('/years', authMiddleware,authorizeRole('admin'), createYear);
router.put('/years/:year/status', authMiddleware,authorizeRole('admin'), updateYearStatus);

module.exports = router;
