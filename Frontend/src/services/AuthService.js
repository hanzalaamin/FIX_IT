// const localhost = "http://localhost:2000";
import axios from "axios";

export default {
	// fetch("http:/localhost:3000", {mode: cors})
	login: (user) => {
		return fetch(`/login`, {
			method: "post",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status !== 401) return res.json().then((data) => data);
			else return { isAuthenticated: false, user: { email: "" } };
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
		return fetch(`/logout`)
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
				return { isAuthenticated: false, user: { email: "" } };
			}
		});
	},
};
