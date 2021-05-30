const express = require("express");
const passport = require("passport");
const Complaint = require("../models/Complaints");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
	Complaint.find({}, (err, complaints) => {
		if (err) {
			res.status(400).json({ message: { msgBody: err } });
		} else {
			res.json(complaints);
		}
	});
});

// Get User Complaint in home page
router.get("/complaints", passport.authenticate("jwt", { session: false }), (req, res) => {
	// User.findById({ _id: req.user._id })
	// 	.populate("complaints")
	// 	.exec((err, complaints) => {
	// 		if (err) {
	// 			res.status(400).json({ message: { msgBody: err } });
	// 		} else {
	// 			res.json(complaints);
	// 		}
	// 	});

	Complaint.find({ postedBy: req.user._id }, (err, complaints) => {
		if (err) {
			res.status(400).json({ message: { msgBody: err } });
		} else {
			res.json(complaints);
		}
	});
});

// Add User Complaint
router.post("/:id/complaint", passport.authenticate("jwt", { session: false }), (req, res) => {
	const newComplaint = new Complaint({
		complaintname: req.body.complaintname,
		sector: req.body.sector,
		category: req.body.category,
		description: req.body.description,
		postedBy: req.params.id,
	});

	newComplaint.save((err) => {
		if (err) {
			res.status(500).json({
				message: { msgBody: "Complaint not added", msgError: true },
			});
		} else {
			req.user.complaints.push(newComplaint);
			req.user.save((err) => {
				if (err)
					res.status(500).json({
						message: { msgBody: "Error has occured", msgError: true },
					});
				else
					res.status(200).json({
						message: { msgBody: "Successfully added", msgError: false },
					});
			});
		}
	});
});

// Detete Complaint
router.delete("/complaint/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	// console.log(req.user._id, req.params.id);
	Complaint.deleteOne({ _id: req.params.id }, (err, deleted) => {
		if (err) {
			res.status(500).json({
				message: { msgBody: "Complaint is not deleted", msgError: true },
			});
		} else {
			User.updateOne(
				{ _id: req.user._id },
				{ $pull: { complaints: req.params.id } },
				(err, deleted) => {
					if (err) {
						res.status(500).json({
							message: {
								msgBody: "Complaint Not Successfully Deleted",
								msgError: true,
							},
						});
					} else {
						res.status(200).json({
							message: {
								msgBody: "Complaint Successfully Deleted",
								msgError: false,
							},
						});
					}
				}
			);
		}
	});
});

module.exports = router;
