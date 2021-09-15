import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Message } from "../../Messages/Message";
import img from "../../assets/images/Signup.jpg";

const Signup = (props) => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [pwdType, setPwdType] = useState(true);
	const [iconType, setIconType] = useState(true);
	const [message, setMessage] = useState(null);
	const { username, email, password } = user;

	const inputChangeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const showPassword = () => {
		setPwdType(!pwdType);
		setIconType(!iconType);
	};

	const Submit = (e) => {
		e.preventDefault();
		const User = { username, email, password };

		AuthService.register(User).then((data) => {
			const { message, msgType } = data;
			setMessage(<Message close={() => setMessage(null)}>{message}</Message>);
			if (!msgType === true) {
				setUser({ ...user, username: "", email: "", password: "" });
				props.history.push("/login");
			}
		});
	};
	return (
		<div className="w-full">
			<div className="lg:flex">
				<div className="w-full lg:w-2/4">
					<img
						src={img}
						className="w-full h-96 md:h-full object-cover"
						alt="sign up page img"
					/>
				</div>
				<div className="w-full lg:w-2/4 md:h-screen border px-12 md:px-24">
					<div className="h-full py-20 md:py-20 lg:py-0 flex items-center justify-center flex-col">
						<form className="w-full" onSubmit={Submit}>
							<h1 className="font-semibold text-3xl md:text-5xl mb-2">Please Sign up</h1>
							<h5 className="font-base text-xl md:text-2xl mb-10 text-gray-500">
								Sign up to manage your account
							</h5>
							<div className="relative">
								{message ? message : null}
								<div className="mb-6">
									<input
										className="w-full ring-1 ring-gray-300 rounded-lg h-16 px-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
										type="text"
										name="username"
										value={user.username}
										placeholder="Username"
										onChange={inputChangeHandler}
									/>
								</div>
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

								<div className="relative  mb-6">
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
								<button
									type="submit"
									className="bg-blue-400 hover:bg-blue-500 mb-6 h-16 rounded-lg text-white w-full font-semibold"
								>
									SIGN UP
								</button>
								<p className={"text-center font-semibold "}>
									Already have an account?&nbsp;&nbsp;
									<Link to="/login" className="text-blue-500">
										Signin
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

export default withRouter(Signup);
