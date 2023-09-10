const { Router } = require('express');
const userController = require('../../controllers/user-control');

const router = Router();
//route handlers that handles the logic for each specific route
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