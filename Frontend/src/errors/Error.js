import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			marginBottom: theme.spacing(2),
			width: "100%",
			"& > * + *": {
				marginTop: theme.spacing(2),
			},
			"& .MuiAlert-root": {
				borderRadius: "0",
			},
		},
	})
);

export function ErrorAlert(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Alert severity="error">{props.children}</Alert>
		</div>
	);
}

export function SuccessAlert(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Alert severity="success">{props.children}</Alert>
		</div>
	);
}
