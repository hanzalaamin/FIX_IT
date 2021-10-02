// const localhost = "http://localhost:2000";
// fetch("http:/localhost:3000", {mode: cors})

export default {
	login: (user) => {
		return fetch(`/login`, {
			method: "post",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status !== 401) return res.json().then((data) => data);
			else return { isAuthenticated: false, user: "" };
		});
	},
	register: (user) => {
		return fetch(`/register`, {
			method: "post",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => data);
	},
	logout: () => {
		return fetch("/logout")
			.then((res) => res.json())
			.then((data) => data);
	},
	isAuthenticated: () => {
		return fetch(`/authenticated`, {
			headers: { "Content-Type": "application/json" },
		}).then((res) => {
			if (res.status !== 401) {
				return res.json().then((data) => data);
			} else {
				return { isAuthenticated: false, user: "" };
			}
		});
	},
};
