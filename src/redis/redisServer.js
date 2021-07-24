const redis = require("redis");

const REDIS_PORT = process.env.REDIS_URL || "http://127.0.0.1:6379";
const redisClient = redis.createClient(REDIS_PORT);

module.exports = redisClient;
