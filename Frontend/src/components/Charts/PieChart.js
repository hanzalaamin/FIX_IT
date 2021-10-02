import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieChart = () => {
	return (
		<Doughnut
			data={{
				labels: ["Crimes", "Water", "Sanitation", "Electricity"],
				datasets: [
					{
						data: [12, 19, 3, 5],
						backgroundColor: ["#DC2626", "#2563EB", "#4B5563", "#7C3AED"],
					},
				],
			}}
			height={300}
			width={500}
			options={{
				maintainAspectRatio: false,
				scales: {
					yAxes: {
						ticks: {
							beginAtZero: true,
							display: false,
						},
						grid: { display: false, borderWidth: 0 },
					},
				},
				plugins: {
					legend: {
						position: "right",
						labels: {
							font: { size: 16 },
						},
					},
					title: {
						display: true,
						text: "Complaint Percentage",
						font: { size: 18 },
						position: "top",
						align: "start",
						padding: { top: 10, bottom: 10 },
					},
				},
			}}
		/>
	);
};

export default PieChart;
