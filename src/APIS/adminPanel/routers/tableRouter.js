const {
	addTable,
	updateTable,
	getTableDetail,
	getAllTableDetails,
	deleteTable,
} = require("../controllers/tableController");
const { adminProtect } = require("../../../middleware/authMiddlewere");

const router = require("express").Router();

router.route("/").post(adminProtect, addTable); //  api/admin/table
router.route("/").get(adminProtect, getAllTableDetails); // api/admin/table
router.route("/:id").put(adminProtect, updateTable); // api/admin/table/:id
router.route("/:id").get(adminProtect, getTableDetail); // api/admin/table/:id
router.route("/:id").delete(adminProtect, deleteTable); // api/admin/table/:id

module.exports = router;
