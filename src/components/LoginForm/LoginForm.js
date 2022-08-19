import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";

import TextField from "../TextField/TextField";
import Button from "../Button";

import Logo from "../../svg/Logo";
import Typography from "../Typography";

export const LoginForm = (props) => {
	const {
		className,
		email,
		emailError,
		password,
		onLoginClick,
		onCreateAccountClick,
		onRecoveryPasswordClick,
		onChangeEmail,
		onChangePassword,
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
        Log in 👋
			</Typography>
			<TextField
				className={classes.textfield}
				errorMessage={emailError}
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
			<Button
				className={classes.btn}
				variant={"contained"}
				color={"primary"}
				onClick={onLoginClick}
			>LOGIN</Button>
			<Button
				className={classes.btn}
				variant={"contained"}
				color={"secondary"}
				onClick={onCreateAccountClick}
			>CREATE ACCOUNT</Button>
			<Button
				className={classes.btn}
				variant={"text"}
				onClick={onRecoveryPasswordClick}
			>FORGOT PASSWORD</Button>
		</div>
	);
};

LoginForm.propTypes = {
	className: PropTypes.string,
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	onLoginClick:PropTypes.func.isRequired,
	onCreateAccountClick:PropTypes.func.isRequired,
	onRecoveryPasswordClick:PropTypes.func.isRequired,
	onChangeEmail:PropTypes.func.isRequired,
	onChangePassword:PropTypes.func.isRequired,
	emailError:PropTypes.string
};

export default LoginForm;
