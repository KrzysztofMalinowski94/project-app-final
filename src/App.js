import React from "react";
import isEmail from "validator/lib/isEmail";

import "./App.css";

import LoginForm from "./components/LoginForm";
import FullPageLoader from "./components/FullPageLoader";
import FullPageMessage from "./components/FullPageMessage";
import FullPageLayout from "./components/FullPageLayout";
import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import RecoveryPasswordForm from "./components/RecoveryPasswordForm/RecoveryPasswordForm";

import {signIn} from "./auth";

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
		loginEmailError:"",
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

	onLoginClick = async() => {		
		this.setState(()=>({isLoading: true}));
		try {			
			await signIn(this.state.loginEmail, this.state.loginPassword);
		} catch (error) {
			this.setState(()=>({
				hasError: true,
				errorMessage: error.data.error.message
			}));

		} finally {
			this.setState(()=> ({isLoading: false}));
		}
	};

	dismissError=()=>{

		this.setState(()=>({
			hasError:false,
			errorMessage:""
		}));
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
			loginEmailError,
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
							onBackToLoginClick = { this.dismissError}
						/> :
						isInfoDisplayed ?
							<FullPageMessage
								buttonLabel={"GO BACK"}
								message={infoMessage}
								iconVariant = {"info"}
								onBackToLoginClick = { this.dismissError}

							/> :
							isLoading ?
								<FullPageLoader/> :
								notLoginRoute === "LOGIN" ?
						
									<FullPageLayout>
										<LoginForm
											email={loginEmail}
											emailError={loginEmailError}
											password={loginPassword}
											onLoginClick = {this.onLoginClick}
											onCreateAccountClick = {()=> this.setState(()=>({notLoginRoute: "CREATE-ACCOUNT"}))}
											onRecoveryPasswordClick = {()=> this.setState(()=>({notLoginRoute: "FORGOT PASSWORD"}))}
											onChangeEmail = {(e)=>{
												this.setState(()=>({
													loginEmail: e.target.value,
													loginEmailError: isEmail(e.target.value) ? "" : "Invalid Email"
												}));
											}}
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
