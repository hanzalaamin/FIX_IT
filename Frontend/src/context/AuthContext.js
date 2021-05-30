import React, { createContext, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export default ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		AuthService.isAuthenticated().then((data) => {
			setUser(data.user);
			setIsAuthenticated(data.isAuthenticated);
			setIsLoaded(true);
		});
	}, []);

	return (
		<div>
			{!isLoaded ? (
				<p>lskjd</p>
			) : (
				<AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
					{children}
				</AuthContext.Provider>
			)}
		</div>
	);
};
