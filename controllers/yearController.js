const FestivalYear = require('../models/festivalYear');


const isYearClosed = async (year) => {
    const festivalYear = await FestivalYear.findOne({ year: year });
    return festivalYear ? festivalYear.isClosed : false;
};


const createYear = async (req, res) => {
    const { year } = req.body;

    if (!year) {
        return res.status(400).json({ message: 'Year is required.' });
    }

    // Optional: Check if user is admin (implement this in a middleware)
    if (req.userInfo.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Only admins can create years.' });
    }

    try {
        const newYear = new FestivalYear({ year });
        await newYear.save();
        res.status(201).json({
            message: `Festival year ${year} created successfully.`,
            data: newYear
        });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({ message: `Year ${year} already exists.` });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getYears = async (req, res) => {
    try {
        const years = await FestivalYear.find({}).sort({ year: -1 });
        res.status(200).json({
            message: 'Successfully fetched all festival years.',
            data: years
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updateYearStatus = async (req, res) => {
    const { year } = req.params; // Get year from URL parameter
    const { isClosed } = req.body; // New status from request body

    if (typeof isClosed !== 'boolean') {
        return res.status(400).json({ message: 'isClosed status (boolean) is required.' });
    }

    // Optional: Check if user is admin (implement this in a middleware)
    if (req.userInfo.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Only admins can update year status.' });
    }

    try {
        const updatedYear = await FestivalYear.findOneAndUpdate(
            { year: year },
            { isClosed: isClosed },
            { new: true, runValidators: true }
        );

        if (!updatedYear) {
            return res.status(404).json({ message: `Festival year ${year} not found.` });
        }

        res.status(200).json({
            message: `Festival year ${year} status updated to ${isClosed ? 'Closed' : 'Open'}.`,
            data: updatedYear
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createYear,
    getYears,
    updateYearStatus,
    isYearClosed
};
