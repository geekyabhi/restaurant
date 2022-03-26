const User = require("../../../models/userModel");
const generateToken = require("../../../utils/generateToken");

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.statusCode = 400;
			throw new Error("Fields missing");
		}

		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			const token = generateToken(user._id);
			const tokensArray = [...user.tokens, token];
			user.tokens = tokensArray;
			await user.save();

			res.status(200).json({
				success: true,
				data: {
					_id: user._id,
					name: user.name,
					email: user.email,
					token: token,
				},
			});
		} else {
			res.statusCode = 400;
			throw new Error("Wrong id or password");
		}
	} catch (e) {
		next(e);
	}
};

const register = async (req, res, next) => {
	try {
		const { name, email, password, isAdmin } = req.body;

		if (!email || !password || !name) {
			res.statusCode = 400;
			throw new Error("Fields missing");
		}

		if (isAdmin) {
			res.statusCode = 400;
			throw new Error("Only admin can make you admin");
		}

		const existingUser = await User.findOne({ email: email });

		if (existingUser) {
			res.statusCode = 400;
			throw new Error("Email already exists");
		}

		const user = new User({
			name,
			email,
			password,
			tablesBooked: [],
			isAdmin,
		});
		const savedUser = await user.save();

		if (savedUser) {
			res.status(200).json({
				success: true,
				data: {
					_id: savedUser._id,
					name: savedUser.name,
					isAdmin: false,
					email: savedUser.email,
					tablesBooked: savedUser.tablesBooked,
				},
			});
		} else {
			res.statusCode = 400;
			throw new Error("Wrong data");
		}
	} catch (e) {
		next(e);
	}
};

const updateUserProfile = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			if (req.body.password) {
				user.password = req.body.password;
			}
		}

		if (req.body.isAdmin) {
			res.statusCode = 400;
			throw new Error("Only admin can make you admin");
		}

		const updatedUser = await user.save();
		res.status(200).json({
			success: true,
			data: {
				_id: updatedUser._id,
				isAdmin: false,
				name: updatedUser.name,
				email: updatedUser.email,
				token: generateToken(updatedUser._id),
			},
		});
	} catch (e) {
		next(e);
	}
};

const findOne = async (req, res, next) => {
	try {
		const loggedUser = req.user;
		const user = await User.findById(loggedUser.id)
			.select(["-password", "-__v", "-tokens"])
			.populate([
				{
					path: "tablesBooked",
					select: ["-bookingList", "-__v", "-addedBy"],
				},
			]);
		return res.status(200).send({
			success: true,
			data: user,
		});
	} catch (e) {
		next(e);
	}
};

const logout = async (req, res, next) => {
	try {
		const loggedUser = req.user;
		const user = await User.findById(loggedUser.id);
		const currentToken = req.currentToken;
		const currentTokens = user.tokens.filter((token) => {
			if (token !== currentToken) return token;
		});
		user.tokens = currentTokens;
		await user.save();
		return res.status(201).send({
			success: true,
			message: "Successfully logged out",
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { login, register, updateUserProfile, logout, findOne };
