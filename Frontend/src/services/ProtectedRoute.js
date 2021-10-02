import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				);
			}}
		/>
	);
};
