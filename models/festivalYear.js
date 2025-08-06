const mongoose = require('mongoose');

const festivalYearSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: [true, 'Festival year is required.'],
        unique: true,
        min: [2023, 'Year must be after 2023'],
        max: [2100, 'Year cannot be after 2100']
    },
    isClosed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Optional: You might want to track who created/closed the year
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
});

const FestivalYear = mongoose.model('FestivalYear', festivalYearSchema);

module.exports = FestivalYear;
