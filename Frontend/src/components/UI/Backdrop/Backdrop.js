import React from "react";
// import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
	return props.show ? (
		<div
			onClick={props.close}
			className="fixed top-0 left-0 w-full h-full z-20 transition duration-500 ease-in bg-opacity-50 bg-black lg:hidden "
		></div>
	) : null;
};
export default Backdrop;
