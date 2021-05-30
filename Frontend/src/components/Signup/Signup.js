import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthService from "../../services/AuthService";
import { ErrorAlert } from "../../errors/Error";

import cssClasses from "./Signup.module.scss";
import Navbar from "../Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(0),
		"& .MuiOutlinedInput-root": {
			borderRadius: "0",
			backgroundColor: "white",
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#80a8cc",
		},
		"& .MuiButton-root:hover": {
			backgroundColor: "#80a8cc",
		},
	},
	paper: {
		marginTop: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		// marginTop: theme.spacing(0),
	},
	submit: {
		// margin: theme.spacing(3, 0, 2),
	},
	Button: {
		margin: "20px 0",
		borderRadius: "0",
		backgroundColor: "#80a8cc",
		padding: "15px 0",
	},
}));

const Signup = (props) => {
	const classes = useStyles();
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
	const { username, email, password } = user;

	const inputChangeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const Submit = (e) => {
		e.preventDefault();
		const User = { username, email, password };

		if (username === "" && email === "" && password === "") {
			setError(<ErrorAlert>Enter All Credentials</ErrorAlert>);
		}
		// if (username.length < 6) {
		// 	setError(<ErrorAlert>Username Must Have 6 Characters</ErrorAlert>);
		// }
		// if (password.length < 6) {
		// 	setError(<ErrorAlert>Password Must Have 6 Characters</ErrorAlert>);
		// }
		else {
			AuthService.register(User).then((data) => {
				const { message } = data;
				setMessage(<ErrorAlert>{message.msgBody}</ErrorAlert>);
				// if (!message.msgError === true) {
				// }
			});
			props.history.push("/login");
		}

		setUser({ ...user, username: "", email: "", password: "" });
	};
	return (
		<>
			<Navbar />
			<div className={cssClasses.Signup}>
				<CssBaseline />
				<Container component="main" maxWidth="xs">
					<div className={classes.paper}>
						<Avatar className={classes.avatar}></Avatar>
						<Typography className={cssClasses.Heading} component="h1" variant="h5">
							Sign up
						</Typography>
						{error ? error : null}
						{message ? message : null}
						<form className={classes.root} onSubmit={Submit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										fullWidth
										id="username"
										label="Username"
										name="username"
										autoComplete="username"
										onChange={inputChangeHandler}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										onChange={inputChangeHandler}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										onChange={inputChangeHandler}
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.Button}
							>
								Sign Up
							</Button>
							<Grid container justify="center">
								<Grid item>
									<Link to="/login" variant="body2">
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</div>
		</>
	);
};

export default withRouter(Signup);
