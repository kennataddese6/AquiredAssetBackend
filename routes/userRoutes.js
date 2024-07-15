const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  login,
  getMe,
  findUser,
  logout,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/userController");
const { validator } = require("../middleware/validator");

router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/search").get(findUser);
router
  .route("/")
  .get(protect, getUsers)
  .post(protect, createUser)
  .delete(protect, deleteUser);
router.route("/:Id").patch(protect, updateUser);
router.route("/me").get(protect, validator, getMe);

module.exports = router;
