const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const {signup, login, protect, restrictTo} = authController;
const {getAllUsers, getUser, createUser, updateUser, deleteUser} = userController;

const router = express.Router();

router.route("/").get(protect, restrictTo("admin"), getAllUsers).post(createUser);
router.route("/:id").get(protect, restrictTo("admin"), getUser).patch(protect, updateUser).delete(protect, deleteUser);

router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
