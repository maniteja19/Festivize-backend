const mongoose = require('mongoose')

const expenditureSchema = new mongoose.Schema({
    expenditureType:{
        type : String,
        required: [true, 'Expenditure is required.'],
    },
    itemName:{
        type: String,
        required: [true, 'Item name is mandatory']
    },
    amountSpent: {
        type: Number,
        required: [true, ' Spent amount is required.']
    },
    paidBy :{
        type: String,
        required: [true, 'Spent person is required.']
    },
    createdAt:{
        type : Date,
        default: Date.now,
    },
    remarks: {
        type: String,
    },
    year: {
        type: Number,
        required: [true, 'Year is required for expenditure.'],
    },
})


const Expenditure = mongoose.model('expenditure', expenditureSchema);

module.exports = Expenditure;

