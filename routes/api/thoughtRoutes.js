const express = require('express');
const thoughtController = require('../../controllers/thought-controller');
const router = express.Router();

const routes = {
  '/': {
    get: thoughtController.getThoughts,
    post: thoughtController.createThought,
  },
  '/:thoughtId': {
    get: thoughtController.getSingleThought,
    put: thoughtController.updateThought,
    delete: thoughtController.deleteThought,
  },
  '/:thoughtId/reactions': {
    post: thoughtController.addReaction,
  },
  '/:thoughtId/reactions/:reactionId': {
    delete: thoughtController.deleteReaction,
  },
};

for (const [path, handlers] of Object.entries(routes)) {
  for (const [method, handler] of Object.entries(handlers)) {
    router[method](path, handler);
  }
}

module.exports = router;
