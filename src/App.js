import React from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Typography from "./components/Typography";
import FullPageLoader from "./components/FullPageLoader";
import FullPageMessage from "./components/FullPageMessage";
import TextField from "./components/TextField/TextField";

export class App extends React.Component {
  
	state ={
    
		//GLOBAL STATE
		isLoading:false,
		hasError: false,
		errorMessage: "ERROR",
		isInfoDisplayed: false,
		infoMessage: "INFO",
    
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
			hasError,
			errorMessage,
			isInfoDisplayed,
			infoMessage,
		} = this.state;


		return (
			<div className="App">
				<h1>My App</h1>
				{
					isLoading ?
						<FullPageLoader/> : 
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
				<Button
					variant={"contained"}
					color ={"primary"}
				>
					contained primary
				</Button>
				<Button
					variant={"contained"}
					color ={"secondary"}
				>
					contained secondary
				</Button>
				<Button
					variant={"text"}
					color ={"primary"}
				>
					text primary
				</Button>

				{hasError ?
					<FullPageMessage
						actionClick={console.log("Click")}
						buttonLabel={"GO BACK"}
						message={errorMessage}
						iconVariant = {"error"}
					/> :
					isInfoDisplayed ?
						<FullPageMessage
							actionClick={console.log("Click")}
							buttonLabel={"GO BACK"}
							message={infoMessage}
							iconVariant = {"info"}
						/> :
						null
				}
				<TextField
					placeholder ={"E-mail"}
				/>
				<TextField
					type = {"password"}
					placeholder ={"password"}
				/>
			</div>
		);}
}

export default App;
