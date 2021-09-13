import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import ComplaintMenu from "./Pages/ComplaintMenu/ComplaintMenu";
import Home from "./Pages/Home/Home";
import LandingPage from "./components/UI/LandingPage/LandingPage";
import Settings from "./Pages/Settings";
import Analytics from "./Pages/Analytics";
import { AuthContext } from "./context/AuthContext";
import ErrorPage404 from "./components/404";

function App() {
	const { isAuthenticated } = useContext(AuthContext);

	// let routes = (
	// 	<Switch>
	// 		<Route exact path="/" component={LandingPage} />
	// 		<Route path="/login" component={Login} />
	// 		<Route path="/register" component={Signup} />
	// 	</Switch>
	// );

	// if (isAuthenticated) {
	// 	<Switch>
	// 		<Route exact path="/:username" component={Home} />
	// 		<Route path="/:username/register_complaint" component={ComplaintMenu} />
	// 		<Route path="/:username/settings" component={Settings} />
	// 		<Route path="/:username/analytics" component={Analytics} />
	// 		<Route path="*" component={ErrorPage404} />
	// 		{/* <Redirect to="/login" /> */}
	// 	</Switch>;
	// }

	return (
		<React.Fragment>
			{!isAuthenticated ? (
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Signup} />
				</Switch>
			) : (
				<Switch>
					<Route exact path="/:username" component={Home} />
					<Route path="/:username/register_complaint" component={ComplaintMenu} />
					<Route path="/:username/settings" component={Settings} />
					<Route path="/:username/analytics" component={Analytics} />
					<Route path="*" component={ErrorPage404} />
					<Redirect to="/login" />
				</Switch>
			)}
		</React.Fragment>
	);
}
export default App;
