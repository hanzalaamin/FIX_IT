import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
	// const labels = Utils.months({ count: 7 });
	return (
		<Bar
			data={{
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				datasets: [
					{
						label: "Crimes",
						data: [12, 19, 3, 5, 2, 3, 20, 8, 16, 1, 0, 14],
						backgroundColor: "#DC2626",
					},
					{
						label: "Water",
						data: [2, 3, 20, 5, 1, 4],
						backgroundColor: "#2563EB",
					},
					{
						label: "Sanitation",
						data: [3, 10, 13, 15, 22, 30],
						backgroundColor: "#4B5563",
					},
					{
						label: "Electricity",
						data: [9, 10, 12, 1, 18, 25],
						backgroundColor: "#7C3AED",
					},
					{
						label: "Others",
						data: [3, 15, 1, 9, 17, 5],
						backgroundColor: "#7C3A20",
					},
					// {
					// 	label: "Others",
					// 	data: [3, 15, 1, 9, 17, 5],
					// 	backgroundColor: "#7C3A20",
					// },
					// {
					// 	label: "Others",
					// 	data: [3, 15, 1, 9, 17, 5],
					// 	backgroundColor: "#7C3A20",
					// },
					// {
					// 	label: "Others",
					// 	data: [3, 15, 1, 9, 17, 5],
					// 	backgroundColor: "#7C3A20",
					// },
					// {
					// 	label: "Others",
					// 	data: [3, 15, 1, 9, 17, 5],
					// 	backgroundColor: "#7C3A20",
					// },
					// {
					// 	label: "Others",
					// 	data: [3, 15, 1, 9, 17, 5],
					// 	backgroundColor: "#7C3A20",
					// },
					// {
					// 	label: "Others",
					// 	data: [3, 15, 1, 9, 17, 5],
					// 	backgroundColor: "#7C3A20",
					// },
					// {
					// 	label: "Others",
					// 	data: [3, 15, 1, 9, 17, 5],
					// 	backgroundColor: "#7C3A20",
					// },
				],
			}}
			width={600}
			height={500}
			options={{
				responsive: true,
				animation: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: {
						ticks: {
							beginAtZero: true,
							font: { size: 14 },
						},
						grid: { display: false },
					},
					xAxes: {
						grid: { display: false },

						// title: {
						// 	display: true,
						// 	text: "Day",
						// 	font: {
						// 		family: "Montserrat ",
						// 		size: 20,
						// 		weight: "bold",
						// 	},
						// 	padding: { top: 20, left: 0, right: 0, bottom: 0 },
						// },
					},
				},
				plugins: {
					legend: {
						labels: {
							font: { size: 16 },
							boxHeight: 10,
							padding: 0,
						},
						align: "start",
						maxWidth: 200,
						maxHeight: 50,
					},
					title: {
						display: true,
						text: "Bar Chart",
						font: { size: 18 },
						position: "top",
						align: "start",
						padding: { top: 10, bottom: 5 },
					},
					tooltip: {
						padding: 16,
						bodyFont: { size: 16 },
					},
				},
			}}
		/>
	);
};

export default BarChart;
