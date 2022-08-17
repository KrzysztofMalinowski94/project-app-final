import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";
import Typography from "../Typography";
import Button from "../Button";
import InfoIcon from "../../svg/InfoIcon";

export const FullPageInfo =(props)=> {

	const {
		buttonLabel,
		message,
		className,
		variant,
		color,
		// eslint-disable-next-line no-unused-vars
		...otherProps
	}=props;

	const variantClass = styles[variant];
	const colorClass = styles[color];
	return (
		<div
			className={`${styles.root}${className ? ` ${className}` : "" }${variantClass ? ` ${variantClass}` : ""}${colorClass ? ` ${colorClass}` : ""}`}
		>
		
			<div className={styles.wrapper}>
				<InfoIcon/>
				<Typography
					variant={"h3"}>
					{message}
				</Typography>
				<Button
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
	// onClick: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(["contained","text"]),
	color: PropTypes.oneOf(["primary","secondary"]),
	children: PropTypes.node,
	buttonLabel: PropTypes.string,
	message:PropTypes.string

};

export default FullPageInfo;