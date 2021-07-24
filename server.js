const express = require("express");
const connectDB = require("./src/db/mongoose");
require("colors");
require("./src/redis/redisServer");
const app = express();
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5000;

const adminRoutes = require("./src/adminPanel/adminAPIS");
const userRoutes = require("./src/userPanel/userAPIS");

app.get("/", (req, res) => {
	res.send({
		message: `Express server is running successfully on ${PORT} and redis on ${process.env.REDIS_PORT}`,
	});
});

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.yellow);
});
