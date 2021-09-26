import React, { useState, useContext } from "react";
import Modal from "./Modal";
import Comment from "../../services/Comment";
import Vote from "../../services/Vote";
import CommentList from "./CommentList";
import { AuthContext } from "../../context/AuthContext";

const ComplaintsList = (props) => {
	const [menu, setMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const { user } = useContext(AuthContext);
	// const [showCommentMenu, setShowCommentMenu] = useState(false);

	const deleteComment = (user_id, complaint_id, comment_id) => {
		console.log(user_id, complaint_id, comment_id);
		Comment.deleteComment(user_id, complaint_id, comment_id).then((data) => console.log(data));
	};

	// Open Close Comment Section
	const openCommentBox = () => {
		setShowComment(!showComment);
	};

	const openMenu = () => {
		setMenu(!menu);
	};

	// Open Modal
	const openModal = () => {
		setMenu(false);
		setShowModal(true);
	};

	// Close Modal
	const closeModal = () => {
		setShowModal(false);
	};

	// like dislike
	const like = (complaint_id) => {
		Vote.likeComplaint(complaint_id).then((data) => console.log(data));
	};

	const disLike = (complaint_id) => {
		Vote.dislikeComplaint(complaint_id).then((data) => console.log(data));
	};

	return (
		<div className="w-full border shadow border-gray-200 p-4 mb-4 rounded-lg hover:shadow-lg">
			<div className="flex">
				<img src="" className="w-12 h-12 rounded-full" alt="" />
				<div className="w-full ml-4">
					<div className=" flex justify-between items-center">
						<div className="">
							<h4 className="font-semibold p-0">{props.username}</h4>
							<h4 className="text-gray-400 text-sm">
								<span>{new Date(props.createdAt).toDateString()}</span>,
								<span>{new Date(props.createdAt).toUTCString()}</span>
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
							<div
								className={
									"absolute top-9 right-4 bg-white rounded-lg border shadow w-44 " +
									(menu ? "block" : "hidden")
								}
							>
								<button
									onClick={openModal}
									className="p-3 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:text-gray-100 w-full"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="feather feather-trash"
									>
										<polyline points="3 6 5 6 21 6"></polyline>
										<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
									</svg>
									<span className="ml-3 text-lg">Delete</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-2 ">
				{/* Title */}
				<p className="text-base font-medium pb-2 text-gray-800">
					<span className="font-semibold">Title : </span>
					{props.complaintname}
				</p>
				{/* Category */}
				<p className="text-base font-medium pb-2 text-gray-800">
					<span className="font-semibold">Category : </span>
					{props.category}
				</p>
				{/* Area */}
				<p className="text-base font-medium pb-2 text-gray-800">
					<span className="font-semibold">Area : </span>
					{props.sector}
				</p>
				<p className="break-all text-base font-medium border-b pb-2 text-gray-800">
					<span className="font-semibold">Description : </span>
					{props.description}
				</p>
			</div>
			<div className="mt-2">
				<div className="flex justify-center items-center">
					{/* Like Section */}
					{props.likesID.includes(user._id) ? (
						<button
							onClick={() => disLike(props.comp_id)}
							className="w-1/2 border-r flex justify-center items-center cursor-pointer text-blue-600"
						>
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-thumbs-up"
								>
									<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
								</svg>
							</div>
							<div>
								<span className="ml-1 font-medium text-base">{props.noOfVotes}</span>
							</div>
						</button>
					) : (
						<button
							onClick={() => like(props.comp_id)}
							className="w-1/2 border-r flex justify-center items-center cursor-pointer text-gray-500"
						>
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-thumbs-up"
								>
									<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
								</svg>
							</div>
							<div>
								<span className="ml-1 font-medium text-base">{props.noOfVotes}</span>
							</div>
						</button>
					)}

					{/* Comment Section */}
					<div
						className="w-1/2 flex justify-center items-center text-gray-500 cursor-pointer hover:text-blue-600"
						onClick={openCommentBox}
					>
						<button>
							{/* <svg
															xmlns="http://www.w3.org/2000/svg"
															width="20"
															height="20"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="1.8"
															strokeLinecap="round"
															strokeLinejoin="round"
															className="feather feather-message-circle"
														>
															<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
														</svg> */}
							<span className="font-medium text-base">Comments</span>
						</button>
						<div>
							<span className="ml-1 font-medium text-base">{props.noOfComments}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Displaying Comments */}
			<div className={"mt-4 " + (showComment ? "block" : "hidden")}>
				<div>
					{props.comments.map((comment) => (
						<CommentList
							key={comment._id}
							username={comment.postedBy.username}
							createdAt={comment.createdAt}
							deleteComment={() =>
								deleteComment(comment.postedBy._id, props.comp_id, comment._id)
							}
							comment={comment.comment}
						/>
						// <div className="flex items-center justify-start" key={comment._id}>
						// 	<div className="mr-2">
						// 		<img src="" className="w-9 h-9 rounded-full" alt="" />
						// 	</div>
						// 	<div className="w-full">
						// 		<div className="w-full flex justify-between items-center">
						// 			<div className="m-0">
						// 				<span className="text-sm font-semibold capitalize m-0">
						// 					{comment.postedBy.username}
						// 				</span>
						// 				<span className="text-sm ml-2 text-gray-400">
						// 					{new Date(comment.createdAt).toUTCString()}
						// 				</span>
						// 			</div>
						// 			<div className="relative">
						// 				<button
						// 					className="hover:bg-gray-800 hover:text-gray-100 rounded-full p-2"
						// 					onClick={() => setShowCommentMenu(!showCommentMenu)}
						// 				>
						// 					<svg
						// 						xmlns="http://www.w3.org/2000/svg"
						// 						width="16"
						// 						height="16"
						// 						viewBox="0 0 24 24"
						// 						fill="none"
						// 						stroke="currentColor"
						// 						strokeWidth="2"
						// 						strokeLinecap="round"
						// 						strokeLinejoin="round"
						// 						className="feather feather-more-vertical"
						// 					>
						// 						<circle cx="12" cy="12" r="1"></circle>
						// 						<circle cx="12" cy="5" r="1"></circle>
						// 						<circle cx="12" cy="19" r="1"></circle>
						// 					</svg>
						// 				</button>
						// 				<div
						// 					className={
						// 						"absolute top-0 right-8 bg-white rounded-lg border shadow w-44 " +
						// 						(showCommentMenu ? "block" : "hidden")
						// 					}
						// 				>
						// 					<button
						// 						className="p-3 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:text-gray-100 w-full"
						// 						onClick={() =>
						// 							deleteComment(
						// 								props.comp_id,
						// 								comment._id,
						// 								comment.postedBy._id
						// 							)
						// 						}
						// 					>
						// 						<span className="ml-3 text-sm">Delete</span>
						// 					</button>
						// 				</div>
						// 			</div>
						// 		</div>
						// 		<p className="m-0">{comment.comment}</p>
						// 	</div>
						// </div>
					))}
				</div>

				{/* Submitting Comment */}
				<form onSubmit={props.onSubmit} className="mt-2">
					<div className="flex items-center justify-start">
						<div>
							<img src="" className="h-9 rounded-full w-full max-w-xs" alt="" />
						</div>
						<input
							type="text"
							className="w-full ring-1 ring-gray-300 rounded-sm px-2 text-md focus:outline-none focus:ring-1 ml-2 h-8 focus:ring-blue-400 bg-gray-100 focus:bg-white"
							name="commentText"
							placeholder="Add comment"
							value={props.commentValue}
							onChange={props.onChange}
						/>
						<button
							type="submit"
							className="ml-2 bg-gray-800 text-gray-300 rounded-full p-1 flex items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-send transform rotate-45"
							>
								<line x1="22" y1="2" x2="11" y2="12"></line>
								<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
							</svg>
						</button>
					</div>
				</form>
			</div>

			{/* Modal */}
			<Modal
				showModal={showModal}
				Delete={props.Delete}
				Cancel={closeModal}
				cancelBackDrop={closeModal}
			/>
		</div>
	);
};

export default ComplaintsList;
