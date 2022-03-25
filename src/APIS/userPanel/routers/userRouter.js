const router = require("express").Router();
const {
	login,
	register,
	updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../../../middleware/authMiddlewere");

router.route("/login").post(login); // api/user/user/login
router.route("/").post(register); // api/user/user/
router.route("/updateprofile").put(protect, updateUserProfile); // api/user/user/updateprofile
module.exports = router;
