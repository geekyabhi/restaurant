const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
require("colors");
require("log-timestamp");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;

const { connectDB } = require("./src/db/mongoose");
const { activateApi } = require("./src/APIS/api");
const { errorHandler } = require("./src/middleware/errorHandler");

connectDB()
	.then((res) => {
		console.log(`${res}`.cyan);
		app.get("/", (req, res) => {
			res.send({
				message: `Express server is running successfully on ${PORT} and redis on ${process.env.REDIS_PORT}`,
			});
		});
		app.use("/api", activateApi());
		app.use("/api/*", (req, res, next) => {
			try {
				res.statusCode = 404;
				throw new Error("No such api exist");
			} catch (e) {
				next(e);
			}
		});
		app.use("/*", (re, res, next) => {
			try {
				res.statusCode = 404;
				throw new Error("No such api exist");
			} catch (e) {
				next(e);
			}
		});
		app.use(errorHandler);
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`.yellow);
		});
	})
	.catch((e) => {
		console.log(`${e}`.red);
		process.exit(1);
	});
