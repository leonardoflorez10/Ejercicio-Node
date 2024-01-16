const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Un estudio debe tener nombre'],
        unique: true,
        trim: true,
    },
    country: {
        type: String,
        required: [true, 'Un estudio debe tener país'],
        unique: true,
    },
    budget: {
        type: Number,
        required: [true, 'Un estudio debe tener un presupuesto'],
        trim: true,
    },
});


const Studio = mongoose.model('Studio', studioSchema);

module.exports = Studio;