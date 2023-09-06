const { Router } = require('express');
const userController = require('../../controllers/user-controller');

const router = Router();

router
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router
  .route('/:userId')
  .get(userController.getOneUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(userController.addFriend)
  .delete(userController.removeFriend);

module.exports = router;
