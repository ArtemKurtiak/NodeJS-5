const router = require('express').Router();

const {
    getAllLaptops, createLaptop, updateLaptop, deleteLaptop, getLaptopById
} = require('../controllers/laptop.controller');
const {
    isFullDataInLaptopRequest, isLaptopByIdExists, isLaptopIdInParams, isUpdateLaptopDataSent
} = require('../middlewares/laptop.middleware');

router.get('/', getAllLaptops);

router.get('/:laptopId', isLaptopIdInParams, isLaptopByIdExists, getLaptopById);

router.post('/', isFullDataInLaptopRequest, createLaptop);

router.patch('/:laptopId', isLaptopByIdExists, updateLaptop);

router.delete('/:laptopId', isLaptopIdInParams, isUpdateLaptopDataSent, isLaptopByIdExists, deleteLaptop);

module.exports = router;
