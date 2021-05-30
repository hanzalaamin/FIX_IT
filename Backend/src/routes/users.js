const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportConfig = require("../config/passport");
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const Complaint = require("../models/Complaints");
const router = express.Router();

// Login
// router.post("/login", (req, res, next) => {
// 	const { email } = req.body;
// 	let id = "";
// 	User.findOne({ email: email }).then((user) => {
// 		id = user.id;
// 	});
// 	passport.authenticate("local", {
// 		session: false,
// 		successRedirect: `/:${id}`,
// 		failureRedirect: "/",
// 	})(req, res, next);
// });

const signToken = (userID) => {
	return JWT.sign(
		{
			iss: "FixIt2021",
			sub: userID,
		},
		"FixIt2021",
		{ expiresIn: "1h" }
	);
};

// Login
router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
	if (req.isAuthenticated()) {
		const { _id, email } = req.user;
		const token = signToken(_id);
		res.cookie("access_token", token, { httpOnly: true, sameSite: true });
		res.status(200).json({ isAuthenticated: true, user: { _id, email } });
	}
});

// Register
router.post("/register", (req, res) => {
	const { username, email, password } = req.body;
	// if (!username || !email || !password) {
	// 	res.json({ message: { msgBody: "Fill all fields", msgError: true } });
	// }
	User.findOne({ email }, (err, user) => {
		if (err) {
			res.status(500).json({
				message: { msgBody: "Error Occured", msgError: true },
			});
		}
		if (user) {
			res.status(400).json({ message: { msgBody: "Email Already Exist", msgError: true } });
		} else {
			const newUser = new User({
				username,
				email,
				password,
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.catch((err) =>
							res.status(500).json({ message: { msgBody: "Error occured", msgError: true } })
						);
				});
			});
		}
	});
});

// Logout
// router.get("/logout", (req, res) => {
// 	req.logout();
// 	// res.redirect("/");
// });
router.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
	// req.logOut();
	// res.clearCookie("connect.sid");
	res.clearCookie("access_token");
	// res.json({ msg: "logout", success: true });
	res.json({ user: { email: "" }, success: true });
});

router.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
	const { email, _id } = req.user;
	res.status(200).json({ isAuthenticated: true, user: { email, _id } });
});

module.exports = router;
