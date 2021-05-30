import React, { useContext } from "react";
import NavbarItems from "./NavbarItems/NavbarItems";
import classes from "./Navbar.module.scss";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../UI/Logo/Logo";
// import AuthService from "../../services/AuthService";
// import { Link } from "react-router-dom";

const Navbar = (props) => {
	const { isAuthenticated } = useContext(AuthContext);

	// const onLogout = () => {
	// 	AuthService.logout().then((data) => {
	// 		if (data.success) {
	// 			setUser(data.user);
	// 			setIsAuthenticated(false);
	// 		}
	// window.location("/login");
	// 	});
	// };

	return (
		<div className={classes.Navbar}>
			{
				!isAuthenticated ? <NavbarItems /> : <Logo />
				// (
				// 	<Link to="/logout">
				// 		<button onClick={onLogout}>Logout</button>
				// 	</Link>
				// )
			}
		</div>
	);
};

export default Navbar;
