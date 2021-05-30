import React from "react";
import NavbarItem from "./NavbarItem/NavbarItem";
import classes from "./NavbarItems.module.scss";

const NavbarItems = () => {
	return (
		<ul className={classes.NavbarItems}>
			<NavbarItem link="/login">Login</NavbarItem>
			<NavbarItem link="/register">Sign up</NavbarItem>
		</ul>
	);
};

export default NavbarItems;
