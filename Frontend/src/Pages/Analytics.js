import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/UI/Sidebar/Sidebar";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import { Data } from "../Data";
import moment from "moment";

const Analytics = () => {
	const [showDrawer, setShowDrawer] = useState(false);
	const [years, setYears] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		Data.map((data) => {
			console.log(moment(data.date).format("yyyy"));
			setYears(moment(data.date).format("yyyy"));
		});
		console.log(years);
	}, []);

	const openSideDrawer = () => {
		setShowDrawer(true);
	};
	const closeSideDrawer = () => {
		setShowDrawer(false);
	};

	return (
		<div
			className="w-full"
			// style={{
			// 	backgroundColor: "#fafafa",
			// }}
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
						<h1 className="font-bold text-2xl text-gray-700">Analytics</h1>
					</div>
					<div className="mb-8 flex">
						<input
							className="w-80 ring-1 ring-gray-300 rounded h-12 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							type="text"
							name="sector"
							placeholder="Search area here"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button className="ml-2 bg-gray-700 px-8 hover:bg-gray-800 h-12 rounded text-white font-semibold flex items-center justify-center">
							Search
						</button>
					</div>
					<div className="mb-8 grid grid-cols-4 gap-8">
						<select className="w-full focus:outline-none cursor-pointer shadow-mainShadow border rounded px-4 h-12">
							<option>Jan</option>
						</select>
						<select className="w-full focus:outline-none cursor-pointer shadow-mainShadow border rounded px-4  h-12">
							{/* <option>2021</option> */}
							{/* {years.map((year, index) => {
								<option value={index}>{year}</option>;
							})} */}
							<option>2021</option>
						</select>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
						<div className="grid grid-cols-2 gap-10">
							<div className="bg-white p-4 shadow-mainShadow border rounded">
								<div className="h-full">
									<h5 className="font-semibold">Crimes</h5>
									<h1 className="text-center text-4xl font-bold">59%</h1>
								</div>
							</div>
							<div className="bg-white p-4 shadow-mainShadow border rounded">
								<div className="h-full">
									<h5 className="font-semibold">Water</h5>
									<h1 className="text-center text-4xl font-bold text-blue-600">11%</h1>
								</div>
							</div>
							<div className="bg-white p-4 shadow-mainShadow border rounded">
								<div className="h-full">
									<h5 className="font-semibold">Sanitation</h5>
									<h1 className="text-center text-4xl font-bold text-gray-600">21%</h1>
								</div>
							</div>
							<div className="bg-white p-4 shadow-mainShadow border rounded">
								<div className="h-full">
									<h5 className="font-semibold">Electricity</h5>
									<h1 className="text-center text-4xl font-bold text-purple-600">19%</h1>
								</div>
							</div>
						</div>
						<div className="bg-white  p-4 flex items-center justify-center shadow-mainShadow border h-full rounded">
							<PieChart />
						</div>
					</div>
					<div className="w-full bg-white p-4 shadow-mainShadow border rounded">
						<BarChart />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
