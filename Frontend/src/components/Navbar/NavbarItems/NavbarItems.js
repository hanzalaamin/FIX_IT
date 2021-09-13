import React from "react";
import NavbarItem from "./NavbarItem/NavbarItem";
import classes from "./NavbarItems.module.scss";

const NavbarItems = (props) => {
	return (
		<ul className={classes.NavbarItems}>
			<NavbarItem to="/" onClose={props.onClick}>
				Home
			</NavbarItem>
			<NavbarItem to="/login" onClose={props.onClick}>
				Login
			</NavbarItem>
			<NavbarItem to="/register" onClose={props.onClick}>
				Sign up
			</NavbarItem>
		</ul>
	);
};

export default NavbarItems;
