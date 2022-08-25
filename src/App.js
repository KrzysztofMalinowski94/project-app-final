import React from "react";

import FullPageLoader from "./components/FullPageLoader";
import FullPageMessage from "./components/FullPageMessage";
import FullPageLayout from "./components/FullPageLayout";

import {signIn, signUp, getIdToken, decodeToken, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut} from "./auth";
import getAll from "./api/courses/getAll";

import PageCoursesList from "./pages/PageCoursesList/PageCoursesList";
import PageLogin from "./pages/PageLogin";
import PageCreateAccount from "./pages/PageCreateAccount/PageCreateAccount";
import PagePasswordRecovery from "./pages/PagePasswordRecovery/PagePasswordRecovery";

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

		//COURSES STATE
		courses: null,
	};

	async componentDidMount(){
		this.setState(()=>({isLoading: true}));
		const userIsLoggedIn = await checkIfUserIsLoggedIn();
		this.setState(()=> ({isLoading: false}));
		if (userIsLoggedIn) this.onUserLogin();
	}

	handleAsyncAction = async(asyncAction) =>{
		this.setState(()=>({isLoading: true}));
		try {			
			await asyncAction();
			
		} catch (error) {
			this.setState(()=>({
				hasError: true,
				errorMessage: error.data.error.message
			}));

		} finally {
			this.setState(()=> ({isLoading: false}));
		}
	};

	onLoginClick = async(email, password) => {		
		this.handleAsyncAction(async()=>{
			await signIn(email, password);
			this.onUserLogin();
		});
	
	};

	onCreateAccountClick = async(email, password) => {		
		this.handleAsyncAction(async()=>{
			await signUp(email, password);
			this.setState(()=>({
				isInfoDisplayed:true,
				infoMessage:"USER ACCOUNT CREATED - ENJOY!"
			}));
		});
	};

	onRecoverPasswordClick = async() => {		
		this.handleAsyncAction(async()=>{
			await sendPasswordResetEmail(this.state.recoverPasswordEmail);
			this.setState(()=>({
				isInfoDisplayed:true,
				infoMessage:"Check your inbox"
			}));
		});
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
			isUserLoggedIn,
			userDisplayName,
			userEmail,
			userAvatar,
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
									<PageCoursesList
										userDisplayName={userDisplayName}
										userEmail={userEmail}
										userAvatar={userAvatar}
										courses={courses}
										logOutClick={this.logOutClick}
									/>
									:
									notLoginRoute === "LOGIN" ?
									//LOGIN FORM
										<PageLogin											
											onLoginClick={this.onLoginClick}
											onBackToLoginClick ={this.onBackToLoginClick}
											onCreateAccountClick={()=> this.setState(()=>({notLoginRoute: "CREATE-ACCOUNT"}))}
											onRecoveryPasswordClick={()=> this.setState(()=>({notLoginRoute: "FORGOT PASSWORD"}))}
										/> :
										notLoginRoute === "CREATE-ACCOUNT" ?
										//CREATE ACCOUNT FORM
											<PageCreateAccount
												onCreateAccountClick = { this.onCreateAccountClick} 
												onBackToLoginClick ={()=> this.setState(()=>({notLoginRoute: "LOGIN"}))}
											/>
											:
											notLoginRoute === "FORGOT PASSWORD" ?
												<FullPageLayout>
													<PagePasswordRecovery
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
