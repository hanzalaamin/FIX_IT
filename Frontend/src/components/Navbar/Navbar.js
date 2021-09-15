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
						<div className="font-medium block text-gray-700 text-lg hover:text-blue-700 mr-6 cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-bell"
							>
								<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
								<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
							</svg>
						</div>
						<div className="font-medium block text-gray-700 text-lg hover:text-blue-700 mr-6 cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
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
							<button className="w-full px-4 py-4 flex border-gray-300 text-left rounded-tr-lg rounded-tl-lg text-gray-500 hover:text-gray-100 hover:bg-gray-800">
								Profile
							</button>
							<button className="w-full px-4 py-4 flex border-gray-300 text-left text-gray-500 hover:text-gray-100 hover:bg-gray-800">
								Settings
							</button>
							<button
								onClick={onLogout}
								className="w-full px-4 py-4 flex border-gray-300 text-left rounded-br-lg rounded-bl-lg text-gray-500 hover:text-gray-100 hover:bg-gray-800"
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
								<span className="ml-4">Logout</span>
							</button>
						</div>
					</ul>
				</nav>
			)}
		</header>
	);
};

export default Navbar;
