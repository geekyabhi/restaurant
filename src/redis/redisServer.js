const redis = require("redis");

// const REDIS_PORT = "http://127.0.0.1:6379";

let REDIS_PORT = "http://127.0.0.1:6379";

if (process.env.REDIS_HOST) {
	REDIS_PORT = {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD,
	};
}

const redisClient = redis.createClient(REDIS_PORT);

redisClient.on("error", (err) => {
	console.log(`Error while connecting redis ${err}`);
});
redisClient.on("connect", (port) => {
	console.log(`Redis connected on port ${process.env.REDIS_PORT}`.magenta);
});

module.exports = redisClient;
