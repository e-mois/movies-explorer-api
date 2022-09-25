const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, deleteMoviesValidator } = require('../middlewares/validation');

const movieRouter = require('express').Router();

movieRouter.get('/', getMovies);

movieRouter.post('/', createMovieValidator, createMovie);

movieRouter.delete('/:movieId', deleteMoviesValidator, deleteMovie);

module.exports = movieRouter;