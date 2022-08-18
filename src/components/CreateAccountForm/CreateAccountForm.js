import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";

import Logo from "../../svg/Logo";
import Typography from "../Typography";
import TextField from "../TextField/TextField";
import Button from "../Button";

export const CreateAccountForm = (props) => {
	const {
		className,
		email,
		password,
		passwordRepeat,
		onChangeEmail,
		onChangePassword,
		onChangePasswordRepeat,
		onCreateAccountClick,
		onBackToLoginClick,
		...otherProps
	} = props;

	return (
		<div
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>
			<Logo
				className={classes.logo}
			/>
			<Typography
				className={classes.greeter}
				variant={"h1"}>
        Create new account
			</Typography>
			<TextField
				className={classes.textfield}
				placeholder= {"E-mail"}
				value={email}
				onChange={onChangeEmail}
			/>
			<TextField
				className={classes.textfield}
				placeholder= {"password"}
				type={"password"}
				value={password}
				onChange={onChangePassword}
			/>
			<TextField
				className={classes.textfield}
				placeholder= {"Repeat password"}
				type={"password"}
				value={passwordRepeat}
				onChange={onChangePasswordRepeat}
			/>
			<Button
				className={classes.btn}
				variant={"contained"}
				color={"primary"}
				onClick={onCreateAccountClick}
			>CREATE ACCOUNT</Button>
			<Button
				className={classes.btn}
				variant={"text"}
				onClick={onBackToLoginClick}
			>BACK TO LOGIN</Button>
		</div>
	);
};

CreateAccountForm.propTypes = {
	className: PropTypes.string,
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	passwordRepeat: PropTypes.string.isRequired,
	onChangeEmail: PropTypes.func.isRequired,
	onChangePassword: PropTypes.func.isRequired,
	onChangePasswordRepeat: PropTypes.func.isRequired,
	onCreateAccountClick: PropTypes.func.isRequired,
	onBackToLoginClick: PropTypes.func.isRequired,
};

export default CreateAccountForm;
