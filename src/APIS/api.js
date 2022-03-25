const router = require("express").Router();
const userApi = require("./userPanel/userAPIS");
const adminApi = require("./adminPanel/adminAPIS");

const activateApi = () => {
	router.use("/user", userApi);
	router.use("/admin", adminApi);

	return router;
};

module.exports = { activateApi };
