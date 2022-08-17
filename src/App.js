import React from "react";
import "./App.css";
import Loader from "./components/Loader";
import Typography from "./components/Typography";

export class App extends React.Component {
  
	state ={
    
		//GLOBAL STATE
		isLoading:false,
		hasError: false,
		errorMessage: "",
		isInfoDisplayed: false,
		infoMessage: "",
    
		//USER/AUTH STATE
		isUserLoggedIn:false,
		userDisplayName:"",
		userEmail:"",
		userAvatar: "",

		//
		notLoginRoute: "LOGIN", // 'NEW-ACCOUNT or FORGOT PASSWORD'

		//LOGIN PAGE STATE
		loginEmail:"",
		loginPassword:"",


		//CREATE ACCOUNT STATE
		createAccountEmail:"",
		createAccountPassword: "",
		createAccountPasswordRepeat:"",

		//RECOVER STATE
		recoverPasswordEmail:"",

		//COURSES STATE
		courses: null,
		searchPhrase:"",

	};

	render(){

		const {
			isLoading,
			// hasError,
			// errorMessage,
			// isInfoDisplayed,
			// infoMessage,
		} = this.state;


		return (
			<div className="App">
				<h1>My App</h1>
				{
					isLoading ?
						<Loader/> : 
						null
				}
				<Typography
					variant = {"h1"}
				>
					HEADER1
				</Typography>
				<Typography
					variant = {"h3"}
				>
					HEADER3
				</Typography>
				<Typography
					variant = {"button"}
				>
					Button
				</Typography>
			</div>
		);}
}

export default App;
