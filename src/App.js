import React from "react";
import "./App.css";

import LoginForm from "./components/LoginForm";
import FullPageLoader from "./components/FullPageLoader";
import FullPageMessage from "./components/FullPageMessage";
import FullPageLayout from "./components/FullPageLayout";


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
			notLoginRoute,
			loginEmail,
			loginPassword,
		} = this.state;


		return (
			<div className="App">
				{ 						
					hasError ?
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
							isLoading ?
								<FullPageLoader/> :
								null
				}
				{
					notLoginRoute === "LOGIN" ?
						
						<FullPageLayout>
							<LoginForm
								email={loginEmail}
								password={loginPassword}
								onLoginClick = {()=>console.log("onLoginClick")}
								onCreateAccountClick = {()=>console.log("onCreateAccountClick")}
								onRecoveryPasswordClick = {()=>console.log("onRecoveryPasswordClick")}
								onChangeEmail = {(e)=>this.setState(()=>({loginEmail: e.target.value}))}
								onChangePassword = {(e)=>this.setState(()=>({loginPassword: e.target.value}))}
							/>
						</FullPageLayout> :
						null
				}
			</div>
		);}
}

export default App;
