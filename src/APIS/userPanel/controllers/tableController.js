const Table = require("../../../models/tableModel");

const redisClient = require("../../../redis/redisServer");

const getTableDetail = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: "No id detected",
			});
		}
		const table = await Table.findById(id);
		if (!table) {
			return res.status(400).json({
				success: false,
				error: "No such table found",
			});
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
			redis: true,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			error: "Server error",
		});
	}
};

const getAllTableDetails = async (req, res) => {
	try {
		const tables = await Table.find({}).select(["-bookedBy", "-addedBy"]);
		redisClient.setex("tables", 7200, JSON.stringify(tables));
		res.status(200).json({
			success: true,
			data: tables,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			error: "Server error",
		});
	}
};

module.exports = { getTableDetail, getAllTableDetails };
