const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const {secretKey} = require("../config");
const {
  NODE_ENV = 'dev',
  JWT_SECRET,
} = process.env;

const login = (req, res, next) => {
  const {email, password} = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({_id: user._id}, NODE_ENV === 'production' ? JWT_SECRET : secretKey, {expiresIn: '7d'});
      res.send({token});
    })
    .catch(next);
}

const createUser = (req, res, next) => {
  const {name, email, password,} = req.body;
  bcrypt.hash(password, 4)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch(next);
}

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
}

const updateUser = (req, res, next) => {
  const {name, email} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, email}, {new: true, runValidators: true})
    .then((user) => res.send(user))
    .catch(next);
}


module.exports = {
  login,
  createUser,
  getCurrentUser,
  updateUser
}
