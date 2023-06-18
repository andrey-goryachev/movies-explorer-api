const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const incorrect = require('./incorrect');
const { validationSignIn, validationSignUp } = require('../utils/validation');

router.post('/signin', validationSignIn, login);

router.post('/signup', validationSignUp, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.use('*', incorrect);

module.exports = router;
