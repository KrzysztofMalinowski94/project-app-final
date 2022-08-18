import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";

import Logo from "../../svg/Logo";
import Typography from "../Typography";
import TextField from "../TextField/TextField";
import Button from "../Button";

export const RecoveryPasswordForm = (props) => {
	const {
		className,
		email,
		onChangeRecoverPasswordEmail,
		onRecoverClick,
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
				placeholder= {"Recovery E-mail"}
				type={"text"}
				value={email}
				onChange={onChangeRecoverPasswordEmail}
			/>
			<Button
				className={classes.btn}
				variant={"contained"}
				color={"primary"}
				onClick={onRecoverClick}
			>Recover</Button>
			<Button
				className={classes.btn}
				variant={"text"}
				onClick={onBackToLoginClick}
			>BACK TO LOGIN</Button>
		</div>
	);
};

RecoveryPasswordForm.propTypes = {
	className: PropTypes.string,
	email:PropTypes.string.isRequired,
	onChangeRecoverPasswordEmail:PropTypes.func.isRequired,
	onRecoverClick:PropTypes.func.isRequired,
	onBackToLoginClick:PropTypes.func.isRequired,
};

export default RecoveryPasswordForm;
