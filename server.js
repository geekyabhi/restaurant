const express = require("express");
const connectDB = require("./src/db/mongoose");
require("colors");
const app = express();
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_URI || "http://127.0.0.1:6379";

const adminRoutes = require("./src/adminPanel/adminAPIS");
const userRoutes = require("./src/userPanel/userAPIS");
const redisClient = require("./src/redis/redisServer");

app.get("/", (req, res) => {
	console.log(redisClient);
	if (redisClient) {
		res.send({
			message: `Express running on ${PORT} and redis running on ${REDIS_PORT} and mongoDB running on `,
		});
	}
	res.send({
		message: "Server is running successfully",
	});
});

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.yellow);
	console.log(`Redis runnning on port ${REDIS_PORT}`.yellow);
});
