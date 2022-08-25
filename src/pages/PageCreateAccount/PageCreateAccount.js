import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import FullPageLayout from "../../components/FullPageLayout";
import CreateAccountForm from "../../components/CreateAccountForm/CreateAccountForm";
import isEmail from "validator/lib/isEmail";
import {EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR, REPEAT_PASSWORD_VALIDATION_ERROR} from "../../consts";


export class PageCreateAccount extends React.Component {

	state ={
		createAccountEmail: "",
		createAccountEmailError: EMAIL_VALIDATION_ERROR,
		createAccountPassword: "",
		createAccountPasswordError: "",
		createAccountPasswordRepeat: PASSWORD_VALIDATION_ERROR,
		createAccountPasswordRepeatError: REPEAT_PASSWORD_VALIDATION_ERROR,
		createAccountSubmitted: false,
	};

	onCreateAccountClick = async () => {
		this.setState(() => ({ createAccountSubmitted: true }));
	
		if (this.state.createAccountEmailError) return;
		if (this.state.createAccountPasswordError) return;
		if (this.state.createAccountRepeatPasswordError) return;
	
		this.props.onCreateAccountClick(this.state.createAccountEmail, this.state.createAccountPassword);
	  };

	render(){

		const {
			createAccountEmail,
			createAccountEmailError,
			createAccountPassword,
			createAccountPasswordError,
			createAccountPasswordRepeat,
			createAccountPasswordRepeatError,
			createAccountSubmitted,
		} =this.state;

		const {
			className,
			onBackToLoginClick,
			...otherProps
		} = this.props;

		return (
			<div
				className={`${classes.root}${className ? ` ${className}` : ""}`}
				{...otherProps}
			>
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
						onBackToLoginClick = { onBackToLoginClick }
					/>
				</FullPageLayout> :
			</div>
		);
	}
}


PageCreateAccount.propTypes = {
	className: PropTypes.string,
	onCreateAccountClick: PropTypes.func,
	onBackToLoginClick: PropTypes.func
};

export default PageCreateAccount;
