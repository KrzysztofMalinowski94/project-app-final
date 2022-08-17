import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";
import Typography from "../Typography";

export const Button =(props)=> {

	const {
		className,
		variant,
		color,
		children,
		// eslint-disable-next-line no-unused-vars
		...otherProps
	}=props;

	const variantClass = styles[variant];
	const colorClass = styles[color];
	return (
		<button
			className={`${styles.root}${className ? ` ${className}` : "" }${variantClass ? ` ${variantClass}` : ""}${colorClass ? ` ${colorClass}` : ""}`}
		>
			<Typography
				variant={"button"}>
				{children}
			</Typography>
		</button>
	);
};

Button.propTypes ={ 
	className: PropTypes.string,
	// onClick: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(["contained","text"]),
	color: PropTypes.oneOf(["primary","secondary"]),
	children: PropTypes.node
};

export default Button;