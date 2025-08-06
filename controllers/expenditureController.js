const expenditure = require('../models/expenditure');
const { isYearClosed } = require('./yearController');

const addExpenditure = async (request, response) => {
    try {
        const { expenditureType, amountSpent, paidBy, itemName,remarks, year } = request.body;

        if (!expenditureType || !amountSpent || !paidBy || !itemName || !year ) {
            return response.status(400).json({ 
                message: 'Please provide all required fields: expenditureType, amountSpent, paidBy, item name.' 
            });
        }

        const yearStatus = await isYearClosed(year);
        if (yearStatus) {
            return response.status(403).json({ message: `Cannot add expenditure. Year ${year} is closed for editing.` });
        }

        const newExpenditure = new expenditure({
            expenditureType: expenditureType,
            amountSpent: amountSpent,
            paidBy: paidBy,
            itemName,
            remarks,
            year,
        });
        
        await newExpenditure.save();

        response.status(201).json({
            message: 'Successfully added expenditure.',
            data: newExpenditure
        });

    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal server error' });
    }
}

const getExpenditure = async (request, response) =>{
    const { year } = request.query; 

    let query = {};
    if (year) {
        query.year = year;
    }

    try{
        const allExpenditure = await expenditure.find(query).sort({ createdAt: -1 });
        response.status(200).json({
            message: 'Successfully fetched all the expenditures.',
            data : allExpenditure
        })
    }catch(error){
        response.status(500).json({
            message: "Internal server error",
            error : error
        })
    }
    
}

const updateExpenditure = async (request, response) =>{
    const {id} = request.params;
    const { year } = request.body;
    const {expenditureType, amountSpent, paidBy, itemName} = request.body;

    try{
        if (!request.body || Object.keys(request.body).length === 0) {
            return response.status(400).json({
                message: "Please provide at least one field to update."
            });
        }

        const existingExpenditure = await expenditure.findById(id);
        if (!existingExpenditure) {
            return response.status(404).json({ message: 'Expenditure not found with this ID.' });
        }

        const targetYear = year || existingExpenditure.year; // Use provided year or existing one

        const yearStatus = await isYearClosed(targetYear);
        if (yearStatus) {
            return response.status(403).json({ message: `Cannot update expenditure. Year ${targetYear} is closed for editing.` });
        } 

        if(!expenditureType || !amountSpent || !paidBy || !itemName || !year){
            return response.status(400).json({
                message : "Please provide atleast one field to update."
            })
        }

        const updatedExpenditure = await expenditure.findByIdAndUpdate(id, request.body, {
            new : true,
            runValidators: true
        })
        if (!updatedExpenditure) {
            return response.status(404).json({ message: 'Expenditure not found with this ID.' });
        }

        response.status(200).json({
            message: 'Expenditure updated successfully.',
            data: updatedExpenditure
        });
    }
    catch(error){
        console.log(error)
        if (error.kind === 'ObjectId') {
            return response.status(400).json({ message: 'Invalid ID format.' });
        }
        response.status(500).json({
            message: "Internal server error",
        })    
    }
}

const deleteExpenditure = async (request, response) =>{
    const {id} = request.params;

    try{
        
        const existingExpenditure = await expenditure.findById(id);
        if (!existingExpenditure) {
            return response.status(404).json({ message: 'Expenditure not found with this ID.' });
        }

        const yearStatus = await isYearClosed(existingExpenditure.year);
        if (yearStatus) {
            return response.status(403).json({ message: `Cannot delete expenditure. Year ${existingExpenditure.year} is closed for editing.` });
        }
        
        const deletedExpenditure = await expenditure.findByIdAndDelete(id);
        if (!deletedExpenditure) {
            return response.status(404).json({ message: 'Expenditure not found with this ID.' });
        }

        response.status(200).json({
            message: 'Expenditure deleted successfully.',
            data: deletedExpenditure
        });
    }
    catch(error){
        console.log(error)
        if (error.kind === 'ObjectId') {
            return response.status(400).json({ message: 'Invalid ID format.' });
        }
        response.status(500).json({
            message: "Internal server error",
        })    
    }
}

module.exports = {addExpenditure, getExpenditure, updateExpenditure, deleteExpenditure}