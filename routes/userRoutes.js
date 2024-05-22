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

router.route("/login").post(validator, login);
router.route("/logout").post(logout);
router.route("/:mail", findUser);
router
  .route("/")
  .get(getUsers)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);
router.route("/me").get(protect, validator, getMe);

module.exports = router;
