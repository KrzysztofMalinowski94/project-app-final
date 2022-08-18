import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";
import Typography from "../Typography";
import Button from "../Button";
import InfoIcon from "../../svg/InfoIcon";
import ErrorIcon from "../../svg/ErrorIcon";

export const FullPageInfo =(props)=> {

	const {
		buttonLabel,
		message,
		className,
		variant,
		color,
		iconVariant = "info",
		actionClick,
		...otherProps
	}=props;

	const variantClass = styles[variant];
	const colorClass = styles[color];
	return (
		<div
			className={`${styles.root}${className ? ` ${className}` : "" }${variantClass ? ` ${variantClass}` : ""}${colorClass ? ` ${colorClass}` : ""}`}
			{...otherProps}
		>
		
			<div className={styles.wrapper}>
				{
					iconVariant === "info" ?
						<InfoIcon/> :
						iconVariant === "error" ?
							<ErrorIcon/> :
							null
				}
				<Typography
					variant={"h3"}>
					{message}
				</Typography>
				<Button
					actionClick={actionClick}
					variant={"contained"}
					color={"primary"}
				>
					{buttonLabel}
				</Button>
			</div>
		</div>
	);
};

FullPageInfo.propTypes ={ 
	className: PropTypes.string,
	actionClick: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(["contained","text"]),
	color: PropTypes.oneOf(["primary","secondary"]),
	children: PropTypes.node,
	buttonLabel: PropTypes.string,
	message:PropTypes.string,
	iconVariant: PropTypes.oneOf(["info","error"])

};

export default FullPageInfo;