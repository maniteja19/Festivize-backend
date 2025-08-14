const mongoose = require('mongoose');

const receivedItemScheme = new mongoose.Schema({
    itemName : {
        type : String,
        required: [true, 'item name is required']
    },
    amount: {
        type: Number,
        required : [true, 'amount is required.'],
        min : [0, 'Amount cannot be negative.'],
        default:0
    },
    denotedBy : {
        type : String,
        required : [true, 'denotedby is required'],
        max : [100, 'Name cannot be more than 100 characters']
    },
    status: {
        type : String,
        required : [true, 'status is required'],
        default: 'new'
    },
    collectedBy:{
        type : String,
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    year: {
        type: Number,
        required: [true, 'Year is required for received item.'],
    },
    
}, {timestamps:true})

const receivedItem = mongoose.model('received_items', receivedItemScheme);

module.exports = receivedItem;