const express = require("express");
const { getAllUsers, deleteUserById, updateUserById, getUserById} = require("../Controllers/admin-controller");
const router = express.Router();
const ensureAuthenticated = require("../Middlewares/Auth");
const adminMiddleware = require("../Middlewares/admin-middleware");


// router.route("/users").get(getAllUsers);
router.get('/users',ensureAuthenticated, adminMiddleware, getAllUsers)
router.route("/users/:id").get(ensureAuthenticated, adminMiddleware, getUserById);
router.route("/users/delete/:id").delete(ensureAuthenticated, adminMiddleware, deleteUserById);
router.route('/users/update/:id').put(ensureAuthenticated, adminMiddleware, updateUserById);


// router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);



module.exports = router;