import React from "react";
// import { makeStyles, createStyles } from "@material-ui/core/styles";
// import Alert from "@material-ui/lab/Alert";
// import Collapse from "@material-ui/core/Collapse";

// const useStyles = makeStyles((theme) =>
// 	createStyles({
// 		root: {
// 			marginBottom: theme.spacing(2),
// 			width: "100%",
// 			"& > * + *": {
// 				marginTop: theme.spacing(2),
// 			},
// 			"& .MuiAlert-root": {
// 				borderRadius: "0.6rem",
// 				padding: "20px",
// 				fontSize: "16px",
// 			},
// 			transition: "all 1s ease-in",
// 		},
// 	})
// );

export function Message(props) {
	// const classes = useStyles();

	return (
		// <div className="">
		// <Alert
		// 	onClose={props.close}
		// 	variant="standard"
		// 	icon={false}
		// 	severity={props.alert}
		// 	color="info"
		// 	className="py-8"
		// >
		// 	{props.children}
		// </Alert>
		// </div>
		<div className="absolute w-full -top-20 px-4 py-5 text-alertText bg-alertBg rounded-lg">
			<p>{props.children}</p>
			<span onClick={props.close} className="cursor-pointer absolute top-5 right-0 mr-4 p-1">
				<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
					<path
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
						fillRule="evenodd"
					></path>
				</svg>
			</span>
		</div>
	);
}
