/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import FullPageLayout from "../../components/FullPageLayout";
import LoginForm from "../../components/LoginForm";
import isEmail from "validator/lib/isEmail";

import classes from "./styles.module.css";

import {EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR} from "../../consts";


export class PageLogin extends React.Component {
  
	state={
		loginEmail: "",
		loginEmailError: EMAIL_VALIDATION_ERROR,
		loginPassword: "",
		loginPasswordError: PASSWORD_VALIDATION_ERROR,
		loginSubmitted: false,
	};

	onLoginClick = async() => {		
		this.setState(()=>({loginSubmitted:true}));
  
		if(this.state.loginEmailError) return;
    
		this.props.onLoginClick(this.state.loginEmail, this.state.loginPassword);
	};

	render(){
		const {
			onCreateAccountClick,
			onRecoveryPasswordClick,
			...otherProps
		} = this.props;
  
		const {
			className,
			loginEmail,
			loginSubmitted,
			loginEmailError,
			loginPassword,
			loginPasswordError
		} = this.state;
  
		return (
			<div
				className={`${classes.root}${className ? ` ${className}` : ""}`}
				{...otherProps}
			>
				<FullPageLayout>
					<LoginForm
						email={loginEmail}
						emailError={loginSubmitted ? loginEmailError : undefined}
						password={loginPassword}
						passwordError={loginSubmitted ? loginPasswordError : undefined}
						onLoginClick = {this.onLoginClick}
						onCreateAccountClick = {onCreateAccountClick}
						onRecoveryPasswordClick = {onRecoveryPasswordClick}
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
				</FullPageLayout>
			</div>
		);
	}
}

PageLogin.propTypes = {
	className: PropTypes.string,
	loginEmail: PropTypes.string,
	loginEmailError: PropTypes.string,
	loginPassword: PropTypes.string,
	loginPasswordError: PropTypes.string,
	loginSubmitted: PropTypes.bool,
	onLoginClick:PropTypes.func,
	onCreateAccountClick: PropTypes.func,
	onRecoveryPasswordClick: PropTypes.func,
};

export default PageLogin;
