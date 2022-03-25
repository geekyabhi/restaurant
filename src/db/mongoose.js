const mongoose = require("mongoose");
require("dotenv").config({ path: "./configuration/dev.env" });
const connectDB = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const conn = await mongoose.connect(process.env.MONGODB_URI, {
				useUnifiedTopology: true,
				useFindAndModify: true,
				useNewUrlParser: true,
				useCreateIndex: true,
			});
			resolve(`Mongodb connected at ${conn.connection.host}`);
		} catch (e) {
			reject("MongoDB cannot be connected : ", e);
		}
	});
};

module.exports = { connectDB };
