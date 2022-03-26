const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
	let token;
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];

			if (!token) {
				res.statusCode = 401;
				throw new Error("Not authorized");
			}

			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(decoded.id).select("-password");
			if (!user) {
				res.statusCode = 401;
				throw new Error("Not Authorised");
			}
			if (!user) {
				res.statusCode = 401;
				throw new Error("Not Authorised");
			}
			req.user = user;
			const tokens = req.user.tokens;
			if (!tokens.includes(token)) {
				res.statusCode = 401;
				throw new Error("Token expired");
			}
			req.currentToken = token;
			next();
		} else {
			res.statusCode = 401;
			throw new Error("Not Authorised");
		}
	} catch (e) {
		next(e);
	}
};

const adminProtect = async (req, res, next) => {
	let token;
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			try {
				token = req.headers.authorization.split(" ")[1];
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				const userDecoded = await User.findById(decoded.id).select(
					"-password"
				);
				if (userDecoded && userDecoded.isAdmin) {
					req.user = userDecoded;
				} else {
					throw new Error("Not authorized as admin");
				}
				next();
			} catch (error) {
				console.error(error);
				throw new Error("Not authorized as admin");
			}
		}
		if (!token) {
			throw new Error("Not authorized");
		}
	} catch (e) {
		console.log(e);
		let error = `${e}`.split(":");
		let message;
		if (error[0] === "Error") {
			message = error[1];
		} else {
			message = "Authorization Problem";
		}
		res.json({ success: false, message: message });
		res.status(401);
	}
};

module.exports = { protect, adminProtect };
