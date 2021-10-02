const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		const verify = jwt.verify(token, process.env.SECRET_KEY);
		console.log(verify);
		const user = await User.findOne({ _id: verify._id });
		console.log(user);
		console.log(req.token);
		next();
	} else return res.status(401).send({ message: "You are not authorized", msgType: true });
};

module.exports = auth;
