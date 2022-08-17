import React from "react";
import "./App.css";

export class App extends React.Component {
  
	state ={
    
		//GLOBAL STATE
		isLoading:true,
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
		return (
			<div className="App">

			</div>
		);}
}

export default App;
