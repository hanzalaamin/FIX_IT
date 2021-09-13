const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	username: { type: String, unique: true, lowercase: true },
	email: { type: String, unique: true, lowercase: true },
	password: { type: String },
	complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }],
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", User);
