// import React, { useEffect, useState, useContext } from "react";
// import Navbar from "../../Navbar/Navbar";
// import Complaints from "../../../services/Complaints";
// import { AuthContext } from "../../../context/AuthContext";

// import { makeStyles } from "@material-ui/core/styles";
// import { Container, Grid, Typography, TextField, Button } from "@material-ui/core";
// import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core/";
// // import MoreIcon from "@material-ui/icons/MoreVert";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import cssClasses from "./LandingPage.module.scss";
// import Sidebar from "../Sidebar/Sidebar";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		"& .MuiPaper-root .MuiPaper-rounded": {
// 			borderRadius: "0",
// 			// backgroundColor: "red",
// 		},
// 		width: "100%",
// 		// marginBottom: "10px",
// 		textAlign: "left",
// 		borderRadius: "0",
// 		// boxShadow: "0 0 4px 1px lightgray",
// 	},

// 	title: {
// 		fontSize: 18,
// 		fontWeight: 600,
// 	},
// 	appBar: {
// 		padding: "10px",
// 		marginBottom: "10px",
// 		backgroundColor: "white",
// 		color: "black",
// 		boxShadow: "0 0 4px 1px lightgray",
// 		textAlign: "center",
// 	},
// 	h6: {
// 		fontWeight: "600",
// 		color: "black",
// 	},
// 	moreIcon: {
// 		position: "absolute",
// 		right: "5px",
// 		top: "-10px",
// 	},
// 	menu: {
// 		borderRadius: "0",
// 	},
// 	grid: {
// 		display: "flex",
// 		justiftContent: "center",
// 		flexFlow: "column",
// 	},
// 	accordion: {
// 		borderTop: "1px solid lightgray",
// 		borderRadius: 0,
// 		boxShadow: "none",
// 	},
// 	input: {
// 		width: "100%",
// 	},
// 	Button: {
// 		marginTop: theme.spacing(1),
// 		borderRadius: "0",
// 	},
// }));

// const LandingPage = () => {
// 	const classes = useStyles();
// 	const { setUser, setIsAuthenticated, user, isAuthenticated } = useContext(AuthContext);
// 	const _id = user._id;
// 	const [complaint, setComplaints] = useState([]);
// 	const [commentValue, setComment] = useState("");
// 	const [_ID, setID] = useState("");

// 	useEffect(() => {
// 		Complaints.getAllComplaints().then((data) => {
// 			setComplaints(data);
// 		});
// 	}, []);

// 	function getID(ID) {
// 		// console.log(ID);
// 		return setID(ID);
// 	}

// 	const inputChangeHandler = (e) => {
// 		setComment(e.target.value);
// 	};

// 	const submit = (e) => {
// 		e.preventDefault();
// 	};

// 	return (
// 		<>
// 			<Navbar />
// 			{/* <div>
// 				<div className="">
// 					{isAuthenticated ? (
// 						<div className={cssClasses.Sidebar}>
// 							<Sidebar />
// 						</div>
// 					) : null}
// 					<Container>
// 						<Grid
// 							container
// 							display="flex"
// 							direction="column"
// 							justify="center"
// 							alignItems="center"
// 							item
// 							md={10}
// 							xs={12}
// 							sm={12}
// 							lg={8}
// 						>
// 							{complaint.map((comp) => (
// 								<div key={comp._id} className={cssClasses.twBlockParent}>
// 									<div className={cssClasses.timelineTweetListTweet}>
// 										<div className={cssClasses.timelineTweet}>
// 											<div className={cssClasses.timelineTweetBrand}>
// 												<div className={cssClasses.Icon + cssClasses.Icontwitter}></div>
// 											</div>
// 											<div className={cssClasses.timelineTweetAuthor}>
// 												<div className={cssClasses.TweetAuthor}>
// 													<a
// 														className={cssClasses.TweetAuthorLink}
// 														href="#channel"
// 													></a>
// 													<span className={cssClasses.TweetAuthorAvatar}>
// 														<div className={cssClasses.Avatar}>
// 															{/* <Logo />
// 															Fixit
// 														</div>
// 													</span>
// 													<span className={cssClasses.TweetAuthorName}>JohnDoe</span>
// 													<span
// 														className={cssClasses.Icon + cssClasses.IconVerified}
// 													></span>
// 													<span className={cssClasses.TweetAuthoScreenName}>
// 														@JohnDoe
// 													</span>
// 												</div>
// 											</div>
// 											<div className={cssClasses.timelineTweetText}>
// 												Complaint Name :
// 												<span className={cssClasses.timelineTweetText2}>
// 													{comp.complaintname}
// 												</span>
// 											</div>
// 											<div className={cssClasses.timelineTweetText}>
// 												Category :
// 												<span className={cssClasses.timelineTweetText2}>
// 													{comp.category}
// 												</span>
// 											</div>
// 											<div className={cssClasses.timelineTweetText}>
// 												Description :
// 												<span className={cssClasses.timelineTweetText2}>
// 													{comp.description}
// 												</span>
// 											</div>
// 											<div className={cssClasses.timelineTweetText}>
// 												Area :
// 												<span className={cssClasses.timelineTweetText2}>
// 													{comp.sector}
// 												</span>
// 											</div>
// 											<div className={cssClasses.timelineTweetMetadata}>
// 												<span className={cssClasses.timelineTweetTimestamp}>
// 													{new Date(comp.createdAt).getUTCHours()}h
// 												</span>
// 											</div>
// 											<ul className={cssClasses.timelineTweetActions}>
// 												<li className={cssClasses.timelineTweetAction}>
// 													<a
// 														className={cssClasses.Icon + cssClasses.IconHeart}
// 														href="#"
// 													></a>
// 												</li>
// 												<li className={cssClasses.timelineTweetAction}>
// 													<a
// 														className={cssClasses.Icon + cssClasses.IconShare}
// 														href="#"
// 													></a>
// 												</li>
// 											</ul>
// 										</div>
// 										<Accordion className={classes.accordion}>
// 											<AccordionSummary
// 												expandIcon={<ExpandMoreIcon />}
// 												aria-controls="panel1a-content"
// 												id="panel1a-header"
// 											>
// 												<Typography className={classes.heading}>Comment</Typography>
// 											</AccordionSummary>
// 											<AccordionDetails>
// 												<form onSubmit={submit} className={classes.root}>
// 													<TextField
// 														className={classes.input}
// 														id="comment"
// 														type="text"
// 														name="commentText"
// 														multiline
// 														variant="outlined"
// 														placeholder="Enter Comment"
// 														onChange={inputChangeHandler}
// 													/>
// 													<Button
// 														variant="outlined"
// 														type="submit"
// 														size="large"
// 														onClick={() => getID(complaint._id)}
// 														className={classes.Button}
// 													>
// 														Submit
// 													</Button>
// 												</form>
// 											</AccordionDetails>
// 										</Accordion>
// 									</div>
// 								</div>
// 							))}
// 						</Grid>
// 					</Container>
// 				</div>
// 			</div> */}
// 		</>
// 	);
// };

// export default LandingPage;
