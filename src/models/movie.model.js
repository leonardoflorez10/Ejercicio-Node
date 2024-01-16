const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'La película debe tener título'],
        unique: true,
        trim: true,
        minlength: 2
    },
    director: {
        type: String,
        required: [true, 'La película debe tener su director'],
        unique: true,
    },
    year: {
        type: Number,
        required: [true, 'Una película debe tener año'],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, 'La película debe tener género'],
        trim: true,
    }
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;