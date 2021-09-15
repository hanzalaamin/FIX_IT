import React from "react";
import classes from "./Spinner.module.css";

const Spinner = () => {
	// return <div className="w-12 h-12 border-4 border-blue-600 rounded-full loader"></div>;
	return (
		<div className="h-screen flex items-center justify-center bg-white">
			<div className={classes.loader}>Loading...</div>;
		</div>
	);
};

export default Spinner;
