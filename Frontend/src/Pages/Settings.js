import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/UI/Sidebar/Sidebar";

const Settings = () => {
	return (
		<div className="w-full flex">
			<div className="w-1/5">
				<Sidebar
				// show={showDrawer}
				// closeBackDrop={openSideDrawer}
				// openBackDrop={showDrawer}
				// closeSideDrawer={closeSideDrawer}
				/>
			</div>
			<div className="w-4/5">
				<Navbar />
				<div className="py-10">
					<div className="px-10 py-5">
						<div className="border-b mb-3 pb-3">
							<h1 className="text-2xl font-bold">Change Password</h1>
						</div>
						<form className="w-96">
							<div className="mb-2">
								<label className="text-sm font-semibold mb-2 block">Old Password</label>
								<input
									className="w-full ring-1 ring-gray-300 rounded-md h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
									type="password"
								/>
							</div>
							<div className="mb-3">
								<label className="text-sm font-semibold mb-2 block">New Password</label>
								<input
									className="w-full ring-1 ring-gray-300 rounded-md h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
									type="password"
								/>
							</div>
							<button
								type="submit"
								className="bg-blue-400 hover:bg-blue-500 h-10 rounded-md text-white w-40 font-semibold text-sm"
							>
								Update password
							</button>
						</form>
					</div>
					<div className="px-10 border-b py-8">
						<form className="w-full">
							<div className="mb-2">
								<label className="text-lg font-semibold mb-2 block">
									Change Your Email
								</label>
								<input
									className="w-72 ring-1 ring-gray-300 rounded-md h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
									type="password"
								/>
							</div>
							<button
								type="submit"
								className="bg-blue-400 hover:bg-blue-500 h-12 rounded-md text-white w-40 font-semibold"
							>
								SUBMIT
							</button>
						</form>
					</div>
					<div className="px-10 border-b py-8">
						<form className="w-full">
							<div className="mb-2">
								<label className="text-2xl text-red-600 font-bold mb-2 block">
									Delete Account
								</label>
								<label className="text-lg mb-2 block">
									Once you delete your account, there is no going back. Please be certain.
								</label>
								<input
									className="w-72 ring-1 ring-gray-300 rounded-md h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
									type="password"
								/>
							</div>
							<button
								type="submit"
								className="bg-red-500 transition duration-500 ease-in-out hover:bg-red-600 h-12 rounded-md text-white w-40 font-semibold"
							>
								Delete
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
