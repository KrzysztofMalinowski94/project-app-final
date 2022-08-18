import React from "react";
import "./App.css";

import LoginForm from "./components/LoginForm";
import FullPageLoader from "./components/FullPageLoader";
import FullPageMessage from "./components/FullPageMessage";
import FullPageLayout from "./components/FullPageLayout";
import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import RecoveryPasswordForm from "./components/RecoveryPasswordForm/RecoveryPasswordForm";


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
		notLoginRoute: "LOGIN", // 'CREATE-ACCOUNT or FORGOT PASSWORD'

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
			createAccountEmail,
			createAccountPassword,
			createAccountPasswordRepeat,
			recoverPasswordEmail,
		} = this.state;


		return (
			<div className="App">
				{ 						
					hasError ?
						<FullPageMessage
							buttonLabel={"GO BACK"}
							message={errorMessage}
							iconVariant = {"error"}
						/> :
						isInfoDisplayed ?
							<FullPageMessage
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
								onCreateAccountClick = {()=> this.setState(()=>({notLoginRoute: "CREATE-ACCOUNT"}))}
								onRecoveryPasswordClick = {()=> this.setState(()=>({notLoginRoute: "FORGOT PASSWORD"}))}
								onChangeEmail = {(e)=>this.setState(()=>({loginEmail: e.target.value}))}
								onChangePassword = {(e)=>this.setState(()=>({loginPassword: e.target.value}))}
							/>
						</FullPageLayout> :
						notLoginRoute === "CREATE-ACCOUNT" ?
							<FullPageLayout>
								<CreateAccountForm
									email={createAccountEmail}
									password={createAccountPassword}
									passwordRepeat={createAccountPasswordRepeat}
									onChangeEmail={ (e)=> this.setState(()=>({createAccountEmail: e.target.value}))}
									onChangePassword={ (e)=> this.setState(()=>({createAccountPassword: e.target.value}))}
									onChangePasswordRepeat={ (e)=> this.setState(()=>({createAccountPasswordRepeat: e.target.value}))}
									onCreateAccountClick = { ()=> console.log("onCreateAccountClick")} 
									onBackToLoginClick = { ()=> this.setState(()=>({notLoginRoute: "LOGIN"}))}
								/>
							</FullPageLayout> :
							notLoginRoute === "FORGOT PASSWORD" ?
								<FullPageLayout>
									<RecoveryPasswordForm
										email={recoverPasswordEmail}
										onChangeRecoverPasswordEmail={(e)=>this.setState(()=>({recoverPasswordEmail: e.target.value}))}
										onRecoverClick={()=>console.log("onRecoverClick")}
										onBackToLoginClick={()=> this.setState(()=>({notLoginRoute: "LOGIN"}))}
									/>
								</FullPageLayout> :
								null
				}
			</div>
		);}
}

export default App;
