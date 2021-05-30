import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";

import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import cssClasses from "./Home.module.scss";

// import axios from "axios";
import Sidebar from "../UI/Sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import Complaints from "../../services/Complaints";
import axios from "axios";
import { SuccessAlert } from "../../errors/Error";
// import Logo from "../UI/Logo/Logo";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiPaper-root .MuiPaper-rounded": {
			borderRadius: "0",
			backgroundColor: "red",
		},
		// minWidth: 275,
		marginBottom: "10px",
		textAlign: "left",
		// maxWidth: "50%",
		borderRadius: "0",
		boxShadow: "0 0 4px 1px lightgray",

		// backgroundColor: "red",
		// "& .MuiCardActions-root .MuiCardActions-spacing": {
		// 	margin: "0",
		// 	padding: "20px",
		// },
		// "& .MuiPaper-root .MuiPaper-rounded": {},
	},

	title: {
		fontSize: 18,
		fontWeight: 600,
	},
	appBar: {
		padding: "10px",
		marginBottom: "10px",
		backgroundColor: "white",
		color: "black",
		boxShadow: "0 0 4px 1px lightgray",
		textAlign: "center",
	},
	h6: {
		fontWeight: "600",
		color: "black",
	},
	moreIcon: {
		position: "absolute",
		right: "5px",
		top: "-10px",
	},
	menu: {
		// position: "absolute",
		// right: "5px",
		// top: "-10px",
		borderRadius: "0",
	},
}));

const Home = () => {
	const classes = useStyles();
	const [message, setMessage] = useState(null);
	const [complaints, setComplaints] = useState([]);
	const [complaintLength, setComplaintLength] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		Complaints.getComplaints().then((data) => {
			console.log(data);
			setComplaintLength(data.length);
			setComplaints(data);
		});
	}, []);

	const openMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const closeMenu = (id) => {
		axios
			.delete("/complaint/" + id)
			.then((res) => res.data)
			.then((data) => {
				// console.log(res.data);s
				setMessage(<SuccessAlert>{data.message.msgBody}</SuccessAlert>);
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			});
		setAnchorEl(null);
	};

	return (
		<div className={cssClasses.Home}>
			<Navbar />
			<div className={cssClasses.Main}>
				<div className={cssClasses.Sidebar}>
					<Sidebar />
				</div>
				<section className={cssClasses.NewsFeed}>
					<Container>
						<Grid item md={10} xs={12} sm={12} lg={8}>
							<AppBar className={classes.appBar} position="static">
								<Toolbar variant="dense">
									<Typography variant="h5" className={classes.h6} color="inherit">
										Post : {complaintLength}
										{/* <b />
										<p
											style={{
												margin: "0",
												fontSize: "16px",
												fontWeight: "600",
												color: "black",
											}}
										></p> */}
									</Typography>
								</Toolbar>
							</AppBar>
							{message ? message : null}
							{complaints.map((complaint) => (
								// <Card className={classes.root} key={complaint._id} variant="outlined">
								// 	</ul> */}
								// 	<CardContent>
								// 		<Typography className={classes.title} gutterBottom>
								// 			{complaint.complaintname}
								// 		</Typography>

								// 		<Typography component="p">{complaint.description}</Typography>
								// 		<Typography component="p">
								// 			<span>Category:</span> {complaint.category}
								// 		</Typography>
								// 		<Typography component="p">
								// 			<span>Area:</span> {complaint.sector}
								// 		</Typography>
								// 		{complaint.createdAt.toString()}
								// 		{new Date(complaint.createdAt).toString()}
								// 	</CardContent>
								// 	<hr />
								// 	<CardActions>
								// 		<Button size="small">Comment</Button>
								// 	</CardActions>
								// </Card>
								<div key={complaint._id} className={cssClasses.twBlockParent}>
									<div className={cssClasses.timelineTweetListTweet}>
										<div className={cssClasses.timelineTweet}>
											<div className={cssClasses.timelineTweetBrand}>
												<div className={cssClasses.Icon + cssClasses.Icontwitter}></div>
											</div>
											<div className={cssClasses.timelineTweetAuthor}>
												<div className={cssClasses.TweetAuthor}>
													<a
														className={cssClasses.TweetAuthorLink}
														href="#channel"
													></a>
													<span className={cssClasses.TweetAuthorAvatar}>
														<div className={cssClasses.Avatar}>
															{/* <Logo /> */}
															Fixit
														</div>
													</span>
													<span className={cssClasses.TweetAuthorName}>JohnDoe</span>
													<span
														className={cssClasses.Icon + cssClasses.IconVerified}
													></span>
													<span className={cssClasses.TweetAuthoScreenName}>
														@JohnDoe
														<IconButton
															aria-label="display more actions"
															edge="end"
															color="inherit"
															className={classes.moreIcon}
															onClick={openMenu}
														>
															<MoreIcon />
														</IconButton>
														<Menu
															id="simple-menu"
															anchorEl={anchorEl}
															keepMounted
															open={Boolean(anchorEl)}
															onClose={closeMenu}
															className={classes.root}
														>
															<MenuItem onClick={() => closeMenu(complaint._id)}>
																Delete Post
															</MenuItem>
														</Menu>
													</span>
												</div>
											</div>
											<div className={cssClasses.timelineTweetText}>
												Complaint Name :
												<span className={cssClasses.timelineTweetText2}>
													{complaint.complaintname}
												</span>
											</div>
											<div className={cssClasses.timelineTweetText}>
												Category :
												<span className={cssClasses.timelineTweetText2}>
													{complaint.category}
												</span>
											</div>
											<div className={cssClasses.timelineTweetText}>
												Description :
												<span className={cssClasses.timelineTweetText2}>
													{complaint.description}
												</span>
											</div>
											<div className={cssClasses.timelineTweetText}>
												Area :
												<span className={cssClasses.timelineTweetText2}>
													{complaint.sector}
												</span>
											</div>
											<div className={cssClasses.timelineTweetMetadata}>
												<span className={cssClasses.timelineTweetTimestamp}>
													{new Date(complaint.createdAt).getUTCHours()}h
												</span>
											</div>
											<ul className={cssClasses.timelineTweetActions}>
												<li className={cssClasses.timelineTweetAction}>
													<a
														className={cssClasses.Icon + cssClasses.IconHeart}
														href="#"
													></a>
												</li>
												<li className={cssClasses.timelineTweetAction}>
													<a
														className={cssClasses.Icon + cssClasses.IconShare}
														href="#"
													></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							))}
						</Grid>
					</Container>
				</section>
			</div>
		</div>
	);
};

export default Home;
