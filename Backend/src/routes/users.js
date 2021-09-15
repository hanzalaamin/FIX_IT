const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportConfig = require("../config/passport").config;
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const signToken = (userID) => {
	return JWT.sign(
		{
			iss: SECRET_KEY,
			sub: userID,
		},
		SECRET_KEY,
		{ expiresIn: "1h" }
	);
};

// Login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email && !password) {
		res.status(400).send({ message: "Please enter all credentials", msgType: true });
	} else if (!email) {
		res.status(400).send({ message: "Please enter email", msgType: true });
	} else if (!password) {
		res.status(400).send({ message: "Please enter password", msgType: true });
	} else {
		const user = await User.findOne({ email: email });
		if (!user) {
			res.status(400).send({ message: "Invalid credentials", msgType: true });
		} else if (user) {
			const isPasswordMatch = await bcrypt.compare(password, user.password);
			if (!isPasswordMatch)
				res.status(400).send({ message: "Invalid credentials", msgType: true });
			else {
				const token = signToken(user._id);
				res.cookie("access_token", token, { httpOnly: true, sameSite: "none", secure: true });
				res.status(200).send({
					message: "Login successfully",
					msgType: false,
					isAuthenticated: true,
					user,
				});
			}
		}
	}
	// res.status(200).send({ isAuthenticated: true });

	// else {
	// 	User.findOne({ email }, (err, user) => {
	// 		if (!user) {
	// 			return res.status(400).send({ message: "Email not found", msgType: true });
	// 		} else {
	// 			if (req.isAuthenticated()) {
	// 				const token = signToken(_id);
	// 				res.cookie("access_token", token, { httpOnly: true, sameSite: true });
	// 				res.status(200).send({ isAuthenticated: true, user: { _id, email } });
	// 			}
	// 		}
	// 	});
	// }
});

// Register
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	console.log(req.body);

	// let regEmail =
	// 	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!username && !email && !password) {
		res.status(400).send({ message: "Please enter all credentials", msgType: true });
	} else if (username.length < 4) {
		if (!username) {
			res.status(400).send({ message: "Please enter username", msgType: true });
		} else {
			res.status(400).send({ message: "Username must be atleast 4 characters", msgType: true });
		}
	} else if (!email) {
		res.status(400).send({ message: "Please enter email", msgType: true });
	} else if (!password) {
		res.status(400).send({ message: "Please enter password", msgType: true });
	}
	// } else if (!regEmail.test(email)) {
	// 	res.status(400).send({ message: "Please enter valid email", msgType: true });
	else if (password.length < 8 || password.length > 16) {
		if (!password) {
			res.status(400).send({ message: "Please enter password", msgType: true });
		} else {
			res.status(400).send({
				message: "Password must be between 8 to 16 characters",
				msgType: true,
			});
		}
	} else {
		try {
			const email_found = await User.findOne({ email });
			const username_found = await User.findOne({ username });

			if (email_found) {
				res.status(400).send({ message: "Email Already Exist", msgType: true });
			} else if (username_found)
				res.status(400).send({ message: "Username Already Exist", msgType: true });
			else {
				const newUser = new User({
					username,
					email,
					password,
				});
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser.save((err) => {
							if (err) {
								res.status(500).send({
									message: "Error occured",
									msgType: true,
								});
							} else {
								res.status(201).send({
									message: "Account successfully created",
									msgType: false,
								});
							}
						});
					});
				});
			}
		} catch (err) {
			res.send({ message: "Random Error occured" });
		}
	}
});

router.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
	res.clearCookie("access_token");
	res.json({ message: "You logout successfully", user: "", success: true });
});

router.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
	const user = req.user;
	res.status(200).send({ isAuthenticated: true, user });
});

module.exports = router;
