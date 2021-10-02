import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import Spinner from "../components/UI/Spinner/Spinner";

export const AuthContext = createContext();

const Auth = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		AuthService.isAuthenticated().then((data) => {
			setUser(data.user);
			setIsAuthenticated(data.isAuthenticated);
			setLoading(true);
		});
	}, []);

	return (
		<div>
			{!loading ? (
				<Spinner />
			) : (
				<AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
					{children}
				</AuthContext.Provider>
			)}
		</div>
	);
};

export default Auth;
