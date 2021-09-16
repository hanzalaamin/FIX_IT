import React from "react";
import classes from "./Spinner.module.css";

const Spinner = () => {
	// return <div className="w-12 h-12 border-4 border-blue-600 rounded-full loader"></div>;
	return (
		<div className="h-screen flex items-center justify-center bg-white">
			<div className={classes.loader}>Loading...</div>;
		</div>
	);
};

export const HomePageLoader = () => {
	return (
		<div className="animate-pulse w-full border shadow border-gray-200 p-4 mb-4 rounded-lg hover:shadow-lg">
			<div className="flex">
				<div className="w-12 px-6 h-12 rounded-full bg-gray-300"></div>
				<div className="w-full ml-4">
					<div className="flex justify-between items-center h-full">
						<div>
							<div className="bg-gray-300 h-3 rounded-lg w-28"></div>
							<div className="mt-2 bg-gray-300 h-3 rounded-lg w-28"></div>
						</div>
						<div>
							<div className="bg-gray-300 h-6 rounded-lg w-2"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-4">
				<div className="bg-gray-300 h-3 rounded-lg w-72"></div>
				<div className="mt-2 bg-gray-300 h-3 rounded-lg w-72"></div>
				<div className="mt-2 bg-gray-300 h-3 rounded-lg w-72"></div>
				<div className="mt-2 bg-gray-300 h-3 rounded-lg w-72"></div>
				<div className="mt-2 bg-gray-300 h-3 rounded-lg w-full"></div>
				<div className="mt-2 bg-gray-300 h-3 rounded-lg w-full"></div>
				<div className="mt-2 bg-gray-300 h-3 rounded-lg w-full"></div>
				<div className="mt-2 bg-gray-300 h-3 rounded-lg w-1/2"></div>
			</div>
			<div className="mt-2 pt-2 border-t">
				<div className="flex justify-center items-center">
					<div className="w-1/2 border-r flex justify-center">
						<div className="w-20 bg-gray-300 rounded-lg h-3"></div>
					</div>
					<div className="w-1/2 bg-gray-10 flex justify-center">
						<div className="w-20 bg-gray-300 rounded-lg h-3"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Spinner;
