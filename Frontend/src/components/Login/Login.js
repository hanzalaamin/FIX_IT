import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import cssClasses from "./Login.module.scss";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Navbar from "../Navbar/Navbar";
import { ErrorAlert, SuccessAlert } from "../../errors/Error";

const useStyles = makeStyles((theme) => ({
	input: {
		width: "100%",
		marginBottom: "20px",
		borderRadius: "0px",
	},
	root: {
		marginTop: theme.spacing(2),
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
		display: "flex",
		flexFlow: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		borderRadius: "0",
	},
	paper: {
		marginTop: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		display: "flex",
		justifyContent: "center",
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	Button: {
		marginBottom: "10px",
		borderRadius: "0",
		backgroundColor: "#80a8cc",
		padding: "15px 0",
	},
}));

const Login = (props) => {
	const classes = useStyles();
	const [user, setUser] = useState({ email: "", password: "" });
	const [msg, setMsg] = useState(null);
	const [error, setError] = useState(null);
	const { email, password } = user;
	const authContext = useContext(AuthContext);

	const inputChangeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const submit = (e) => {
		e.preventDefault();
		const user = { email, password };
		if (password === "" && email === "") {
			setError(<ErrorAlert>PLease Enter All Credentials</ErrorAlert>);
		} else {
			AuthService.login(user).then((data) => {
				const { isAuthenticated, user, message } = data;
				const _id = user._id;
				if (isAuthenticated) {
					authContext.setUser(user);
					authContext.setIsAuthenticated(isAuthenticated);
					setMsg(<SuccessAlert>Login Successful</SuccessAlert>);
					props.history.push("/" + _id + "/home");
				} else {
					setMsg(message);
				}
			});
		}
		setUser({ ...user, email: "", password: "" });
	};
	return (
		<>
			<Navbar />
			<main className={cssClasses.Login}>
				<CssBaseline />
				<Container maxWidth="xs">
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
						<div className={cssClasses.Header}>
							<h1>Sign in</h1>
						</div>
						{error ? error : null}
						{msg ? msg : null}
						<form className={classes.root} onSubmit={submit}>
							<TextField
								className={classes.input}
								id="email"
								type="email"
								name="email"
								label="Email"
								variant="outlined"
								autoComplete="true"
								onChange={inputChangeHandler}
							/>
							<TextField
								className={classes.input}
								id="password"
								type="password"
								name="password"
								label="Password"
								variant="outlined"
								onChange={inputChangeHandler}
							/>
							<Button
								variant="contained"
								type="submit"
								fullWidth
								size="large"
								className={classes.Button}
							>
								SIGN IN
							</Button>
							<p>
								Don't have an account?&nbsp;&nbsp;
								<Link to="/register">Signup</Link>
							</p>
						</form>
					</div>
				</Container>
			</main>
		</>
	);
};

export default withRouter(Login);
