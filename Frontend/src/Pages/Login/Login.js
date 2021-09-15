import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import img from "../../assets/images/Login Screen.jpg";
import { Message } from "../../Messages/Message";
// import Spinner from "../../components/UI/Spinner/Spinner";
import "../../App.css";

const Login = () => {
	const history = useHistory();
	const [user, setUser] = useState({ email: "", password: "" });
	const [pwdType, setPwdType] = useState(true);
	const [iconType, setIconType] = useState(true);
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const authContext = useContext(AuthContext);

	const inputChangeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const showPassword = () => {
		setPwdType(!pwdType);
		setIconType(!iconType);
	};

	const Submit = (e) => {
		e.preventDefault();
		setLoading(true);
		AuthService.login(user).then((data) => {
			const { message, msgType, isAuthenticated, user } = data;
			setMessage(<Message close={() => setMessage(null)}>{message}</Message>);
			if (!msgType === true) {
				if (isAuthenticated) {
					setUser({ ...user, email: "", password: "" });
					authContext.setUser(user);
					authContext.setIsAuthenticated(isAuthenticated);
					setLoading(false);
					history.push(`/${user.username}`);
				}
			}
		});
	};
	return (
		<div className="w-full">
			<div className="lg:flex">
				<div className="w-full lg:w-2/4">
					<img src={img} className="w-full h-96 md:h-full object-cover" alt="login page img" />
				</div>
				<div className="w-full lg:w-2/4 md:h-screen border px-12 md:px-32 lg:px-28">
					<div className="h-full py-20 md:py-20 lg:py-0 flex items-center justify-center flex-col">
						<form className="w-full" onSubmit={Submit}>
							<h1 className="font-semibold text-3xl md:text-5xl mb-2">Please Sign in</h1>
							<h5 className="font-base text-xl md:text-2xl mb-10 text-gray-500">
								Sign in to manage your account
							</h5>
							<div className="relative">
								{message ? message : null}
								<div className="mb-6">
									<input
										className="w-full ring-1 ring-gray-300 rounded-lg h-16 px-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
										type="email"
										name="email"
										value={user.email}
										placeholder="Email"
										onChange={inputChangeHandler}
									/>
								</div>

								<div className="relative  mb-2">
									<span className="absolute right-4 top-0 cursor-pointer text-gray-500 flex items-center h-full">
										<i
											className={iconType ? "far fa-eye" : "fas fa-eye-slash"}
											onClick={showPassword}
										></i>
									</span>
									<input
										className="w-full ring-1 ring-gray-300 rounded-lg h-16 px-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
										type={pwdType ? "password" : "text"}
										name="password"
										value={user.password}
										placeholder="Password"
										onChange={inputChangeHandler}
									/>
								</div>
								<div className="flex justify-between items-center mb-6">
									<div className="flex items-center">
										<input
											type="checkbox"
											name="rememberMe"
											value="checked"
											className="w-4 h-4 border-gray-300 rounded-lg"
										/>
										<span className="ml-2 font-base">Remember Me</span>
									</div>
									<Link to="" className="text-blue-500 font-semibold ">
										Forgot password?
									</Link>
								</div>
								<button
									type="submit"
									className="bg-blue-400 hover:bg-blue-500 mb-6 h-16 rounded-lg text-white w-full font-semibold flex items-center justify-center"
								>
									<span className="mr-5">SIGN IN</span>
									{loading ? <div className="w-6 h-6 rounded-full loader"></div> : null}
								</button>
								<p className={"text-center font-semibold "}>
									Don't have an account?&nbsp;&nbsp;
									<Link to="/register" className="text-blue-500">
										Signup
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
