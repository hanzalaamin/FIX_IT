import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/UI/Sidebar/Sidebar";

const Settings = () => {
	return (
		<div className="w-full">
			<Sidebar
			// show={showDrawer}
			// closeBackDrop={openSideDrawer}
			// openBackDrop={showDrawer}
			// closeSideDrawer={closeSideDrawer}
			/>
			<div className="w-full lg:pl-72">
				<Navbar />
				<div className="py-10">
					<div className="px-10 py-5 border-b">
						<div className=" mb-3 pb-3">
							<h1 className="text-2xl font-bold">Password Section</h1>
						</div>
						<form className="w-96">
							<div className="mb-2">
								<label className="text-base mb-2 block">Old Password</label>
								<input
									className="w-full ring-1 ring-gray-300 rounded-md h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
									type="password"
								/>
							</div>
							<div className="mb-3">
								<label className="text-base mb-2 block">New Password</label>
								<input
									className="w-full ring-1 ring-gray-300 rounded-md h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
									type="password"
								/>
							</div>
							<button
								type="submit"
								className="bg-blue-400 hover:bg-blue-500 h-10 rounded-md text-white w-40 font-semibold text-sm"
							>
								Update Password
							</button>
						</form>
					</div>

					{/* Email */}
					<div className="px-10 border-b py-8">
						<div className="pb-3">
							<h1 className="text-2xl font-bold">Email Section</h1>
						</div>
						<form className="w-96">
							<div className="mb-2">
								<label className="text-base mb-2 block">Enter New Email</label>
								<input
									className="w-full ring-1 ring-gray-300 rounded-md h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
									type="password"
								/>
							</div>
							<button
								type="submit"
								className="bg-blue-400 hover:bg-blue-500 h-10 rounded-md text-white w-40 font-semibold"
							>
								Submit
							</button>
						</form>
					</div>

					{/* Password */}
					<div className="px-10 border-b py-8">
						<div className="pb-3">
							<h1 className="text-2xl text-red-600 font-bold block">Delete Account</h1>
						</div>
						<p className="text-lg mb-2 block">
							Once you delete your account, there is no going back. Please be certain.
						</p>
						<form className="w-full">
							<div className="mb-2">
								<label className="text-base mb-2 block">Enter Your Password</label>
								<input
									className="w-96 ring-1 ring-gray-300 rounded-md h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
									type="password"
								/>
							</div>
							<button
								type="submit"
								className="bg-red-500 transition duration-500 ease-in-out hover:bg-red-600 h-10 rounded-md text-white w-40 font-semibold"
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
