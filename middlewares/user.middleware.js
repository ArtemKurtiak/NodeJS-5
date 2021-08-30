const { User } = require('../db');
const CustomError = require('../errors/customError');
const { validateEmail } = require('../helpers/auth.helper');
const { CONFLICT, NOT_FOUND, BAD_REQUEST } = require('../constants/status-codes.enum');
const validateObject = require('../hooks/validateObject');
const {
    registerUserValidator, loginUserValidator, getUserByIdValidator, updateUserValidator
} = require('../validators/user.validator');

module.exports = {
    isEmailInUse: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (user) {
                throw new CustomError('Email already in use', CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExists: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                next(new CustomError('User not found', NOT_FOUND));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExists: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) {
                next(new CustomError('User not found', NOT_FOUND));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailFormatCorrect: (req, res, next) => {
        try {
            const { email } = req.body;

            const validationResult = validateEmail(email);

            if (!validationResult) {
                throw new CustomError('Invalid format of email', BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isFullDataInUserRequest: (req, res, next) => {
        try {
            const [
                errorValue,
                errorMessage
            ] = validateObject(registerUserValidator, req.body);
            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }
            req.body = errorValue;

            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginBodyCorrect: (req, res, next) => {
        try {
            // eslint-disable-next-line
            const [, errorMessage] = validateObject(loginUserValidator, req.body);
            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdInParams: (req, res, next) => {
        try {
            // eslint-disable-next-line
            const [, errorMessage] = validateObject(getUserByIdValidator, req.params);
            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateUserDataSent: (req, res, next) => {
        try {
            // eslint-disable-next-line
            const [, errorMessage] = validateObject(updateUserValidator, req.body);
            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
