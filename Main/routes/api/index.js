//importing dependencies and route modules
const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const thoughtRoutes = require('./thought-routes');
//sub routers are defined in the imported userRoutes and thoughtRoutes and used to group related routes together
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;