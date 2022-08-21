import React from "react";
import isEmail from "validator/lib/isEmail";

import classes from "./styles.module.css";


import LoginForm from "./components/LoginForm";
import FullPageLoader from "./components/FullPageLoader";
import FullPageMessage from "./components/FullPageMessage";
import FullPageLayout from "./components/FullPageLayout";
import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import RecoveryPasswordForm from "./components/RecoveryPasswordForm/RecoveryPasswordForm";

import {signIn, signUp, getIdToken, decodeToken, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut} from "./auth";
import AppBar from "./components/AppBar/AppBar";
import Logo from "./svg/Logo";
import UserDropdown from "./components/UserDropdown/UserDropdown";
import DropdownList from "./components/DropdownList/DropdownList";
import getAll from "./api/courses/getAll";
import CourseCard from "./components/CourseCard";

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

		//USER DROPDOWN STATE
		isUserDropdownOpen:false,

		//LOGIN PAGE STATE
		loginEmail:"",
		loginEmailError:"",
		loginPassword:"",
		loginPasswordError:"",
		loginSubmitted:false,


		//CREATE ACCOUNT STATE
		createAccountEmail:"",
		createAccountEmailError:"",
		createAccountPassword: "",
		createAccountPasswordError:"",
		createAccountPasswordRepeat:"",
		createAccountPasswordRepeatError:"",
		createAccountSubmitted:false,

		//RECOVER STATE
		recoverPasswordEmail:"",
		recoverPasswordEmailError:"",
		recoverPasswordEmailSubmitted:"",

		//COURSES STATE
		courses: null,
		searchPhrase:"",
	};

	async componentDidMount(){
		this.setState(()=>({isLoading: true}));
		const userIsLoggedIn = await checkIfUserIsLoggedIn();
		this.setState(()=> ({isLoading: false}));
		if (userIsLoggedIn) this.onUserLogin();
	}

	onLoginClick = async() => {		
		this.setState(()=>({loginSubmitted:true}));

		if(this.state.loginEmailError) return;

		this.setState(()=>({isLoading: true}));
		try {			
			await signIn(this.state.loginEmail, this.state.loginPassword);
			this.onUserLogin();
		} catch (error) {
			this.setState(()=>({
				hasError: true,
				errorMessage: error.data.error.message
			}));

		} finally {
			this.setState(()=> ({isLoading: false}));
		}
	};
	onCreateAccountClick = async() => {		
		this.setState(()=>({createAccountSubmitted:true}));

		if(this.state.createAccountEmailError) return;
		if(this.state.createAccountPasswordError) return;
		if(this.state.createAccountPasswordErrorRepeat) return;

		this.setState(()=>({isLoading: true}));
		this.onUserLogin();
		try {			
			await signUp(this.state.createAccountEmail, this.state.createAccountPassword);
			this.setState(()=>({
				isInfoDisplayed:true,
				infoMessage:"USER ACCOUNT CREATED - ENJOY!"
			}));
		} catch (error) {
			this.setState(()=>({
				hasError: true,
				errorMessage: error.data.error.message
			}));

		} finally {
			this.setState(()=> ({isLoading: false}));
		}
	};
	onRecoverPasswordClick = async() => {		
		this.setState(()=>({recoverPasswordEmailSubmitted:true}));

		if(this.state.recoverPasswordEmailError) return;

		this.setState(()=>({isLoading: true}));
		try {			
			await sendPasswordResetEmail(this.state.recoverPasswordEmail);
			this.setState(()=>({
				isInfoDisplayed:true,
				infoMessage:"Check your inbox"
			}));
		} catch (error) {
			this.setState(()=>({
				hasError: true,
				errorMessage: error.data.error.message
			}));

		} finally {
			this.setState(()=> ({isLoading: false}));
		}
	};

	onUserLogin = () => {
		const token=getIdToken();
		if (!token)return;
		const user = decodeToken(token);
		console.log(user);
		this.setState(()=>({
			isUserLoggedIn:true,
			userDisplayName:"",
			userEmail:user.email,
			userAvatar:"",
		}));

		this.fetchCourses();
	};

	fetchCourses =async()=>{
		try{
			this.setState(()=>({isLoading: true}));
			const dbCourses = await getAll();
			this.setState(()=>({
				courses: dbCourses,
			}));
		}catch (error) {
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
	dismissMessage=()=>{
		this.setState(()=>({
			isInfoDisplayed:false,
			infoMessage:""
		}));
	};

	logOutClick = async() =>{
		await logOut();
		this.setState(()=>({
			isUserLoggedIn:false,
			userDisplayName:"",
			userEmail:"",
			userAvatar:"",
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
			loginPasswordError,
			loginSubmitted,
			createAccountEmail,
			createAccountEmailError,
			createAccountPassword,
			createAccountPasswordError,
			createAccountPasswordRepeat,
			createAccountPasswordRepeatError,
			createAccountSubmitted,
			recoverPasswordEmail,
			recoverPasswordEmailError,
			recoverPasswordEmailSubmitted,
			isUserLoggedIn,
			userDisplayName,
			userEmail,
			userAvatar,
			isUserDropdownOpen,
			courses,
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
								onBackToLoginClick = { this.dismissMessage}

							/> :
							isLoading ?
								<FullPageLoader/> :

								isUserLoggedIn ? 
									<div>
										<AppBar>
											<Logo
												className={classes.logo}
											/>
											<UserDropdown
												onClick={()=>this.setState((prevState)=>({isUserDropdownOpen: !prevState.isUserDropdownOpen}))}
												className={classes.userDropdown}
												userDisplayName={userDisplayName}
												userEmail={userEmail}
												userAvatar={userAvatar}
												contentList={
													isUserDropdownOpen ?
														<DropdownList
															onLogOutClick={this.logOutClick}
														/> 
														: null}
											/>
										</AppBar>
										{
											courses &&  courses.map((course)=>{
												return(
													<CourseCard
														key={course.id}
													/>);
											})
										}
																					
									</div>
									:
									notLoginRoute === "LOGIN" ?
									//LOGIN FORM
										<FullPageLayout>	
											<LoginForm
												email={loginEmail}
												emailError={loginSubmitted ? loginEmailError : undefined}
												password={loginPassword}
												passwordError={loginSubmitted ? loginPasswordError : undefined}
												onLoginClick = {this.onLoginClick}
												onCreateAccountClick = {()=> this.setState(()=>({notLoginRoute: "CREATE-ACCOUNT"}))}
												onRecoveryPasswordClick = {()=> this.setState(()=>({notLoginRoute: "FORGOT PASSWORD"}))}
												onChangeEmail = {(e)=>{
													this.setState(()=>({
														loginEmail: e.target.value,
														loginEmailError: isEmail(e.target.value) ? "" : "Invalid Email"
													}));
												}}
												onChangePassword = {(e)=>this.setState(()=>({
													loginPassword: e.target.value,
													loginPasswordError: e.target.value.length >= 6 ? "" : "Password must have min. 6 chars"
												}))}
											/>
										</FullPageLayout> :
										notLoginRoute === "CREATE-ACCOUNT" ?
										//CREATE ACCOUNT FORM
											<FullPageLayout>
												<CreateAccountForm
													email={createAccountEmail}
													createAccountEmailError={createAccountSubmitted ? createAccountEmailError : undefined}
													password={createAccountPassword}
													createAccountPasswordError={createAccountSubmitted ? createAccountPasswordError : undefined}
													passwordRepeat={createAccountPasswordRepeat}
													createAccountPasswordRepeatError={createAccountSubmitted ? createAccountPasswordRepeatError : undefined}
													onChangeEmail={ (e)=> this.setState(()=>({
														createAccountEmail: e.target.value,
														createAccountEmailError: isEmail(e.target.value) ? "" : "Invalid Email"
													}))}
													onChangePassword={ (e)=> this.setState(()=>({
														createAccountPassword: e.target.value,
														createAccountPasswordError: e.target.value.length >= 6 ? "" : "Password must have min. 6 chars"
													}))}
													onChangePasswordRepeat={ (e)=> this.setState(()=>({
														createAccountPasswordRepeat: e.target.value,
														createAccountPasswordRepeatError: e.target.value !== createAccountPassword ? "Password must be the same" : ""
													}))}
													onCreateAccountClick = { this.onCreateAccountClick} 
													onBackToLoginClick = { ()=> this.setState(()=>({notLoginRoute: "LOGIN"}))}
												/>
											</FullPageLayout> :
											notLoginRoute === "FORGOT PASSWORD" ?
												<FullPageLayout>
													<RecoveryPasswordForm
														email={recoverPasswordEmail}
														recoverPasswordEmailError={recoverPasswordEmailSubmitted ? recoverPasswordEmailError : undefined}
														onChangeRecoverPasswordEmail={(e)=>this.setState(()=>({
															recoverPasswordEmail: e.target.value,
															recoverPasswordEmailError: isEmail(e.target.value) ? "" : "invalid Email"
														}))}
														onRecoverClick={this.onRecoverPasswordClick}
														onBackToLoginClick={()=> this.setState(()=>({notLoginRoute: "LOGIN"}))}
													/>
												</FullPageLayout> :
												null
				}
			</div>
		);}
}

export default App;
