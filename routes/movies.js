const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi
      .string()
      .required(),
    director: Joi
      .string()
      .required(),
    year: Joi
      .string()
      .required(),
    description: Joi
      .string()
      .required(),
    duration: Joi
      .number()
      .required(),
    image: Joi
      .string()
      .uri()
      .required(),
    trailerLink: Joi
      .string()
      .uri()
      .required(),
    nameRU: Joi
      .string()
      .required(),
    nameEN: Joi
      .string()
      .required(),
    thumbnail: Joi
      .string()
      .uri()
      .required(),
    movieId: Joi
      .number()
      .required(),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string()
      .hex()
      .required()
      .min(24)
      .max(24),
  }),
}), deleteMovie);

module.exports = router;
