const Movie = require('../models/movie')
const {Joi} = require("celebrate");
const {NotOwnerEntityError, NotFoundError} = require("../errors/errors");

const getMovies = (req, res, next) => {
  Movie.find({owner: req.user._id})
    .then((movies) => res.send(movies))
    .catch(next)
}

const createMovie = (req, res, next) => {
  const owner = req.user._id
  const {
    country,
    director,
    year,
    description,
    duration,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  } = req.body
  Movie.create({
    country,
    director,
    year,
    description,
    duration,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner
  }).then((movie) => res.status(201).send(movie))
    .catch(next)
}

const deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Такого фильма нет');
    })
    .then((movie) => {
      if (movie.owner._id.valueOf() !== req.user._id) {
        throw new NotOwnerEntityError('Вы не владелец этого фильма')
      }
      return movie.deleteOne()
        .then(() => res.send({message: 'Фильм удален'}))
    })
    .catch(next)
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie
}
