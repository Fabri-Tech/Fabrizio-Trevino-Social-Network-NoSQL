const express = require('express');
const router = express.Router();

const routes = {
  thoughts: require('./thoughtRoutes'),
  users: require('./userRoutes'),
};

Object.entries(routes).forEach(([path, route]) => {
  router.use(`/${path}`, route);
});

module.exports = router;
