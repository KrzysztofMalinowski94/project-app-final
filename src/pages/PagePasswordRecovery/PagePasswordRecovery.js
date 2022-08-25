import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import RecoveryPasswordForm from "../../components/RecoveryPasswordForm/RecoveryPasswordForm";
import isEmail from "validator/lib/isEmail";
import { EMAIL_VALIDATION_ERROR } from "../../consts";



export class PagePasswordRecovery extends React.Component {

	state ={
		recoverPasswordEmail:"",
		recoverPasswordEmailError:EMAIL_VALIDATION_ERROR,
		recoverPasswordEmailSubmitted:false,
	};
  
	onRecoverPasswordClick = async() => {		
		if(this.state.recoverPasswordEmailError) return;

		this.setState(()=>({recoverPasswordEmailSubmitted:true}));

		this.props.onRecoverClick();
	};

	render(){

		const {
			className,
			onBackToLoginClick,
			...otherProps
		} = this.props;

		const {
			recoverPasswordEmail,
			recoverPasswordEmailError,
			recoverPasswordEmailSubmitted,
		} = this.state;

		return (
			<div
				className={`${classes.root}${className ? ` ${className}` : ""}`}
				{...otherProps}
			>
				<RecoveryPasswordForm
					email={recoverPasswordEmail}
					recoverPasswordEmailError={recoverPasswordEmailSubmitted ? recoverPasswordEmailError : undefined}
					onChangeRecoverPasswordEmail={(e)=>this.setState(()=>({
						recoverPasswordEmail: e.target.value,
						recoverPasswordEmailError: isEmail(e.target.value) ? "" : "invalid Email"
					}))}
					onRecoverClick={this.onRecoverClick}
					onBackToLoginClick={onBackToLoginClick}
				/>
			</div>
		);

	}
}
PagePasswordRecovery.propTypes = {
	className: PropTypes.string,
	onBackToLoginClick:PropTypes.func,
	onRecoverClick:PropTypes.func,
};

export default PagePasswordRecovery;
