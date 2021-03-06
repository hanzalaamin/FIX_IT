module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				main: "#383a45",
				alertBg: "#e8f4fd",
				alertText: "0d3c61",
			},
		},
		right: { "1/12": "15%" },
		boxShadow: {
			// mainShadow: "0 0 5px 1px #eaeaea",
			mainShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.06), 0px 0px 5px 1px rgba(0, 0, 0, 0.06)",
		},
	},
	variants: {
		extend: {
			borderWidth: ["hover", "focus"],
			backgroundColor: ["active"],
			textColor: ["active"],
		},
	},
	plugins: [require("ps-scrollbar-tailwind")],
};
