import React, { useEffect, useState } from "react";
import Complaints from "../../services/Complaints";
import { Message } from "../../Messages/Message";
import searchIcon from "../../assets/svgs/search.svg";
import Img from "../../assets/images/03.jpg";
import thumbsUp from "../../assets/svgs/thumbsUp.svg";
import messageCircle from "../../assets/svgs/messageCircle.svg";

// import { makeStyles } from "@material-ui/core/styles";
// import { Container, Grid, TextField, Typography, Menu, MenuItem, Button } from "@material-ui/core";
// import { AppBar, Toolbar } from "@material-ui/core/";
// import IconButton from "@material-ui/core/IconButton";
// import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core/";
// import MoreIcon from "@material-ui/icons/MoreVert";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import cssClasses from "./Home.module.scss";
// import Comment from "../../services/Comment";
// import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/UI/Sidebar/Sidebar";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		"& .MuiOutlinedInput-root": {
// 			borderRadius: "0",
// 		},
// 		"& .MuiAccordionSummary-content.Mui-expanded": {
// 			margin: "0",
// 		},
// 		width: "100%",
// 		marginBottom: "10px",
// 	},
// 	title: {
// 		fontSize: 18,
// 		fontWeight: 600,
// 	},
// 	appBar: {
// 		padding: "10px",
// 		marginBottom: "30px",
// 		backgroundColor: "white",
// 		color: "black",
// 		boxShadow: "0 0 4px 1px lightgray",
// 		textAlign: "center",
// 		borderRadius: "0.6rem",
// 	},
// 	h6: {
// 		fontWeight: "600",
// 		color: "black",
// 	},
// 	moreIcon: {
// 		position: "absolute",
// 		right: "5px",
// 		top: "-10px",
// 	},
// 	heading: {
// 		fontSize: theme.typography.pxToRem(15),
// 		fontWeight: theme.typography.fontWeightRegular,
// 		borderRadius: "0",
// 	},
// 	accordion: {
// 		borderTop: "1px solid lightgray",
// 		borderRadius: 0,
// 		boxShadow: "none",
// 	},
// 	input: {
// 		width: "100%",
// 	},
// 	Button: {
// 		// marginBottom: theme.spacing(3),
// 		marginTop: theme.spacing(1),
// 		borderRadius: "0",
// 		// backgroundColor: "#80a8cc",
// 	},
// }));

const Home = () => {
	// const classes = useStyles();
	const [message, setMessage] = useState(null);
	const [complaints, setComplaints] = useState([]);
	const [complaintLength, setComplaintLength] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const [commentValue, setComment] = useState("");
	const [_ID, setID] = useState("");
	const [showDrawer, setShowDrawer] = useState(false);

	const openSideDrawer = () => {
		setShowDrawer(true);
	};
	const closeSideDrawer = () => {
		setShowDrawer(false);
	};

	function getID(ID) {
		return setID(ID);
	}

	useEffect(() => {
		Complaints.getComplaints().then((data) => {
			console.log(data);
			setComplaintLength(data.length);
			setComplaints(data);
		});
	}, []);

	const comment = (id) => {
		console.log(_ID);
		Comment.getComments(id).then((data) => {
			console.log(data);
		});
	};

	const inputChangeHandler = (e) => {
		setComment(e.target.value);
	};

	const submit = (e) => {
		e.preventDefault();
		console.log(_ID);
		console.log(commentValue);
		Comment.registerComment(_ID, commentValue).then((data) => console.log(data));
	};

	const openMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (id) => {
		setAnchorEl(null);
	};

	const deleteMenu = (id) => {
		Complaints.deleteComplaint(id).then((data) => {
			console.log(data);
			setMessage(<Message>{data.message.msgBody}</Message>);
			setTimeout(() => {
				window.location.reload();
			}, 1500);
		});
	};

	return (
		<div className="bg-white w-full flex">
			<div>
				<Sidebar
					show={showDrawer}
					closeBackDrop={openSideDrawer}
					openBackDrop={showDrawer}
					closeSideDrawer={closeSideDrawer}
				/>
			</div>
			<div className="lg:pl-72">
				<Navbar />
				<div className="px-4 w-auto flex justify-center mt-8 mb-4">
					<div className="px-4 border flex rounded-full items-center w-2/4">
						<input
							type="text"
							className="
						w-full px-3 py-3 appearence-none focus:outline-none text-md leading-tight text-gray-700 font-normal"
							placeholder="search"
						/>
						<button className="cursor-pointer">
							<img src={searchIcon} />
						</button>
					</div>
				</div>
				<div className="flex">
					<div className="w-2/3 border-t border-r h-full">
						<div className="py-10 px-16">
							<div className="w-full border shadow border-gray-200 p-4 mb-4 rounded-lg hover:shadow-lg">
								<div className="flex">
									<img src={Img} className="w-12 h-12 rounded-full" />
									<div className="w-full ml-4">
										<div className=" flex justify-between items-center">
											<div className="">
												<h4 className="font-semibold p-0">John Doe</h4>
												<h4 className="text-gray-400 text-sm">20 hrs ago</h4>
											</div>
											<div>
												<i className="fas fa-ellipsis-v cursor-pointer"></i>
											</div>
										</div>
										<div className="mt-2 ">
											<p className="text-base font-medium border-b pb-2 text-gray-800">
												Lorem Ipsum is simply dummy text of the printing and typesetting
												industry. Lorem Ipsum has been the industry's standard dummy
												text ever since the 1500s, when an unknown printer took a galley
												of type and scrambled it to make a type specimen book. It has
												survived not only five centuries, but also the leap into
												electronic typesetting, remaining essentially unchanged. It was
												popularised in the 1960s with the release of Letraset sheets
												containing Lorem Ipsum passages, and more recently with desktop
												publishing software like Aldus PageMaker including versions of
												Lorem Ipsum.
											</p>
										</div>
										<div className="mt-2">
											<div className="flex justify-center items-center">
												<div className="w-1/2 border-r bg-gray-10 flex justify-center">
													<img src={thumbsUp} />
												</div>
												<div className="w-1/2 bg-gray-10 flex justify-center">
													<img src={messageCircle} className="cursor-pointer" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full border p-4 mb-4 rounded-lg hover:shadow-lg">
								<div className="flex">
									<img src={Img} className="w-12 h-12 rounded-full" />
									<div className="w-full ml-4">
										<div className=" flex justify-between items-center">
											<div className="">
												<h4 className="font-semibold p-0">John Doe</h4>
												<h4 className="text-gray-400 text-sm">20 hrs ago</h4>
											</div>
											<div>
												<i className="fas fa-ellipsis-v cursor-pointer"></i>
											</div>
										</div>
										<div className="mt-2 block">
											<p className="text-md font-normal text-base">
												Lorem Ipsum is simply dummy text of the printing and typesetting
												industry. Lorem Ipsum has been the industry's standard dummy
												text ever since the 1500s, when an unknown printer took a galley
												of type and scrambled it to make a type specimen book. It has
												survived not only five centuries, but also the leap into
												electronic typesetting, remaining essentially unchanged. It was
												popularised in the 1960s with the release of Letraset sheets
												containing Lorem Ipsum passages, and more recently with desktop
												publishing software like Aldus PageMaker including versions of
												Lorem Ipsum.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full border p-4 rounded-lg hover:shadow-lg">
								<div className="flex">
									<img src={Img} className="w-12 h-12 rounded-full" />
									<div className="w-full ml-4">
										<div className=" flex justify-between items-center">
											<div className="">
												<h4 className="font-semibold p-0">John Doe</h4>
												<h4 className="text-gray-400 text-sm">20 hrs ago</h4>
											</div>
											<div>
												<i className="fas fa-ellipsis-v cursor-pointer"></i>
											</div>
										</div>
										<div className="mt-2 block">
											<p className="text-md font-normal text-base">
												Lorem Ipsum is simply dummy text of the printing and typesetting
												industry. Lorem Ipsum has been the industry's standard dummy
												text ever since the 1500s, when an unknown printer took a galley
												of type and scrambled it to make a type specimen book. It has
												survived not only five centuries, but also the leap into
												electronic typesetting, remaining essentially unchanged. It was
												popularised in the 1960s with the release of Letraset sheets
												containing Lorem Ipsum passages, and more recently with desktop
												publishing software like Aldus PageMaker including versions of
												Lorem Ipsum.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-1/3 border-t h-full">
						<div className="pt-10 flex justify-center">
							{/* <div className="rounded-lg w-72 h-auto flex flex-wrap border p-4 shadow">
								<div className="rounded-full hover:bg-blue-400 hover:text-white mr-2 border py-2 px-3 mb-2">
									<p>#water</p>
								</div>
								<div className="rounded-full border mb-2 py-2 px-3">
									<p>#water</p>
								</div>
								<div className="rounded-full border mb-2 py-2 px-3">
									<p>#electricity</p>
								</div>
							</div> */}
							<div class="border w-80 rounded-2xl m-2">
								<h1 class="text-gray-800 text-md font-bold p-3 border-b border-dim-200">
									What’s happening
								</h1>

								{/* <!-- Trending Topic --> */}
								<div class="p-3 border-b hover:bg-gray-100 cursor-pointer">
									<h2 class="font-bold text-md text-gray-800">#FreePS5Monday</h2>
									<p class="text-xs font-semibold text-gray-400">29.7K Tweets</p>
								</div>

								{/* <!-- Trending Topic --> */}
								<div class="p-3 border-b hover:bg-gray-100 cursor-pointer ">
									<h2 class="font-bold text-md text-gray-800">#BTSonGMA</h2>
									<p class="text-xs font-semibold text-gray-400">351K Tweets</p>
								</div>

								{/* <!-- Trending Topic --> */}
								<div class="p-3 border-b hover:bg-gray-100 cursor-pointer ">
									<h2 class="font-bold text-md text-gray-800">#AstraZeneca</h2>
									<p class="text-xs font-semibold text-gray-400">52.7K Tweets</p>
								</div>

								{/* <!-- /Trending Topic --> */}
								<div class="text-blue-400 text-sm font-semibold p-3 hover:text-blue-500 cursor-pointer">
									Show more
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="hidden lg:block h-full overflow-y-auto fixed top-0 left-0">
				<div className="w-72 lg:w-80 border-r">
					<div className="h-96 bg-gray-300 ">
						<div className="flex items-center justify-center flex-col h-full">
							<img className="rounded-full w-32 h-32" src={profileImage} />
							<div className="mt-4 w-full text-center">
								<h3 className="font-semibold text-xl">John Doe</h3>
							</div>
							<div className="mt-8 border-black border-t py-4 w-full text-center">
								<div className=" flex justify-around grid-cols-3 w-full">
									<div>
										<h1 className="font-bold text-3xl">2</h1>
										<p className="text-sm font-medium mt-2">Posts</p>
									</div>
									<div>
										<h1 className="font-bold text-3xl">5</h1>
										<p className="text-sm font-medium mt-2">Followers</p>
									</div>
									<div>
										<h1 className="font-bold text-3xl">10</h1>
										<p className="text-sm font-medium mt-2">Following</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-white">
						<ul className="m-0 h-full">
							<li className="py-4">
								<Link to="/" className="font-normal pl-8 w-full">
									<i class="fas fa-home mr-4"></i>
									<span>Feeds</span>
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									Add Feed
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-cog mr-4"></i>
									<span>Settings</span>
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-sign-out-alt mr-4"></i>
									<span>Logout</span>
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-sign-out-alt mr-4"></i>
									<span>Logout</span>
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-sign-out-alt mr-4"></i>
									<span>Logout</span>
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-sign-out-alt mr-4"></i>
									<span>Logout</span>
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-sign-out-alt mr-4"></i>
									<span>Logout</span>
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-sign-out-alt mr-4"></i>
									<span>Logout</span>
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-sign-out-alt mr-4"></i>
									<span>Logout</span>
								</Link>
							</li>
							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-sign-out-alt mr-4"></i>
									<span>Logout</span>
								</Link>
							</li>

							<li className="h-full py-4">
								<Link to="/" className="font-normal">
									<i class="fas fa-sign-out-alt mr-4"></i>
									<span>Logout</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div> */}

			{/* <div className=" grid grid-cols-12">
				<div className="bg-red-400  col-start-1 col-end-8 h-auto">
					<div className="w-full">
						<input className="w-full" />
						sdfa asdfas useDebugValue(asdv asd v sd fv df v )
					</div>
				</div>
				<div className="hidden md:block  md:bg-yellow-600 lg:col-start-8 col-end-13"></div>
			</div> */}

			{/* <Navbar />
			<div className={cssClasses.Home}>
				<div className={cssClasses.Main}>
					{/* <div className={cssClasses.Sidebar}> 
					{/* </div> 
					<section className={cssClasses.NewsFeed}>
						<Container>
							<Grid item md={10} xs={12} sm={12} lg={12}>
								<AppBar className={classes.appBar} position="static">
									<Toolbar variant="dense">
										<Typography variant="h5" className={classes.h6} color="inherit">
											Post : {complaintLength}
										</Typography>
										<img
											src="../../assets/images/01.jpg"
											className="w-25 h-25 rounded-2"
										/>
									</Toolbar>
								</AppBar>
								<Sidebar />
								{message ? message : null}
							</Grid>
						</Container>
					</section>
				</div>
			</div> */}
		</div>
	);
};

export default Home;
