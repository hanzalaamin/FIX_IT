const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vote = new Schema({
	// complaint: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },
	votedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vote", Vote);
