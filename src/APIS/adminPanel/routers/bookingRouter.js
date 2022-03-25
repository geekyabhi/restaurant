const {
	addBooking,
	getAllBooking,
	getBooking,
	updateBooking,
	deleteBooking,
} = require("../controllers/bookingController");
const { adminProtect } = require("../../../middleware/authMiddlewere");

const router = require("express").Router();

router.route("/").post(adminProtect, addBooking); // '/api/admin/booking/'
router.route("/").get(adminProtect, getAllBooking); // '/api/admin/booking/'
router.route("/:id").get(adminProtect, getBooking); // '/api/admin/booking/:id'
router.route("/:id").delete(adminProtect, deleteBooking); // '/api/admin/booking/:id'

module.exports = router;
