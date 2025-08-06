const express = require('express')
const { addExpenditure, getExpenditure, updateExpenditure, deleteExpenditure } = require('../controllers/expenditureController');
const router = express.Router();

router.post('/expenditure', addExpenditure);
router.get('/expenditure', getExpenditure);
router.put('/expenditure/:id', updateExpenditure)
router.delete('/expenditure/:id', deleteExpenditure)
module.exports = router;