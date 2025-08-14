const receivedItem = require('../models/receivedItems');
const { isYearClosed } = require('./yearController'); 

const addReceivedItems = async (request, response) => {
    const {itemName, amount, denotedBy, status, collectedBy, year} = request.body;
    if(!itemName || !denotedBy || !status){
        return response.status(400).json({ 
            message: 'Please provide all required fields: item name, denoted by, status' 
        });
    }
    try{

        const yearStatus = await isYearClosed(year);
        if (yearStatus) {
            return response.status(403).json({ message: `Cannot add received item. Year ${year} is closed for editing.` });
        }

        const newReceivedItem = new receivedItem({
            itemName: itemName,
            amount, status, denotedBy, collectedBy, year,
        })
        await newReceivedItem.save()
        response.status(201).json({
            message : "Successfully added to the received Items",
            data : newReceivedItem,
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            message: "Internal server error"
        })
    }
}
const getAllRecievedItems = async (request, response) => {
    const { year } = request.query;
    try{
        let query = {};
        if (year) {
            query.year = year;
        }

        const receivedItems = await receivedItem.find(query).sort({ createdAt: -1 }); 
        response.status(200).json({message : "Sucessfully fetch all the received items.", data: receivedItems})
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            message:'Internal Server Error'
        })
    }
}

const updateReceivedItem = async (request, response) => {

    const {id} = request.params;
    const {itemName, amount, denotedBy, collectedBy, status} = request.body;
    const { year } = request.body;
    try{
        const existingItem = await receivedItem.findById(id);
        if (!existingItem) {
            return response.status(404).json({ message: 'Received item not found with this ID.' });
        }

        const targetYear = year || existingItem.year;

        const yearStatus = await isYearClosed(targetYear);
        if (yearStatus) {
            return response.status(403).json({ message: `Cannot update received item. Year ${targetYear} is closed for editing.` });
        }

        if(!itemName || !denotedBy || !status){
            return response.status(400).json({ 
                message: 'Please provide all required fields: item name, denoted by, status' 
            });
        }

        const updatedReceivedItem = await receivedItem.findByIdAndUpdate(id, request.body, {
            new : true,
            runValidators: true
        })

        if (!updatedReceivedItem) {
            return response.status(404).json({ message: 'Expenditure not found with this ID.' });
        }

        response.status(200).json({
            message : `${itemName} is Successfully updated.`,
            data : updatedReceivedItem
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            message : "Internal server error"
        })
    }
}

const deleteReceivedItem = async (request, response) => {
    const {id} = request.params;

    try{
        const existingItem = await receivedItem.findById(id);
       
        const yearStatus = await isYearClosed(existingItem.year);
        if (yearStatus) {
            return response.status(403).json({ message: `Cannot delete received item. Year ${existingItem.year} is closed for editing.` });
        }

        const deletedReceviedItem = await receivedItem.findByIdAndDelete(id);
        if (!deletedReceviedItem) {
            return response.status(404).json({ message: 'Expenditure not found with this ID.' });
        }
        response.status(200).json({
            message: `${deletedReceviedItem.itemName} is Successfully deleted.`,
            data: deletedReceviedItem
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            message: "Internal server error"
        })
    }
}
module.exports = {addReceivedItems, getAllRecievedItems, updateReceivedItem, deleteReceivedItem}