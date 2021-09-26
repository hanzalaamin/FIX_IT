import React, { useState } from "react";

const CommentList = (props) => {
	const [showCommentMenu, setShowCommentMenu] = useState(false);

	return (
		<div className="flex items-center justify-start">
			<div className="mr-2">
				<img src="" className="w-9 h-9 rounded-full" alt="" />
			</div>
			<div className="w-full">
				<div className="w-full flex justify-between items-center">
					<div className="m-0">
						<span className="text-sm font-semibold capitalize m-0">{props.username}</span>
						<span className="text-sm ml-2 text-gray-400">
							{new Date(props.createdAt).toUTCString()}
						</span>
					</div>
					<div className="relative">
						<button
							className="hover:bg-gray-800 hover:text-gray-100 rounded-full p-2"
							onClick={() => setShowCommentMenu(!showCommentMenu)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
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
								"absolute top-0 right-8 bg-white rounded-lg border shadow w-44 " +
								(showCommentMenu ? "block" : "hidden")
							}
						>
							<button
								className="p-3 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:text-gray-100 w-full"
								onClick={props.deleteComment}
							>
								<span className="ml-3 text-sm">Delete</span>
							</button>
						</div>
					</div>
				</div>
				<p className="m-0">{props.comment}</p>
			</div>
		</div>
	);
};

export default CommentList;
