const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Complaint = new Schema({
	complaintname: String,
	sector: String,
	category: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	votes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Vote",
		},
	],
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	username: String,
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", Complaint);
