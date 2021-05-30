import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ComplaintMenu from "./components/UI/ComplaintMenu/ComplaintMenu";
import Home from "./components/Home/Home";
import LandingPage from "./components/UI/LandingPage/LandingPage";
import { AuthContext } from "./context/AuthContext";

function App() {
	const { isAuthenticated, user } = useContext(AuthContext);
	const _id = user._id;

	return (
		<React.Fragment>
			{isAuthenticated ? (
				<Switch>
					<Route path={"/" + _id + "/home"} component={Home} />
					<Route path={"/" + _id + "/complaint"} component={ComplaintMenu} />
				</Switch>
			) : (
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/register" component={Signup} />
					<Route path="/login" component={Login} />
					{/* <Redirect to="/" /> */}
				</Switch>
			)}
		</React.Fragment>
	);
}
export default App;
