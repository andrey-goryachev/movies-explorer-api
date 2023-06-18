// eslint-disable-next-line max-classes-per-file
const mongoose = require('mongoose');
const {
  NOT_FOUND_CODE,
  NOT_AUTH_ERROR_CODE,
  NOT_OWNER_ENTITY_ERROR_CODE,
  INCORRECT_DATA_ERROR_CODE,
  ALREADY_EXISTS_CODE,
  DEFAULT_ERROR_CODE,
  INCORRECT_DATA_ERROR_CODE_MESSAGE,
  ALREADY_EXISTS_CODE_MESSAGE,
} = require('../utils/consts');

class CustomError extends Error {
  // eslint-disable-next-line no-useless-constructor
  constructor(message) {
    super(message);
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}

class NotAuthError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTH_ERROR_CODE;
  }
}

class NotOwnerEntityError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_OWNER_ENTITY_ERROR_CODE;
  }
}

const handleErrors = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(INCORRECT_DATA_ERROR_CODE).send({ message: INCORRECT_DATA_ERROR_CODE_MESSAGE });
    return;
  }
  if (err.code === 11000) {
    res.status(ALREADY_EXISTS_CODE).send({ message: ALREADY_EXISTS_CODE_MESSAGE });
    return;
  }
  res.status(DEFAULT_ERROR_CODE).send({ message: err.message });

  next();
};

module.exports = {
  handleErrors,
  NotFoundError,
  NotAuthError,
  NotOwnerEntityError,
};
