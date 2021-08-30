const router = require('express').Router();

const {
    getAllUsers, getUserById, deleteUser, updateUser, createUser
} = require('../controllers/users.controller');
const {
    isUserByIdExists, isEmailInUse, isFullDataInUserRequest, isUserIdInParams,
    isUpdateUserDataSent
} = require('../middlewares/user.middleware');

router.get('/', getAllUsers);

router.post('/', isFullDataInUserRequest, isEmailInUse, createUser);

router.get('/:userId', isUserIdInParams, isUserByIdExists, getUserById);

router.delete('/:userId', isUserIdInParams, isUserByIdExists, deleteUser);

router.patch('/:userId', isUserIdInParams, isUpdateUserDataSent, isUserByIdExists, updateUser);

module.exports = router;
