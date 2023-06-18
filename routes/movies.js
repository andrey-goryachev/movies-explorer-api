const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const {validationCreateMovie, validationDeleteMovie} = require("../utils/validation");

router.get('/', getMovies);
router.post('/', validationCreateMovie, createMovie);

router.delete('/:id', validationDeleteMovie, deleteMovie);

module.exports = router;
