import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
	return (
		<div className="w-full h-screen bg-blue-100">
			<div className="h-full flex justify-center items-center flex-col">
				<h1 className="text-8xl font-base">404</h1>
				<p className="text-3xl font-normal">It looks like you're lost...</p>
				<p className="text-2xl font-normal">
					The page you are looking for might have been removed.
				</p>
				<div className="mt-8 py-4 bg-blue-500 rounded-lg text-white px-8">
					<Link to="/">Back to Home Page</Link>
				</div>
			</div>
		</div>
	);
};

export default Page404;
