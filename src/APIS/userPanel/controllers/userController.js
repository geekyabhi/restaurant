const User = require("../../../models/userModel");
const generateToken = require("../../../utils/generateToken");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			res.status(200).json({
				success: true,
				data: {
					_id: user._id,
					name: user.name,
					email: user.email,
					token: generateToken(user._id),
				},
			});
		} else {
			return res.status(401).json({
				success: false,
				error: "Wrong email or password",
			});
		}
	} catch (e) {
		return res.status(500).json({
			success: false,
			error: "Server error",
		});
	}
};

const register = async (req, res) => {
	try {
		const { name, email, password, isAdmin } = req.body;

		if (isAdmin) {
			return res.status(400).json({
				success: false,
				error: "Only admin can make you admin",
			});
		}

		const existingUser = await User.findOne({ email: email });

		if (existingUser) {
			return res.status(400).json({
				success: false,
				error: "Email already exist",
			});
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
					token: generateToken(savedUser._id),
				},
			});
		} else {
			res.status(400).json({
				success: false,
				error: "Invalid user data",
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			error: "Server error",
		});
	}
};

const updateUserProfile = async (req, res) => {
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
			return res.status(400).json({
				success: false,
				error: "Only admin can make you admin",
			});
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
		return res.status(500).json({
			success: false,
			error: "Server error",
		});
	}
};

module.exports = { login, register, updateUserProfile };
