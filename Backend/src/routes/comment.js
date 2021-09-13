const express = require("express");
const passport = require("passport");
const Complaint = require("../models/Complaints");
const Comment = require("../models/Comment");
// const User = require("../models/user");
const router = express.Router();

// Getting Complaints With Populating Comments
router.get(
	"/:id/complaint/:id/comments",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Complaint.findById({ _id: req.params.id })
			.populate("comments")
			.exec((err, comments) => {
				if (err) {
					res.status(400).json({ message: { msgBody: err } });
				} else {
					res.json(comments);
				}
			});
	}
);

// Adding Comment By Complaint ID
router.post(
	"/:id/complaint/:id/comment",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		console.log(req.body.text);

		if (req.body.text === "") {
			res.status(500).json({
				message: { msgBody: "Comment not added", msgError: true },
			});
		} else {
			const newComment = new Comment({
				text: req.body.text,
				postedBy: req.user._id,
			});

			newComment.save((err) => {
				if (err) {
					res.status(500).json({
						message: { msgBody: "Comment not added", msgError: true },
					});
				} else {
					Complaint.updateOne(
						{ _id: req.params.id },
						{
							$push: {
								comments: newComment.id,
							},
						},
						(err, addedComment) => {
							if (err) {
								res.status(500).json({
									message: {
										msgBody: "Comment not Successfully added",
										msgError: true,
									},
								});
							} else {
								res.status(200).json({
									message: {
										msgBody: "Comment Successfully Added",
										msgError: false,
									},
								});
							}
						}
					);
				}
			});
		}
	}
);

// Detete Comment
router.delete(
	"/:id/complaint/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Comment.deleteOne({ _id: req.params.comment_id }, (err, deleted) => {
			if (err) {
				res.status(500).json({
					message: { msgBody: "Comment is not deleted", msgError: true },
				});
			} else {
				Complaint.updateOne(
					{ _id: req.params.id },
					{ $pull: { comments: req.params.comment_id } },
					(err, deleted) => {
						if (err) {
							res.status(500).json({
								message: {
									msgBody: "Comment not Successfully deleted ",
									msgError: true,
								},
							});
						} else {
							res.status(200).json({
								message: {
									msgBody: "Comment Successfully deleted",
									msgError: false,
								},
							});
						}
					}
				);
			}
		});
	}
);

// Updating existing Comment
router.put(
	"/:id/complaint/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const updatedComment = {
			text: req.body.text,
		};
		Comment.findByIdAndUpdate({ _id: req.params.comment_id }, updatedComment, (err, updated) => {
			if (err) {
				res.status(500).json({
					message: { msgBody: "Comment not updated", msgError: true },
				});
			} else {
				res.status(500).json({
					message: { msgBody: "Comment updated", msgError: false },
				});
			}
		});
	}
);

module.exports = router;
