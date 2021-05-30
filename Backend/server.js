const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const passport = require("passport");
const cookerParser = require("cookie-parser");
const app = express();
require("dotenv").config();
// require("./src/config/passport")(passport);

const URI = process.env.URI;
mongoose.connect(
	URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => {
		console.log("Database connected");
	}
);

// app.use(cors());
app.use(cookerParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/", require("./src/routes/users"));
app.use("/", require("./src/routes/complaint"));
app.use("/", require("./src/routes/comment"));

const Port = 2000 || process.env.Port;
app.listen(Port, () => {
	console.log(`\nServer Started at : ${Port}\n`);
});
