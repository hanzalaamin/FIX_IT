import React from "react";
import { NavLink } from "react-router-dom";

const NavbarItem = ({ to, onClose, children, icon }) => {
	return (
		<li>
			<NavLink
				to={to}
				onClick={onClose}
				className="font-medium block text-lg hover:text-blue-500 py-5 px-4 "
			>
				<i className={icon + " mr-4"}></i>
				<span>{children}</span>
			</NavLink>
		</li>
	);
};

export default NavbarItem;
