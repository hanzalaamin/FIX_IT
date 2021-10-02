const express = require("express");
const passport = require("passport");
const Complaint = require("../models/Complaints");
const Votes = require("../models/Votes");
const router = express.Router();

router.post("/:id/like", passport.authenticate("jwt", { session: false }), async (req, res) => {
	// console.log(req.body);
	const newVote = new Votes({
		votedBy: req.user._id,
		// complaint: req.body.id,
	});

	await newVote.save((err) => {
		if (err)
			res.status(500).json({
				message: { msgBody: "Vote is not added", msgError: true },
			});
		else {
			Complaint.updateOne(
				{ _id: req.params.id },
				{
					$push: {
						votes: req.user._id,
					},
				},
				(err, voteAdded) => {
					if (err) {
						res.status(500).json({
							message: { msgBody: "Vote is not added", msgError: true },
						});
					} else {
						res.status(500).json({
							message: { msgBody: "Vote added successfully", msgError: false },
						});
					}
				}
			);
		}
	});
});

router.delete(
	"/:id/dislike",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		await Complaint.updateOne(
			{ _id: req.params.id },
			{
				$pull: {
					votes: req.user._id,
				},
			},
			(err, voteDeleted) => {
				if (err) {
					res.status(500).json({
						message: { msgBody: "vote is not remove from complaint", msgError: true },
					});
				} else {
					Votes.deleteOne({ votedBy: req.user._id }, (err, voteDeleted) => {
						if (err) {
							res.status(500).json({
								message: { msgBody: "Vote is not deleted", msgError: true },
							});
						} else {
							res.status(500).json({
								message: { msgBody: "vote removed successfully", msgError: false },
							});
						}
					});
				}
			}
		);
	}
);

module.exports = router;
