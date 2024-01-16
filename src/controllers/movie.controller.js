const Movie = require('../models/movie.model');


// get all
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(allMovie);

    } catch (error) {
        return res.status(500).json(error);
    }
}

// get 1
const getMovie = async (request, response, next) => {
    try {
        const id = request.params.id;
        const movie = await Movie.findById(id);
        response.status(200).json(movie);

    } catch (error) {
        next(error);
    }
}

// post
const createMovie = async (request, response, next) => {
    const movie = new Movie(request.body);
    try {
        await movie.save();
        response.status(201).json({ message: 'La película fue creada con éxito', movie: movie })

    } catch (error) {
        next(error);
    }
}

// patch 
const updateMovie = async (request, response, next) => {
    try {
        const id = request.params.id;
        const body = request.params.body;
        const movie = await Movie.findByIdAndUpdate(id, body, { new: true });
        response.status(200).json(movie);

    } catch (error) {
        console.log(error.message);
        response.status(400).json({ message: error.message });
    }
}

// delete
const deleteMovie = async (request, response, next) => {
    try {
        const id = request.params.id;
        const movie = await Movie.findByIdAndDelete(id);
        response.status(200).json({ message: 'Se borró la película' });
    } catch (error) {
        console.log(error.message);
        response.status(404).json({ message: error.message });
    }
}


module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
}