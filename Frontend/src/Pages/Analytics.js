import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/UI/Sidebar/Sidebar";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";

const Analytics = () => {
	const [showDrawer, setShowDrawer] = useState(false);

	const openSideDrawer = () => {
		setShowDrawer(true);
	};
	const closeSideDrawer = () => {
		setShowDrawer(false);
	};

	return (
		<div className="w-full" style={{ backgroundColor: "#F5F7FB" }}>
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
					<div className="mb-8 grid grid-cols-4 gap-8">
						<select name="Day" className="w-full shadow px-4 py-2">
							<option>1</option>
						</select>
						<select className="w-full shadow px-4 py-2">
							<option>Jan</option>
						</select>
						<select className="w-full shadow px-4 py-2">
							<option>2021</option>
						</select>
						<div>
							<input type="submit" value="Search" />
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
						<div className="grid grid-cols-2 gap-10">
							<div className="bg-white p-4 shadow "></div>
							<div className="bg-white p-4 shadow "></div>
							<div className="bg-white p-4 shadow "></div>
							<div className="bg-white p-4 shadow "></div>
						</div>
						<div className="bg-white  p-4 flex items-center justify-center shadow h-full">
							<PieChart />
						</div>
					</div>
					<div className="w-full bg-white p-4 shadow">
						<BarChart />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
