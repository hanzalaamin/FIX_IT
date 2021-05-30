import React, { useState } from "react";
import cssClasses from "./ComplaintMenu.module.scss";
import SideBar from "../Sidebar/Sidebar";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Complaints from "../../../services/Complaints";
import Navbar from "../../Navbar/Navbar";
import Grid from "@material-ui/core/Grid";
import { ErrorAlert, SuccessAlert } from "../../../errors/Error";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import NativeSelect from "@material-ui/core/NativeSelect";
// import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiOutlinedInput-root": {
			borderRadius: `0`,
			backgroundColor: "white",
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#80a8cc",
		},
		"& .MuiButton-root:hover": {
			backgroundColor: "#80a8cc",
		},
	},
	input: {
		width: "100%",
		marginBottom: theme.spacing(3),
		marginTop: theme.spacing(3),
		borderRadius: "0px",
	},
	formControl: {
		marginBottom: theme.spacing(3),
		minWidth: "100%",
	},
	textArea: {
		marginBottom: theme.spacing(3),
	},
	// TextareaAutosize: {
	// 	width: "100%",
	// 	borderRadius: "0",
	// },
	Button: {
		marginBottom: theme.spacing(3),
		borderRadius: "0",
		backgroundColor: "#80a8cc",
	},
}));

const ComplaintMenu = () => {
	const classes = useStyles();
	const [complaint, setComplaint] = useState({
		complaintname: "",
		sector: "",
		category: "",
		description: "",
	});
	const [msg, setMsg] = useState("");
	const { complaintname, sector, category, description } = complaint;

	const inputChangeHandler = (e) => {
		setComplaint({ ...complaint, [e.target.name]: e.target.value });
	};

	const emptyForm = () => {
		setComplaint({
			complaintname: "",
			sector: "",
			category: "",
			description: "",
		});
	};

	const submit = (e) => {
		e.preventDefault();
		if (complaintname === "" && sector === "" && category === "" && description === "") {
			setMsg(<ErrorAlert>Please Fill All Credentials</ErrorAlert>);
		} else {
			Complaints.registerComplaint(complaintname, sector, category, description).then((data) => {
				const { message } = data;
				setMsg(<SuccessAlert>{message.msgBody}</SuccessAlert>);
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			});
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
		<>
			<div className={cssClasses.ComplaintMenu}>
				<Navbar />
				<div className={cssClasses.Main}>
					<div className={cssClasses.Sidebar}>
						<SideBar />
					</div>

					{/* <div className={classes.Menu}>
				{menus.map((menu) => (
					<Link key={menu.value} to={menu.link}>
					<div className={classes.MenuItems}>
					<p>{menu.value}</p>
					</div>
					</Link>
					))}
				</div> */}
					{/* <main className={cssClasses.Main}> */}
					<Container>
						<Grid item md={10} xs={12} sm={12} lg={8}>
							<div className={cssClasses.FormSection}>
								<h2>Register Complaint</h2>
								{msg ? msg : null}
								<form className={classes.root} onSubmit={submit}>
									<TextField
										className={classes.input}
										id="name"
										type="text"
										name="complaintname"
										label="Enter Name of Complaint"
										variant="outlined"
										onChange={inputChangeHandler}
									/>
									{/* <Autocomplete
							id="grouped-demo"
							options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
							// groupBy={(option) => option.firstLetter}
							getOptionLabel={(option) => option.Area}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									label="Select Area"
									name="sector"
									variant="outlined"
									onChange={inputChangeHandler}
								/>
							)}
						/> */}

									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel htmlFor="outlined-age-native-simple">Area</InputLabel>
										<Select
											fullWidth
											native
											label="Sector"
											name="sector"
											onChange={inputChangeHandler}
										>
											<option aria-label="None" value="" />
											{Sectors.map((sector) => (
												<option key={sector.Area} value={sector.Area}>
													{sector.Area}
												</option>
											))}
											{/* <option value="sanitation">Sanitation</option>
								<option value="electricity">Electricity</option>
								<option value="other">Other</option> */}
										</Select>
									</FormControl>

									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
										<Select
											fullWidth
											native
											label="Category"
											name="category"
											onChange={inputChangeHandler}
										>
											<option aria-label="None" value="" />
											<option value="Water">Water</option>
											<option value="Sanitation">Sanitation</option>
											<option value="Electricity">Electricity</option>
											<option value="Other">Other</option>
										</Select>
									</FormControl>
									{/* <TextareaAutosize
							className={classes.TextareaAutosize}
							rowsMax={4}
							placeholder="Complaint Description"
						/> */}
									<TextField
										className={classes.textArea}
										label="Enter Description Here ..."
										name="description"
										rows={4}
										fullWidth
										multiline
										variant="outlined"
										onChange={inputChangeHandler}
									/>
									<Button
										variant="outlined"
										type="submit"
										fullWidth
										size="large"
										className={classes.Button}
									>
										Submit
									</Button>
								</form>
							</div>
						</Grid>
					</Container>
					{/* </main> */}
				</div>
			</div>
		</>
	);
};

export default ComplaintMenu;
