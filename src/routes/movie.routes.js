const express = require('express');
const movieRouter = express.Router();
const { getMovies, getMovie, createMovie, updateMovie, deleteMovie } = require('../controllers/movie.controller');
const { isAuth } = require("../middlewares/auth.middleware");

movieRouter.get('/', getMovies);
movieRouter.get('/:id', getMovie);
movieRouter.post('/', [isAuth], createMovie);
movieRouter.patch('/:id', [isAuth], updateMovie);
movieRouter.delete('/:id', [isAuth], deleteMovie);


module.exports = movieRouter;