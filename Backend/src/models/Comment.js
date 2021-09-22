const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
	comment: { type: String },
	postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", Comment);
