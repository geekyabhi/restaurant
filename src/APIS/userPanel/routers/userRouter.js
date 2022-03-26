const router = require("express").Router();
const {
	login,
	register,
	updateUserProfile,
	logout,
	findOne,
} = require("../controllers/userController");
const { protect } = require("../../../middleware/authMiddlewere");

router.route("/login").post(login); // api/user/user/login
router.route("/").post(register); // api/user/user/
router.route("/").get(protect, findOne); // api/user/
router.route("/updateprofile").put(protect, updateUserProfile); // api/user/user/updateprofile
router.route("/logout").delete(protect, logout); // api/user/user/logout
module.exports = router;
