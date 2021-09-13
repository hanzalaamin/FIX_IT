import React, { useContext } from "react";
import NavbarItem from "./NavbarItems/NavbarItem/NavbarItem";
import classes from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../UI/Logo/Logo";
import Hamburger from "../../assets/svgs/hamburger.svg";
import { useState } from "react";
import Sidebar from "../UI/Sidebar/Sidebar";
import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";
// import Img from "../../assets/images/03.jpg";
import Bell from "../../assets/svgs/bell.svg";
// import messageSquare from "../../assets/svgs/messageSquare.svg";

const Navbar = (props) => {
	const { isAuthenticated, setUser, setIsAuthenticated } = useContext(AuthContext);
	const [showDrawer, setShowDrawer] = useState(false);
	const [dropDown, setDropDown] = useState(false);
	const history = useHistory();

	const onLogout = () => {
		AuthService.logout().then((data) => {
			if (data.success) {
				setUser(data.user);
				setIsAuthenticated(false);
				history.push("/login");
			}
		});
	};

	return (
		<header className={classes.Navbar}>
			{!isAuthenticated ? (
				<>
					<nav className={classes.nav}>
						<div className={classes.hamburger}>
							<img onClick={props.openSideDrawer} src={Hamburger} alt="" />
						</div>
						<Logo />
						<ul className="hidden lg:flex items-center justify-center flex-col lg:flex-row m-0 p-0">
							<NavbarItem to="/login">Login</NavbarItem>
							<NavbarItem to="/register">Sign up</NavbarItem>
						</ul>
					</nav>
				</>
			) : (
				<nav className="flex justify-between items-center px-10">
					<div
						className="lg:hidden cursor-pointer active:text-gray-300  active:bg-gray-800 rounded-full p-2"
						onClick={props.openSideDrawer}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							width="32px"
							height="32px"
							fill="currentColor"
						>
							<path d="M 4 7 L 4 9 L 28 9 L 28 7 Z M 4 15 L 4 17 L 28 17 L 28 15 Z M 4 23 L 4 25 L 28 25 L 28 23 Z" />
						</svg>
					</div>
					<Logo />
					<ul className="hidden md:flex items-center justify-center m-0 p-0">
						<div className="font-medium block text-lg hover:text-blue-500 mr-6">
							<img src={Bell} alt="" className="" />
						</div>
						<div className="font-medium block text-gray-600 text-lg hover:text-blue-700 mr-6 cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-message-square"
							>
								<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
							</svg>
						</div>
						<img
							className="w-10 h-10 rounded-lg cursor-pointer"
							src="https://randomuser.me/api/portraits/women/27.jpg"
							alt=""
							onClick={() => setDropDown(!dropDown)}
						/>

						<div
							className={
								"hidden md:block absolute top-14 right-10 w-48 bg-white border rounded-lg shadow-xl z-20 transition duration-500 ease-in-out " +
								(dropDown ? "transform scale-100" : "transform scale-0")
							}
						>
							<button className="block px-4 py-4 w-full text-sm capitalize hover:bg-gray-100 text-left rounded-tr-lg rounded-tl-lg">
								your profile
							</button>
							<button className="block px-4 py-4 w-full capitalize hover:bg-gray-100 text-left">
								settings
							</button>
							<button
								onClick={onLogout}
								className="w-full px-4 py-4 capitalize flex border-gray-300 text-left rounded-br-lg rounded-bl-lg hover:bg-gray-100"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-log-out h-5 w-5"
								>
									<path
										className="currentColor"
										d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
									></path>
									<polyline points="16 17 21 12 16 7"></polyline>
									<line x1="21" y1="12" x2="9" y2="12"></line>
								</svg>
								<span className="ml-4">sign out</span>
							</button>
						</div>
					</ul>
				</nav>
			)}
		</header>
	);
};

export default Navbar;
