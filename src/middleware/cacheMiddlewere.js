const redisClient = require("../redis/redisServer");

const cache = (req, res, next) => {
	// console.log(req);
	const { id } = req.params;
	if (!id) {
		redisClient.get("tables", (error, data) => {
			if (error) {
				throw error;
			}
			if (data) {
				next();
				// const jsonData = JSON.parse(data);
				// res.status(200).send({
				// 	success: true,
				// 	data: jsonData,
				// 	redis: true,
				// });
			} else {
				next();
			}
		});
	} else {
		redisClient.get(id, (error, data) => {
			if (error) {
				throw error;
			}
			if (data) {
				next();
				// const jsonData = JSON.parse(data);
				// res.status(200).send({
				// 	success: true,
				// 	data: jsonData,
				// 	redis: true,
				// });
			} else {
				next();
			}
		});
	}
};

module.exports = cache;
