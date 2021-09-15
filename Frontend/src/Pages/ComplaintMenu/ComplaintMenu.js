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

	const openSideDrawer = () => {
		setShowDrawer(true);
	};
	const closeSideDrawer = () => {
		setShowDrawer(false);
	};

	const inputChangeHandler = (e) => {
		setComplaint({ ...complaint, [e.target.name]: e.target.value });
	};

	const submit = (e) => {
		console.log(complaintTitle, sector, category, description);
		e.preventDefault();
		setLoading(true);
		if (!complaintTitle && !sector && !category && !description) {
			setMsg(<Message close={() => setMsg(null)}>Please Fill All Credentials</Message>);
		} else {
			Complaints.registerComplaint(complaintTitle, sector, category, description).then(
				(data) => {
					const { message } = data;
					setMsg(<Message close={() => setMsg(null)}>{message.msgBody}</Message>);
					setLoading(false);
				}
			);
			setComplaint({
				complaintTitle: "",
				sector: "",
				category: "",
				description: "",
			});
		}
	};

	return (
		<div className="w-full flex" style={{ backgroundColor: "#F5F7FB" }}>
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
							<input
								className="w-full ring-1 ring-gray-300 rounded-lg h-16 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								type="text"
								name="complaintTitle"
								value={complaintTitle}
								onChange={inputChangeHandler}
							/>
						</div>
						<div className="mb-6">
							<label className="font-semibold text-md mb-1 block">Select Area:</label>
							<input
								className="w-full ring-1 ring-gray-300 rounded-lg h-16 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								type="text"
								name="sector"
								value={sector}
								onChange={inputChangeHandler}
							/>
						</div>
						<div className="mb-6">
							<label className="font-semibold text-md mb-1 block">Select Category:</label>
							<input
								className="w-full ring-1 ring-gray-300 rounded-lg h-16 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								type="text"
								name="category"
								value={category}
								onChange={inputChangeHandler}
							/>
						</div>
						<div className="mb-6">
							<label className="font-semibold text-md mb-1 block">
								The Complaint is Regarding:
							</label>
							<textarea
								className="w-full ring-1 ring-gray-300 rounded-lg px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 py-2"
								name="description"
								rows="8"
								value={description}
								onChange={inputChangeHandler}
							></textarea>
						</div>
						<button
							type="submit"
							className="bg-blue-400 hover:bg-blue-500 mb-6 h-16 rounded-lg text-white w-full font-semibold flex items-center justify-center"
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
