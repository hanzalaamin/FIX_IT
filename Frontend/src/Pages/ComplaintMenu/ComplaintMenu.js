import React, { useState } from "react";
import Complaints from "../../services/Complaints";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import { Message } from "../../Messages/Message";

const ComplaintMenu = () => {
	const [complaint, setComplaint] = useState({
		complaintTitle: "",
		sector: "",
		category: "",
		description: "",
	});
	const [msg, setMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const { complaintTitle, sector, category, description } = complaint;
	const [showDrawer, setShowDrawer] = useState(false);
	const [show, setShow] = useState(false);

	const categories = [
		"Water",
		"Electricity",
		"Gas",
		"Sewage",
		"Road",
		"Main-holes",
		"Street-Light",
	];

	const openSideDrawer = () => {
		setShowDrawer(true);
	};
	const closeSideDrawer = () => {
		setShowDrawer(false);
	};

	const inputChangeHandler = (e) => {
		setComplaint({ ...complaint, [e.target.name]: e.target.value });
	};

	const getCategory = (value) => {
		console.log(value);
		setShow(false);
		setComplaint({ ...complaint, category: value });
	};
	console.log(category);

	const submit = (e) => {
		console.log(complaintTitle, sector, category, description);
		e.preventDefault();
		setLoading(true);
		if (!complaintTitle && !sector && !category && !description) {
			setMsg(<Message close={() => setMsg(null)}>Please Fill All Credentials</Message>);
			setLoading(false);
		} else {
			Complaints.registerComplaint(complaintTitle, sector, category, description).then(
				(data) => {
					const { message } = data;
					setMsg(<Message close={() => setMsg(null)}>{message.msgBody}</Message>);
					setLoading(false);
					setComplaint({
						complaintTitle: "",
						sector: "",
						category: "",
						description: "",
					});
				}
			);
		}
	};

	return (
		<div
			className="w-full flex"
			style={{
				// backgroundColor: "#F5F7FB",
				backgroundColor: "#fafafa",
			}}
		>
			<Sidebar
				show={showDrawer}
				closeBackDrop={closeSideDrawer}
				openBackDrop={showDrawer}
				closeSideDrawer={closeSideDrawer}
			/>

			<div className="w-full lg:pl-72">
				<Navbar openSideDrawer={openSideDrawer} />
				<div className="p-10">
					<div className="mb-8">
						<h1 className="font-bold text-2xl text-gray-700">Add Complaint</h1>
					</div>
					<form className="w-1/2 mx-auto relative" onSubmit={submit}>
						{msg ? msg : null}
						<div className="mb-6">
							<label className="font-semibold text-md mb-1 block">Complaint Name:</label>
							{/* <input
								className="w-full ring-1 ring-gray-300 rounded-lg h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								type="text"
								name="complaintTitle"
								value={complaintTitle}
								onChange={inputChangeHandler}
							/> */}
							<textarea
								className="w-full ring-1 ring-gray-300 rounded px-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								type="text"
								rows="3"
								name="complaintTitle"
								value={complaintTitle}
								onChange={inputChangeHandler}
							></textarea>
						</div>
						<div className="mb-6">
							<label className="font-semibold text-md mb-1 block">Select Area:</label>
							<input
								className="w-full ring-1 ring-gray-300 rounded h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								type="text"
								name="sector"
								value={sector}
								onChange={inputChangeHandler}
							/>
						</div>
						<div className="mb-6">
							<label className="font-semibold text-md mb-1 block">Select Category:</label>
							<div
								className={
									"flex items-center w-full ring-1 ring-gray-300 h-12 px-4 text-lg focus:outline-none cursor-pointer bg-white " +
									(show ? "rounded-t" : "rounded")
								}
								onClick={() => setShow(!show)}
							>
								<input
									className="w-full px-4 text-lg focus:outline-none cursor-pointer"
									// className={
									// 	"w-full ring-1 ring-gray-300 h-12 px-4 text-lg focus:outline-none cursor-pointer  " +
									// 	(show ? "rounded-t" : "rounded")
									// }
									name="category"
									value={category}
									onChange={inputChangeHandler}
									readOnly
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1"
									strokeLinecap="round"
									strokeLinejoin="round"
									className={
										"feather feather-chevron-down transform text-gray-600 " +
										(show ? "rotate-180" : "rotate-0")
									}
								>
									<polyline points="6 9 12 15 18 9"></polyline>
								</svg>
							</div>
							<ul
								className={
									"bg-white ring-1 ring-gray-300 rounded-b-lg h-48 overflow-y-scroll scrollbar scrollbar-hidden hover:scrollbar-auto scrollbar-track-gray-300 scrollbar-thumb-gray-500 border-r " +
									(show ? "block " : "hidden")
								}
							>
								{categories.map((val) => (
									<li
										key={val}
										className="w-full border-t h-12 px-4 text-base hover:bg-gray-200 flex items-center"
										onClick={() => getCategory(val)}
									>
										{val}
									</li>
								))}
								{/* <li
									className="w-full border-t h-12 px-4 text-lg hover:bg-gray-200 flex items-center"
									onClick={() => getCategory("Water")}
								>
									Water
								</li> */}
								{/* <li
									className="w-full h-12 border-t px-4 text-lg hover:bg-gray-200 rounded-b-lg flex items-center"
									onClick={() => getCategory("Electricity")}
								>
									Electricity
								</li> */}
							</ul>
							{/* </input> */}
						</div>
						<div className="mb-6">
							<label className="font-semibold text-md mb-1 block">
								The Complaint is Regarding:
							</label>
							<textarea
								className="w-full ring-1 ring-gray-300 rounded px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 py-2"
								name="description"
								rows="8"
								value={description}
								onChange={inputChangeHandler}
							></textarea>
						</div>
						<button
							type="submit"
							className="bg-blue-400 hover:bg-blue-500 mb-6 h-16 rounded text-white w-full font-semibold flex items-center justify-center"
						>
							<span className="mr-5">SUBMIT</span>{" "}
							{loading ? <div className="w-6 h-6 rounded-full loader"></div> : null}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ComplaintMenu;
