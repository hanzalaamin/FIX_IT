const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });
const app = express();

const URI = process.env.URI;
mongoose.connect(
	URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => {
		console.log("Database connected");
	}
);

// const { MongoClient } = require("mongodb");

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect((err) => {
// 	const collection = client.db("test").collection("devices");
// 	// perform actions on the collection object
// 	client.close();
// });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", require("./src/routes/users"));
app.use("/", require("./src/routes/complaint"));
app.use("/", require("./src/routes/comment"));
app.use("/", require("./src/routes/Vote"));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
	console.log(`\nServer is running on http://localhost:${PORT}\n`);
});
