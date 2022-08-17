import React from "react";
import "./App.css";

export class App extends React.Component {
  
	state ={ 
		isLoading:true,
		hasError: false,
		errorMessage: "",
		isInfoDisplayed: false,
		infoMessage: "",
    
    isUserLoggedIn:false,
	};

	render(){
		return (
			<div className="App">

			</div>
		);}
}

export default App;
