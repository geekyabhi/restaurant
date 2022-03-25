const cache = require("../../../middleware/cacheMiddlewere");
const {
	getTableDetail,
	getAllTableDetails,
} = require("../controllers/tableController");

const router = require("express").Router();

router.route("/").get(cache, getAllTableDetails); // api/user/table
router.route("/:id").get(cache, getTableDetail); // api/user/table/:id

module.exports = router;
