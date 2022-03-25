const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("colors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;

const { connectDB } = require("./src/db/mongoose");
const { activateApi } = require("./src/APIS/api");

connectDB()
	.then((res) => {
		console.log(`${res}`.cyan);
		app.get("/", (req, res) => {
			res.send({
				message: `Express server is running successfully on ${PORT} and redis on ${process.env.REDIS_PORT}`,
			});
		});
		app.use("/api", activateApi());
	})
	.catch((e) => {
		console.log(`${e}`.red);
		process.exit(1);
	});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.yellow);
});
