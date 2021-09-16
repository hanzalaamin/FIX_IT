import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import AuthService from "../../../services/AuthService";
import Backdrop from "../Backdrop/Backdrop";
import Cross from "../../../assets/svgs/cross.svg";
import NavbarItem from "../../Navbar/NavbarItems/NavbarItem/NavbarItem";

const Sidebar = (props) => {
	let joinClasses = "transform -translate-x-full lg:translate-x-0 transition duration-500 ease-in";
	if (props.show) {
		joinClasses = " ";
	}

	const { setUser, setIsAuthenticated, isAuthenticated, user } = useContext(AuthContext);

	const onLogout = () => {
		AuthService.logout().then((data) => {
			if (data.success) {
				setUser(data.user);
				setIsAuthenticated(false);
				props.history.push("/login");
			}
		});
	};

	return (
		<React.Fragment>
			<Backdrop close={props.closeBackDrop} show={props.openBackDrop}></Backdrop>

			{!isAuthenticated ? (
				<aside
					className={
						joinClasses.join(" ") +
						"  fixed top-0 transition duration-500 ease-in w-72 h-full overflow-y-auto z-30 bg-white border-r lg:hidden"
					}
				>
					<div className="z-30">
						<div className="">
							<div className="cursor-pointer lg:hidden">
								<img
									src={Cross}
									className=" rounded-full hover:shadow-lg"
									onClick={props.closeSideDrawer}
									alt=""
								/>
							</div>
						</div>
						<div>
							<ul className="m-0 p-0">
								<NavbarItem icon="fas fa-sign-in-alt" to="/login">
									Login
								</NavbarItem>
								<NavbarItem icon="fas fa-user-plus" to="/register">
									Sign up
								</NavbarItem>
							</ul>
						</div>
					</div>
				</aside>
			) : (
				// <aside
				// 	className={
				// 		joinClasses.join(" ") +
				// 		"  fixed transition duration-500 ease-in w-72 lg:w-1/5 h-screen overflow-y-auto z-50 scrollbar scrollbar-hidden hover:scrollbar-auto scrollbar-track-transparent scrollbar-thumb-gray-500 border-r bg-white"
				// 	}
				// >
				// 	<div className="pt-12 pb-4 bg-gray-800">
				// 		<div className="absolute right-4 top-2 cursor-pointer lg:hidden">
				// 			<img src={Cross} onClick={props.closeSideDrawer} />
				// 		</div>
				// 		<div className="flex items-center justify-center flex-col h-full">
				// 			<img
				// 				className="rounded-full border border-gray-300 w-24 h-24"
				// 				src={profileImage}
				// 			/>
				// 			<div className="mt-4 w-full text-center">
				// 				<h3 className="font-semibold text-xl">John Doe</h3>
				// 			</div>
				// 			<div className="mt-8 border- border-gray-300 border- py-4 w-full text-center">
				// 				<div className="flex justify-around grid-cols-3 w-full">
				// 					<div>
				// 						<h1 className="font-bold text-2xl text-gray-400">2</h1>
				// 						<p className="text-sm text-gray-400 font-medium mt-2">Posts</p>
				// 					</div>
				// 					<div>
				// 						<h1 className="font-bold text-2xl text-gray-400">5</h1>
				// 						<p className="text-sm text-gray-400  font-medium mt-2">Followers</p>
				// 					</div>
				// 					<div>
				// 						<h1 className="font-bold text-2xl text-gray-400">10</h1>
				// 						<p className="text-sm text-gray-400  font-medium mt-2">Following</p>
				// 					</div>
				// 				</div>
				// 			</div>
				// 		</div>
				// 	</div>
				// 	<div>
				// 		<ul className="m-0 p-0">
				// 			<NavbarItem icon="fas fa-home" to="/home">
				// 				Home
				// 			</NavbarItem>
				// 			<NavbarItem icon="" to="/">
				// 				Add Feed
				// 			</NavbarItem>
				// 		</ul>
				// 	</div>
				// </aside>

				// className={
				// 		joinClasses.join(" ") +
				// 		"  fixed transition duration-500 ease-in w-72 lg:w-1/5 h-screen overflow-y-auto z-50 scrollbar scrollbar-hidden hover:scrollbar-auto scrollbar-track-transparent scrollbar-thumb-gray-500 border-r bg-white"
				// 	}>
				<aside
					className={
						joinClasses +
						" fixed z-40 flex flex-col bg-gray-800 w-72 h-screen px-4 text-gray-900 transition duration-500 ease-in transform"
					}
				>
					<button
						onClick={props.closeSideDrawer}
						className="lg:hidden absolute top-4 right-2 p-2 rounded-full text-gray-100 active:bg-gray-100 active:text-gray-800"
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.3346 1.66602L1.66797 12.3327M12.3346 12.3327L1.66797 1.66602L12.3346 12.3327Z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</button>
					<div className="flex flex-row items-center justify-center py-10 border-b border-gray-300">
						<div>
							<img
								src="https://randomuser.me/api/portraits/women/27.jpg"
								className="mx-aut w-20 h-20 rounded-full"
								alt=""
							/>
						</div>
						<div className="ml-6">
							<span className="font-bold text-xl capitalize text-white">
								{user.username}
							</span>
							{/* <button class="bg-green-500 text-white px-4 py-2 rounded-md  hover:bg-white hover:text-green-500">
								Premium
							</button> */}
						</div>
					</div>
					<div className="py-4 mb-4">
						<ul className="ml-4">
							<Link
								to={`/${user.username}`}
								className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black hover:bg-gray-300  hover:font-bold rounded-lg"
							>
								<span>
									<svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
										<path
											d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                        4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                        4h4v-4h-4M4 8h4V4H4v4z"
										></path>
									</svg>
								</span>

								<span className="ml-2">Home</span>
							</Link>
							{/* <li class="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded-lg">
								<span>
									<svg
										class="fill-current h-5 w-5 "
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
											fill="currentColor"
										/>
										<path
											d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
											fill="currentColor"
										/>
									</svg>
								</span>
								<a href="#">
									<span class="ml-2">Register Complaint</span>
								</a>
							</li> */}

							<Link
								// onClick={() => {
								// 	props.history.push(`/${user._id}/${user.username}/complaint`);
								// }}
								to={`/${user.username}/register_complaint`}
								className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black hover:bg-gray-300  hover:font-bold rounded-lg"
							>
								<span>
									<svg
										className="fill-current h-5 w-5 "
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
											fill="currentColor"
										/>
										<path
											d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
											fill="currentColor"
										/>
									</svg>
								</span>
								<span className="ml-2">Add Complaint</span>
							</Link>

							<Link
								to={`/${user.username}/analytics`}
								className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded-lg"
							>
								<span>
									{/* <svg
										className="fill-current h-5 w-5 "
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
											fill="currentColor"
										/>
										<path
											d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
											fill="currentColor"
										/>
									</svg> */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="feather feather-bar-chart"
									>
										<line x1="10" y1="20" x2="10" y2="10"></line>
										<line x1="15" y1="20" x2="15" y2="4"></line>
										<line x1="5" y1="20" x2="5" y2="16"></line>
									</svg>
								</span>
								<span className="ml-2">Statistic</span>
							</Link>
							<Link
								to={`/${user.username}/settings`}
								className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black hover:bg-gray-300  hover:font-bold rounded-lg"
							>
								<span>
									<svg
										className="fill-current h-5 w-5 "
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
											fill="currentColor"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z"
											fill="currentColor"
										/>
									</svg>
								</span>

								<span className="ml-2">Settings</span>
							</Link>
							<button
								className="w-full mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black hover:bg-gray-300  hover:font-bold rounded-lg cursor-pointer"
								onClick={onLogout}
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
								<span className="ml-2">Logout</span>
							</button>
						</ul>
					</div>
				</aside>
			)}
		</React.Fragment>
	);
};
export default withRouter(Sidebar);
