const router = require('express').Router();

const { login, register } = require('../controllers/auth.controller');
const {
    isEmailInUse, isUserExists, isFullDataInUserRequest, isLoginBodyCorrect
} = require('../middlewares/user.middleware');

router.post('/register', isFullDataInUserRequest, isEmailInUse, register);

router.post('/login', isLoginBodyCorrect, isUserExists, login);

module.exports = router;
