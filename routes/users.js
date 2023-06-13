const router = require('express').Router()
const {getCurrentUser, updateUser} = require("../controllers/users");
const {celebrate, Segments, Joi} = require("celebrate");


router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi
      .string()
      .email(),
    name: Joi
      .string()
      .min(2)
      .max(30),
  }),
}), updateUser);

module.exports = router;
