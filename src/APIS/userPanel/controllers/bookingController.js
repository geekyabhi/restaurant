const Bookings = require("../../../models/bookingModel");
const Table = require("../../../models/tableModel");
const User = require("../../../models/userModel");
const moment = require("moment");

const addBooking = async (req, res, next) => {
	try {
		const user = req.user;
		if (!user) {
			res.statusCode = 401;
			throw new Error("Not authorized");
		}

		const { tableId, tableBookedForDate } = req.body;

		const table = await Table.findById(tableId);
		if (!table) {
			res.statusCode = 400;
			throw new Error("No such table exist");
		}

		let alreadyBooked;

		table.bookingList.forEach((booking) => {
			if (moment(booking.date).isSame(tableBookedForDate))
				alreadyBooked = true;
		});

		if (alreadyBooked) {
			res.statusCode = 400;
			throw new Error("Table already booked for that time");
		}

		const booking = new Bookings({
			tableBooked: tableId,
			dateOfBooking: Date.now(),
			tableBookedForDate,
			bookingBy: user._id,
		});
		const savedBooking = await booking.save();
		if (savedBooking) {
			table.bookedBy = user._id;
			table.bookingList = [
				...table.bookingList,
				{
					bookedBy: user._id,
					date: tableBookedForDate,
				},
			];
			await table.save();

			user.tablesBooked = [...user.tablesBooked, table];
			await user.save();

			res.status(200).json({
				success: true,
				data: savedBooking,
			});
		}
	} catch (e) {
		next(e);
	}
};

const getBooking = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			res.statusCode = 400;
			throw new Error("Can not detect the id");
		}

		const user = req.user;
		if (!user) {
			res.statusCode = 401;
			throw new Error("Not authorized");
		}
		const booking = await Bookings.findById(id).populate("tableBooked", [
			"price",
			"number",
		]);
		if (!booking) {
			res.statusCode = 400;
			throw new Error("No such booking found");
		}
		if (String(booking.bookingBy._id) !== String(user._id)) {
			res.statusCode = 401;
			throw new Error("Not authorized");
		}
		res.status(200).json({
			success: true,
			data: booking,
		});
	} catch (e) {
		next(e);
	}
};

const getAllBooking = async (req, res, next) => {
	try {
		const user = req.user;
		if (!user) {
			res.statusCode = 401;
			throw new Error("Not authorized");
		}
		const bookings = await Bookings.find({ bookingBy: user }).populate(
			"tableBooked",
			["number", "price"]
		);
		if (!bookings) {
			res.statusCode = 404;
			throw new Error("Not found");
		}
		res.status(200).json({
			success: true,
			data: bookings,
		});
	} catch (e) {
		next(e);
	}
};

const deleteBooking = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			res.statusCode = 400;
			throw new Error("Can not detect the id");
		}
		const user = req.user;
		if (!user) {
			res.statusCode = 401;
			throw new Error("Not authorized");
		}
		const booking = await Bookings.findById(id).populate([
			"bookingBy",
			"tableBooked",
		]);
		if (!booking) {
			res.statusCode = 404;
			throw new Error("No such booking found");
		}
		if (String(booking.bookingBy._id) !== String(user._id)) {
			res.statusCode = 401;
			throw new Error("Not authorized");
		}
		const deletedBooking = await booking.remove();

		const tableId = booking.tableBooked._id;
		const tableBookedForDate = booking.tableBookedForDate;
		const table = await Table.findById(tableId);
		table.bookingList = table.bookingList.filter(
			(booking) => !moment(booking.date).isSame(tableBookedForDate)
		);

		const updatedTable = await table.save();
		const userId = booking.bookingBy._id;
		const userCheck = await User.findById(userId);
		userCheck.tablesBooked = userCheck.tablesBooked.filter(
			(table) => String(table._id) !== String(tableId)
		);
		const updatedUser = await userCheck.save();

		res.status(200).json({
			success: true,
			data: deletedBooking,
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { addBooking, getBooking, getAllBooking, deleteBooking };
