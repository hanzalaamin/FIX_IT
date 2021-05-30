const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["access_token"];
	}
	return token;
};

// Authorization
passport.use(
	new jwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: "FixIt2021",
		},
		(payload, done) => {
			User.findById({ _id: payload.sub }, (err, user) => {
				if (err) return done(err, false);
				if (user) return done(null, user);
				else return done(null, false);
			});
		}
	)
);

// Authentication local strategy using email and password
// module.exports = function (passport) {
passport.use(
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
		// Match User Email
		// User.findOne({ email })
		// 	.then((user) => {
		// 		if (!user) {
		// 			return done(null, false, {
		// 				message: "That email is not registered",
		// 			});
		// 		}

		// 		// Match Password
		// 		bcrypt.compare(password, user.password, (err, isMatch) => {
		// 			if (err) throw err;

		// 			if (isMatch) {
		// 				return done(null, user, {
		// 					message: "Password incorrect",
		// 				});
		// 			}
		// 		});
		// 	})
		// 	.catch((err) => console.log(err));

		User.findOne({ email }, (err, user) => {
			// something went wrong with database
			if (err) {
				return done(err);
			}
			// if no user exist
			if (!user) {
				return done(null, false);
			}
			// check if password is correct
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) throw err;

				if (isMatch) {
					return done(null, user, {
						message: "Password incorrect",
					});
				}
			});
		});
	})
);

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	User.findById(id, (err, user) => {
// 		done(err, user);
// 	});
// });
// };

// passport.use(
// 	new LocalStrategy((email, password, done) => {
// 		User.findOne({ email }, (err, user) => {
// 			// something went wrong with database;
// 			if (err) return done(err);
// 			// if no user exist
// 			if (!user) return done(null, false);
// 			bcrypt.compare(password, user.password, (err, isMatch) => {
// 				if (err) throw err;

// 				if (isMatch) {
// 					return done(null, user, {
// 						message: "Password incorrect",
// 					});
// 				}
// 			});
// 		});
// 	})
// );
