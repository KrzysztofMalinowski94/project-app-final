import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";
import Typography from "../Typography";

export const Button =(props)=> {

	const {
		actionClick,
		className,
		variant,
		color,
		children,
		...otherProps
	}=props;

	const variantClass = styles[variant];
	const colorClass = styles[color];
	return (
		<button
			onClick={actionClick}
			className={`${styles.root}${className ? ` ${className}` : "" }${variantClass ? ` ${variantClass}` : ""}${colorClass ? ` ${colorClass}` : ""}`}
			{...otherProps}
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
	actionClick: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(["contained","text"]),
	color: PropTypes.oneOf(["primary","secondary"]),
	children: PropTypes.node
};

export default Button;