const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const JWT_SECRET =
	"9e2d424ace2881d82528d9969ee468948444cde2d556f7f85b0c5cdaf4e5b357aead4efb";
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid Credentials" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid Credentials" });
		}
		const payload = {
			user: {
				_id: user._id,
			},
		};
		const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: "1hr" });
		res.status(200).json({ token });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: "server error",
		});
	}
});
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		user = new User({
			username,
			email,
			password: hashPassword,
		});
		const newUser = await user.save();
		const payload = {
			user: {
				_id: newUser._id,
			},
		};
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1hr" });
		res.status(201).json({ token });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: "server error",
		});
	}
});

module.exports = router;
