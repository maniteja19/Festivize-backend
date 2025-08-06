const express = require('express');
const { getAllRecievedItems, addReceivedItems, deleteReceivedItem, updateReceivedItem } = require('../controllers/receivedItemsController');
const router = express();

router.get('/receiveditems', getAllRecievedItems);
router.post('/receiveditem', addReceivedItems);
router.put('/receiveditem/:id', updateReceivedItem);
router.delete('/receiveditem/:id', deleteReceivedItem)

module.exports = router;