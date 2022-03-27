const Table = require("../../../models/tableModel");

const redisClient = require("../../../redis/redisServer");

const getTableDetail = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			res.statusCode = 400;
			throw new Error("No id detected");
		}
		const table = await Table.findById(id);
		if (!table) {
			res.statusCode = 400;
			throw new Error("No such table found");
		}
		redisClient.setex(id, 7200, JSON.stringify(table));
		res.status(200).json({
			success: true,
			data: {
				_id: table._id,
				price: table.price,
				number: table.number,
				bookingList: table.bookingList.map((booking) => booking.date),
			},
		});
	} catch (e) {
		next(e);
	}
};

const getAllTableDetails = async (req, res, next) => {
	try {
		console.log(req.query);
		const tables = await Table.find(req.query).select([
			"-addedBy",
			"-bookedBy",
		]);
		redisClient.setex("tables", 7200, JSON.stringify(tables));
		res.status(200).json({
			success: true,
			data: tables,
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { getTableDetail, getAllTableDetails };
