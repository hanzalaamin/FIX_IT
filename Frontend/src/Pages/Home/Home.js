import React, { useEffect, useState } from "react";
import Complaints from "../../services/Complaints";
import { Message } from "../../Messages/Message";
// import searchIcon from "../../assets/svgs/search.svg";
import Img from "../../assets/images/03.jpg";
import thumbsUp from "../../assets/svgs/thumbsUp.svg";
import messageCircle from "../../assets/svgs/messageCircle.svg";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import moment from "moment";

const Home = () => {
	const [message, setMessage] = useState(null);
	const [complaints, setComplaints] = useState([]);
	const [complaintLength, setComplaintLength] = useState(false);
	// const [anchorEl, setAnchorEl] = useState(null);
	// const [commentValue, setComment] = useState("");
	const [_ID, setID] = useState("");
	const [showDrawer, setShowDrawer] = useState(false);
	const [menu, setMenu] = useState(false);

	const openSideDrawer = () => {
		setShowDrawer(true);
	};
	const closeSideDrawer = () => {
		setShowDrawer(false);
	};

	// function getID(ID) {
	// 	return setID(ID);
	// }

	useEffect(() => {
		Complaints.getComplaints().then((data) => {
			console.log(data);
			// setComplaintLength(data.length);
			setComplaints(data);
		});
	}, [complaintLength]);

	// const comment = (id) => {
	// 	console.log(_ID);
	// 	Comment.getComments(id).then((data) => {
	// 		console.log(data);
	// 	});
	// };

	const inputChangeHandler = (e) => {
		// setComment(e.target.value);
	};

	const submit = (e) => {
		e.preventDefault();
		console.log(_ID);
		// console.log(commentValue);
		// Comment.registerComment(_ID, commentValue).then((data) => console.log(data));
	};

	// const openMenu = (e) => {
	// 	setAnchorEl(e.currentTarget);
	// };

	// const closeMenu = (id) => {
	// 	setAnchorEl(null);
	// };

	const openMenu = () => {
		setMenu(!menu);
	};

	const deleteComplaint = (id) => {
		Complaints.deleteComplaint(id).then((data) => {
			console.log(data);
			setMessage(<Message>{data.message.msgBody}</Message>);
			setComplaintLength(!complaintLength);
			// setTimeout(() => {
			// 	window.location.reload();
			// }, 1500);
		});
	};

	return (
		<div className="bg-white w-full flex">
			<Sidebar
				show={showDrawer}
				closeBackDrop={closeSideDrawer}
				openBackDrop={showDrawer}
				closeSideDrawer={closeSideDrawer}
			/>

			<div className="w-full lg:pl-72">
				<Navbar openSideDrawer={openSideDrawer} />
				{/* <div className="px-4 w-auto flex justify-center mt-8 mb-4">
					<div className="px-4 border flex rounded-full items-center w-2/4">
						<input
							type="text"
							className="
						w-full px-3 py-3 appearence-none focus:outline-none text-md leading-tight text-gray-700 font-normal"
							placeholder="search"
						/>
						<button className="cursor-pointer">
							<img src={searchIcon} alt="" />
						</button>
					</div>
				</div> */}
				<div className="flex">
					<div className="w-2/3 border- border-r h-screen">
						<div className="py-10 px-16 relative">
							{message ? message : null}
							{/* <div className="w-full border shadow border-gray-200 p-4 mb-4 rounded-lg hover:shadow-lg">
								<div className="flex">
									<img src={Img} className="w-12 h-12 rounded-full" alt="" />
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
													<img src={thumbsUp} alt="" />
												</div>
												<div className="w-1/2 bg-gray-10 flex justify-center">
													<img src={messageCircle} alt="" className="cursor-pointer" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> */}

							{complaintLength.length !== 0
								? complaints.map((data) => (
										<div
											key={data.id}
											className="w-full border shadow border-gray-200 p-4 mb-4 rounded-lg hover:shadow-lg"
										>
											<div className="flex">
												<img src={Img} className="w-12 h-12 rounded-full" alt="" />
												<div className="w-full ml-4">
													<div className=" flex justify-between items-center">
														<div className="">
															<h4 className="font-semibold p-0">{data.username}</h4>
															<h4 className="text-gray-400 text-sm">
																{new Date(data.createdAt).toUTCString()}
															</h4>
														</div>
														<div className="relative">
															<button
																className="hover:bg-gray-800 hover:text-gray-100 rounded-full p-2"
																onClick={openMenu}
															>
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
																	className="feather feather-more-vertical"
																>
																	<circle cx="12" cy="12" r="1"></circle>
																	<circle cx="12" cy="5" r="1"></circle>
																	<circle cx="12" cy="19" r="1"></circle>
																</svg>
															</button>
															{/* <i className="fas fa-ellipsis-v cursor-pointer"></i> */}
															<div
																className={
																	"absolute top-9 right-4 bg-white rounded-lg border shadow w-44 " +
																	(menu ? "block" : "hidden")
																}
															>
																<button
																	onClick={() => deleteComplaint(data._id)}
																	className="p-3 block hover:bg-gray-800 hover:text-gray-100 w-full"
																>
																	Delete Complaint
																</button>
															</div>
														</div>
													</div>
													<div className="mt-2 ">
														{/* Title */}
														<p className="text-base font-medium pb-2 text-gray-800">
															<span className="font-semibold">Title : </span>
															{data.complaintname}
														</p>
														{/* Category */}
														<p className="text-base font-medium pb-2 text-gray-800">
															<span className="font-semibold">Category : </span>
															{data.category}
														</p>
														{/* Area */}
														<p className="text-base font-medium pb-2 text-gray-800">
															<span className="font-semibold">Area : </span>
															{data.sector}
														</p>
														<p className="text-base font-medium border-b pb-2 text-gray-800">
															<span className="font-semibold">Description : </span>
															{data.description}
														</p>
													</div>
													<div className="mt-2">
														<div className="flex justify-center items-center">
															<div className="w-1/2 border-r bg-gray-10 flex justify-center">
																<img src={thumbsUp} alt="" />
															</div>
															<div className="w-1/2 bg-gray-10 flex justify-center">
																<img
																	src={messageCircle}
																	alt=""
																	className="cursor-pointer"
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
								  ))
								: "loading"}
						</div>
					</div>
					<div className="w-1/3 border- h-full">
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
							<div className="border w-80 rounded-2xl m-2">
								<h1 className="text-gray-800 text-md font-bold p-3 border-b border-dim-200">
									What’s happening
								</h1>

								{/* <!-- Trending Topic --> */}
								<div className="p-3 border-b hover:bg-gray-100 cursor-pointer">
									<h2 className="font-bold text-md text-gray-800">#FreePS5Monday</h2>
									<p className="text-xs font-semibold text-gray-400">29.7K Tweets</p>
								</div>

								{/* <!-- Trending Topic --> */}
								<div className="p-3 border-b hover:bg-gray-100 cursor-pointer ">
									<h2 className="font-bold text-md text-gray-800">#BTSonGMA</h2>
									<p className="text-xs font-semibold text-gray-400">351K Tweets</p>
								</div>

								{/* <!-- Trending Topic --> */}
								<div className="p-3 border-b hover:bg-gray-100 cursor-pointer ">
									<h2 className="font-bold text-md text-gray-800">#AstraZeneca</h2>
									<p className="text-xs font-semibold text-gray-400">52.7K Tweets</p>
								</div>

								{/* <!-- /Trending Topic --> */}
								<div className="text-blue-400 text-sm font-semibold p-3 hover:text-blue-500 cursor-pointer">
									Show more
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
