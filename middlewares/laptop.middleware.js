const CustomError = require('../errors/customError');
const { Laptop } = require('../db');
const { BAD_REQUEST, NOT_FOUND } = require('../constants/status-codes.enum');
const validateObject = require('../hooks/validateObject');
const { getLaptopByIdValidator, createLaptopValidator, updateLaptopValidator } = require('../validators/laptop.validator');

module.exports = {
    isFullDataInLaptopRequest: (req, res, next) => {
        try {
            const [
                errorValue,
                errorMessage
            ] = validateObject(createLaptopValidator, req.body);

            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            req.body = errorValue;

            next();
        } catch (e) {
            next(e);
        }
    },

    isLaptopByIdExists: async (req, res, next) => {
        try {
            const { laptopId } = req.params;

            const laptop = await Laptop.findById(laptopId);

            if (!laptop) {
                throw new CustomError('Laptop not found', NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isLaptopIdInParams: (req, res, next) => {
        try {
            // eslint-disable-next-line
            const [, errorMessage] = validateObject(getLaptopByIdValidator, req.params);

            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateLaptopDataSent: (req, res, next) => {
        try {
            // eslint-disable-next-line
            const [, errorMessage] = validateObject(updateLaptopValidator, req.body);

            if (errorMessage) {
                throw new CustomError(errorMessage, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
