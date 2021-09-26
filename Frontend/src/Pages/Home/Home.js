import React, { useEffect, useState, useContext } from "react";
import Complaints from "../../services/Complaints";
import Comment from "../../services/Comment";
import { AuthContext } from "../../context/AuthContext";
import { Message } from "../../Messages/Message";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import { HomePageLoader } from "../../components/UI/Spinner/Spinner";
import ComplaintsList from "../../components/UI/ComplaintsList";
// import Img from "../../assets/images/03.jpg";
// import Modal from "../../components/UI/Modal";
// import { Redirect, useHistory } from "react-router";

const Home = () => {
	const [message, setMessage] = useState(null);
	const [complaints, setComplaints] = useState([]);
	const [reload, setReload] = useState(false);
	// const [complaintLength, setComplaintLength] = useState(0);
	// const [openComment, setOpenComment] = useState(false);
	// const [ID, setID] = useState("");
	const [comment, setComment] = useState("");
	const [showDrawer, setShowDrawer] = useState(false);
	// const [menu, setMenu] = useState(false);
	// const [showModal, setShowModal] = useState(false);
	// const [time, setTime] = useState("");
	const { user } = useContext(AuthContext);
	// let history = useHistory();

	// useEffect(() => {
	// axios.get("http://localhost:3000/authenticated").then((res) => res.json());
	// console.log();
	// if (!isAuthenticated) {
	// <Redirect to="/login" />;
	// history.push("/login");
	// }
	// }, []);

	// Fetching Complaints and call useEffect when complaintlenght changes
	useEffect(() => {
		Complaints.getComplaints(user._id).then((data) => {
			console.log(data);
			setComplaints(data);
			// setReload(!reload);
			console.log(data.votes);
		});
		// setReload(!reload);
		console.log(complaints.length);
	}, []);

	// Deleting Complaints by ID
	const deleteComplaint = (id) => {
		console.log(id);
		Complaints.deleteComplaint(id).then((data) => {
			console.log(data);
			setMessage(<Message>{data.message.msgBody}</Message>);
			setReload(!reload);
			// setComplaintLength(complaintLength);
		});
		// setShowModal(false);
	};

	const openSideDrawer = () => {
		setShowDrawer(true);
	};
	const closeSideDrawer = () => {
		setShowDrawer(false);
	};

	// const comment = (id) => {
	// 	Comment.getComments(id).then((data) => {
	// 		console.log(data);
	// 	});
	// };

	// const deleteComment = (user_id, complaint_id, comment_id) => {
	// 	console.log(user_id, complaint_id, comment_id);
	// 	Comment.deleteComment(user_id, complaint_id, comment_id).then((data) => console.log(data));
	// };

	// const openCommentBox = (id) => {
	// 	setOpenComment(!openComment);
	// 	setID(id);
	// 	console.log(ID, openComment);
	// };

	// Adding comment on Complaint
	const submitComment = (e, complaint_id, postedBy) => {
		e.preventDefault();
		Comment.registerComment(postedBy, complaint_id, comment).then((data) => console.log(data));
		setComment("");
		setReload(!reload);
	};

	// const openMenu = () => {
	// 	setMenu(!menu);
	// };

	// Open Modal
	// const openModal = () => {
	// 	setMenu(false);
	// 	setShowModal(true);
	// };

	// Close Modal
	// const closeModal = () => {
	// 	setShowModal(false);
	// };

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
				<div className="flex flex-col lg:flex-row">
					<div
						className={
							"lg:w-2/3 order-2 lg:order-1 border-r " +
							(complaints.length <= 1 ? "h-screen" : "h-full")
						}
					>
						<div className="py-10 px-16 relative">
							{message ? message : null}
							{complaints.length !== 0 ? (
								complaints.map((data) => (
									// <div
									// 	key={data._id}
									// 	className="w-full border shadow border-gray-200 p-4 mb-4 rounded-lg hover:shadow-lg"
									// >
									// 	<div className="flex">
									// 		<img src={Img} className="w-12 h-12 rounded-full" alt="" />
									// 		<div className="w-full ml-4">
									// 			<div className=" flex justify-between items-center">
									// 				<div className="">
									// 					<h4 className="font-semibold p-0">{data.username}</h4>
									// 					<h4 className="text-gray-400 text-sm">
									// 						<span>{new Date(data.createdAt).toDateString()}</span>,
									// 						<span>{new Date(data.createdAt).toTimeString()}</span>
									// 					</h4>
									// 				</div>
									// 				<div className="relative">
									// 					<button
									// 						className="hover:bg-gray-800 hover:text-gray-100 rounded-full p-2"
									// 						onClick={openMenu}
									// 					>
									// 						<svg
									// 							xmlns="http://www.w3.org/2000/svg"
									// 							width="20"
									// 							height="20"
									// 							viewBox="0 0 24 24"
									// 							fill="none"
									// 							stroke="currentColor"
									// 							strokeWidth="2"
									// 							strokeLinecap="round"
									// 							strokeLinejoin="round"
									// 							className="feather feather-more-vertical"
									// 						>
									// 							<circle cx="12" cy="12" r="1"></circle>
									// 							<circle cx="12" cy="5" r="1"></circle>
									// 							<circle cx="12" cy="19" r="1"></circle>
									// 						</svg>
									// 					</button>
									// 					<div
									// 						className={
									// 							"absolute top-9 right-4 bg-white rounded-lg border shadow w-44 " +
									// 							(menu ? "block" : "hidden")
									// 						}
									// 					>
									// 						<button
									// 							onClick={openModal}
									// 							className="p-3 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:text-gray-100 w-full"
									// 						>
									// 							<svg
									// 								xmlns="http://www.w3.org/2000/svg"
									// 								width="18"
									// 								height="18"
									// 								viewBox="0 0 24 24"
									// 								fill="none"
									// 								stroke="currentColor"
									// 								strokeWidth="1.8"
									// 								strokeLinecap="round"
									// 								strokeLinejoin="round"
									// 								className="feather feather-trash"
									// 							>
									// 								<polyline points="3 6 5 6 21 6"></polyline>
									// 								<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
									// 							</svg>
									// 							<span className="ml-3 text-lg">Delete</span>
									// 						</button>
									// 					</div>
									// 				</div>
									// 			</div>
									// 		</div>
									// 	</div>
									// 	<div className="mt-2 ">
									// 		{/* Title */}
									// 		<p className="text-base font-medium pb-2 text-gray-800">
									// 			<span className="font-semibold">Title : </span>
									// 			{data.complaintname}
									// 		</p>
									// 		{/* Category */}
									// 		<p className="text-base font-medium pb-2 text-gray-800">
									// 			<span className="font-semibold">Category : </span>
									// 			{data.category}
									// 		</p>
									// 		{/* Area */}
									// 		<p className="text-base font-medium pb-2 text-gray-800">
									// 			<span className="font-semibold">Area : </span>
									// 			{data.sector}
									// 		</p>
									// 		<p className="text-base font-medium border-b pb-2 text-gray-800">
									// 			<span className="font-semibold">Description : </span>
									// 			{data.description}
									// 		</p>
									// 	</div>
									// 	<div className="mt-2">
									// 		<div className="flex justify-center items-center">
									// 			<div className="w-1/2 border-r flex justify-center items-center text-gray-500 cursor-pointer h-full hover:text-blue-600">
									// 				<div>
									// 					<svg
									// 						xmlns="http://www.w3.org/2000/svg"
									// 						width="20"
									// 						height="20"
									// 						viewBox="0 0 24 24"
									// 						fill="none"
									// 						stroke="currentColor"
									// 						strokeWidth="1.8"
									// 						strokeLinecap="round"
									// 						strokeLinejoin="round"
									// 						className="feather feather-thumbs-up"
									// 					>
									// 						<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
									// 					</svg>
									// 				</div>
									// 				<div>
									// 					<span className="ml-1 font-medium text-base">0</span>
									// 				</div>
									// 			</div>
									// 			<div
									// 				className="w-1/2 flex justify-center items-center text-gray-500 cursor-pointer hover:text-blue-600"
									// 				// id={data._id}
									// 				onClick={(e) => openCommentBox(e, data._id)}
									// 			>
									// 				<button>
									// 					/* <svg
									// 						xmlns="http://www.w3.org/2000/svg"
									// 						width="20"
									// 						height="20"
									// 						viewBox="0 0 24 24"
									// 						fill="none"
									// 						stroke="currentColor"
									// 						strokeWidth="1.8"
									// 						strokeLinecap="round"
									// 						strokeLinejoin="round"
									// 						className="feather feather-message-circle"
									// 					>
									// 						<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
									// 					</svg> *
									// 					<span className="font-medium text-base">Comments</span>
									// 				</button>
									// 				<div>
									// 					<span className="ml-1 font-medium text-base">
									// 						{data.comments.length}
									// 					</span>
									// 				</div>
									// 			</div>
									// 		</div>
									// 	</div>

									// 	{/* Comment */}
									// 	<div
									// 		className={
									// 			"mt-4 " + (ID === data._id && openComment ? "block" : "hidden")
									// 		}
									// 	>
									// 		<div>
									// 			{data.comments.map((comment) => (
									// 				<div
									// 					className="flex items-center justify-start"
									// 					key={comment._id}
									// 				>
									// 					<div className="mr-2">
									// 						<img
									// 							src={Img}
									// 							className="w-9 h-9 rounded-full"
									// 							alt=""
									// 						/>
									// 					</div>
									// 					<div>
									// 						<p className="m-0">
									// 							<span className="text-sm font-semibold capitalize m-0">
									// 								{comment.postedBy.username}
									// 							</span>
									// 							<span className="text-sm ml-2 text-gray-400">
									// 								{new Date(data.createdAt).toUTCString()}
									// 							</span>
									// 						</p>
									// 						<p className="m-0">{comment.comment}</p>
									// 					</div>
									// 				</div>
									// 			))}
									// 		</div>
									// 		<form
									// 			onSubmit={(e) => submitComment(e, data.postedBy)}
									// 			className="mt-2"
									// 		>
									// 			<div className="flex items-center justify-start">
									// 				<div>
									// 					<img
									// 						src={Img}
									// 						className="h-9 rounded-full w-full max-w-xs"
									// 						alt=""
									// 					/>
									// 				</div>
									// 				<input
									// 					type="text"
									// 					className="w-full ring-1 ring-gray-300 rounded-sm px-2 text-md focus:outline-none focus:ring-1 ml-2 h-8 focus:ring-blue-400 bg-gray-100 focus:bg-white"
									// 					name="commentText"
									// 					placeholder="Add comment"
									// 					value={comment}
									// 					onChange={(e) => setComment(e.target.value)}
									// 				/>
									// 				<button
									// 					type="submit"
									// 					className="ml-2 bg-gray-800 text-gray-300 rounded-full p-1 flex items-center justify-center"
									// 				>
									// 					<svg
									// 						xmlns="http://www.w3.org/2000/svg"
									// 						width="20"
									// 						height="20"
									// 						viewBox="0 0 24 24"
									// 						fill="none"
									// 						stroke="currentColor"
									// 						strokeWidth="1.8"
									// 						strokeLinecap="round"
									// 						strokeLinejoin="round"
									// 						className="feather feather-send transform rotate-45"
									// 					>
									// 						<line x1="22" y1="2" x2="11" y2="12"></line>
									// 						<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
									// 					</svg>
									// 				</button>
									// 			</div>
									// 		</form>
									// 	</div>

									// 	{/* Modal */}
									// 	<Modal
									// 		showModal={showModal}
									// 		Delete={() => deleteComplaint(data._id)}
									// 		Cancel={closeModal}
									// 		cancelBackDrop={closeModal}
									// 	/>
									// </div>
									<ComplaintsList
										key={data._id}
										username={data.username}
										createdAt={data.createdAt}
										complaintname={data.complaintname}
										category={data.category}
										sector={data.sector}
										description={data.description}
										comments={data.comments}
										noOfComments={data.comments.length}
										noOfVotes={data.votes.length}
										likesID={data.votes}
										// voted_User_ID={data.votes._id}
										// deleteComment={() =>
										// 	deleteComment(data.comments.postedBy, data.comments._id, data._id)
										// }
										// castVote={data._id}
										comp_id={data._id}
										commentValue={comment}
										onChange={(e) => setComment(e.target.value)}
										onSubmit={(e) => submitComment(e, data._id, data.postedBy)}
										Delete={() => deleteComplaint(data._id)}
									/>
								))
							) : (
								<>
									<HomePageLoader />
									<HomePageLoader />
									<HomePageLoader />
								</>
							)}
						</div>
					</div>

					{/* Trends */}
					<div className="lg:w-1/3 order-1 lg:order-2 h-full">
						<div className="pt-10 px-16 px:12 flex justify-center">
							<div className="border w-full h-full rounded-lg shadow">
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
