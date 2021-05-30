const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
	postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	text: String,
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", Comment);
