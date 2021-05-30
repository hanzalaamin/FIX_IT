import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import AuthService from "../../../services/AuthService";
import NavbarItem from "../../Navbar/NavbarItems/NavbarItem/NavbarItem";
import classes from "./SideBar.module.scss";
// import Backdrop from "../Backdrop/Backdrop";

const Sidebar = (props) => {
	let joinClasses = [classes.SideBar, classes.Close];
	if (props.open) {
		joinClasses = [classes.SideBar, classes.Open];
	}

	const { setUser, setIsAuthenticated, user } = useContext(AuthContext);
	const _id = user._id;

	const onLogout = () => {
		AuthService.logout().then((data) => {
			if (data.success) {
				setUser(data.user);
				setIsAuthenticated(false);
			}
			props.history.push("/login");
		});
	};

	return (
		<React.Fragment>
			{/* <Backdrop close={props.closeBackDrop} show={props.openBackDrop}></Backdrop> */}
			<aside className={joinClasses.join(" ")} style={{ position: "props.position" }}>
				<div className={classes.Logo}>
					{/* <div>
						<span className={classes.closeIcon} onClick={props.close}>
							&times;
						</span>
					</div> */}
				</div>
				<ul className={classes.Items}>
					<NavbarItem link={"/" + _id + "/home"}>Home</NavbarItem>
					<NavbarItem link={"/" + _id + "/complaint"}>Register Complaint</NavbarItem>
					<NavbarItem link="/account">Account Settings</NavbarItem>
					<button className={classes.logout} onClick={onLogout}>
						Logout
					</button>
				</ul>
			</aside>
		</React.Fragment>
	);
};
export default withRouter(Sidebar);
