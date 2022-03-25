const router = require("express").Router();
const {
	updateUserProfile,
	getAllUsers,
	getOneUsers,
} = require("../controllers/userController");
const { protect, adminProtect } = require("../../../middleware/authMiddlewere");

router.route("/").get(adminProtect, getAllUsers); // api/admin/user
router.route("/:id").get(adminProtect, getOneUsers); // api/admin/user/:id
router.route("/:id").put(adminProtect, updateUserProfile); // api/admin/user/:id
module.exports = router;
