import axios from "axios";

class AuthService {
	login(email, password) {
		return axios.post("/login", {
			email,
			password,
		});
	}
	register(username, email, password) {
		return axios
			.post(
				"/register",

				{
					username,
					email,
					password,
				},
				{
					body: JSON.stringify(username, email, password),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => res.json())
			.then((data) => data);
	}
	logout() {
		return axios.get("/logout").then((data) => data);
	}
}

export default new AuthService();
