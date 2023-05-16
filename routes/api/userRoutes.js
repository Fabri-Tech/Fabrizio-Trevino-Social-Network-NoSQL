const express = require('express');
const userController = require('../../controllers/user-controller');
const router = express.Router();

const routes = {
  '/': {
    get: userController.getUsers,
    post: userController.createUser,
  },
  '/:userId': {
    get: userController.getSingleUser,
    put: userController.updateUser,
    delete: userController.deleteUser,
  },
  '/:userId/friends/:friendId': {
    post: userController.addFriend,
    delete: userController.deleteFriend,
  },
};

for (const [path, handlers] of Object.entries(routes)) {
  for (const [method, handler] of Object.entries(handlers)) {
    router[method](path, handler);
  }
}

module.exports = router;
