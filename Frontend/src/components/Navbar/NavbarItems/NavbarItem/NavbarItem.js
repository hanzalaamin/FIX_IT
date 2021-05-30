import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavbarItem.module.scss";

const NavbarItem = (props) => {
	return (
		<li className={classes.NavbarItem}>
			<Link to={props.link}>{props.children}</Link>
		</li>
	);
};

export default NavbarItem;
