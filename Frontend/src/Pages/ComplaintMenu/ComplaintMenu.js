import React, { useState } from "react";

// import cssClasses from "./ComplaintMenu.module.scss";
// import Container from "@material-ui/core/Container";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
// import Button from "@material-ui/core/Button";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import Grid from "@material-ui/core/Grid";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import NativeSelect from "@material-ui/core/NativeSelect";
// import axios from "axios";

import Complaints from "../../services/Complaints";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import { Message } from "../../Messages/Message";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		"& .MuiOutlinedInput-root": {
// 			borderRadius: `0`,
// 			// backgroundColor: "white",
// 		},
// 		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
// 			borderColor: "#80a8cc",
// 		},
// 		"& .MuiButton-root:hover": {
// 			// backgroundColor: "#80a8cc",
// 		},
// 	},
// 	input: {
// 		width: "100%",
// 		marginBottom: theme.spacing(3),
// 		marginTop: theme.spacing(3),
// 		borderRadius: "0px",
// 	},
// 	formControl: {
// 		marginBottom: theme.spacing(3),
// 		minWidth: "100%",
// 	},
// 	textArea: {
// 		marginBottom: theme.spacing(3),
// 	},
// 	Button: {
// 		marginBottom: theme.spacing(3),
// 		borderRadius: "0",
// 		backgroundColor: "#80a8cc",
// 	},
// }));

const ComplaintMenu = () => {
	// const classes = useStyles();
	const [complaint, setComplaint] = useState({
		complaintname: "",
		sector: "",
		category: "",
		description: "",
	});
	const [msg, setMsg] = useState("");
	const { complaintTitle, sector, category, description } = complaint;

	const inputChangeHandler = (e) => {
		setComplaint({ ...complaint, [e.target.name]: e.target.value });
	};

	const emptyForm = () => {
		setComplaint({
			complaintTitle: "",
			sector: "",
			category: "",
			description: "",
		});
	};

	const submit = (e) => {
		console.log(complaintTitle, sector, category, description);
		e.preventDefault();
		if (!complaintTitle && !sector && !category && !description) {
			setMsg(<Message close={() => setMsg(null)}>Please Fill All Credentials</Message>);
		} else {
			Complaints.registerComplaint(complaintTitle, sector, category, description).then(
				(data) => {
					const { message } = data;
					setMsg(<Message>{message.msgBody}</Message>);
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				}
			);
		}
		emptyForm();
	};
	const Sectors = [{ Area: "G-10" }, { Area: "G-11" }, { Area: "G-9" }, { Area: "G-8" }];
	// const options = Sectors.map((option) => {
	// 	const firstLetter = option.Area[0].toUpperCase();
	// 	return {
	// 		firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
	// 		...option,
	// 	};
	// });

	return (
		<div className="w-full flex">
			<div className="w-1/5">
				<Sidebar
				// show={showDrawer}
				// closeBackDrop={openSideDrawer}
				// openBackDrop={showDrawer}
				// closeSideDrawer={closeSideDrawer}
				/>
			</div>
			<div className="w-4/5">
				<Navbar />
				<div className="py-10">
					<form className="mx-auto w-1/2" onSubmit={submit}>
						{msg ? msg : null}
						<div className="mb-6">
							<label className="font-semibold text-lg mb-1 block">Complaint Name:</label>
							<input
								className="w-full ring-1 ring-gray-300 rounded-lg h-16 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								type="text"
								name="complaintTitle"
								value={complaintTitle}
								onChange={inputChangeHandler}
							/>
						</div>
						<div className="mb-6">
							<label className="font-semibold text-lg mb-1 block">Select Area:</label>
							<input
								className="w-full ring-1 ring-gray-300 rounded-lg h-16 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								type="text"
								name="sector"
								value={sector}
								onChange={inputChangeHandler}
							/>
						</div>
						<div className="mb-6">
							<label className="font-semibold text-lg mb-1 block">Select Category:</label>
							<input
								className="w-full ring-1 ring-gray-300 rounded-lg h-16 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								type="text"
								name="category"
								value={category}
								onChange={inputChangeHandler}
							/>
						</div>
						<div className="mb-6">
							<label className="font-semibold text-lg mb-1 block">
								The Complaint is Regarding:
							</label>
							<textarea
								className="w-full ring-1 ring-gray-300 rounded-lg px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 py-2"
								name="description"
								rows="8"
								value={description}
								onChange={inputChangeHandler}
							></textarea>
						</div>
						<button
							type="submit"
							className="bg-blue-400 hover:bg-blue-500 mb-6 h-16 rounded-lg text-white w-full font-semibold"
						>
							SUBMIT
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ComplaintMenu;
