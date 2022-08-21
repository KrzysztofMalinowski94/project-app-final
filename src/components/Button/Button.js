import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";
import Typography from "../Typography";

import EyeIcon from "../../svg/EyeIcon";

export const Button =(props)=> {

	const {
		className,
		variant,
		color,
		children,
		icon,
		disabled,
		...otherProps
	}=props;

	const variantClass = styles[variant];
	const colorClass = styles[color];
	return (
		<button
			className={`${styles.root}${className ? ` ${className}` : "" }${variantClass ? ` ${variantClass}` : ""}${colorClass ? ` ${colorClass}` : ""}${disabled ? ` ${styles.disabled}` : ""}`}
			{...otherProps}
		>
			{
				icon === "eye" ?
					<EyeIcon/> :
					null
			}
			<Typography
				variant={"button"}>
				{children}
			</Typography>
		</button>
	);
};

Button.propTypes ={ 
	className: PropTypes.string,
	variant: PropTypes.oneOf(["contained","text"]),
	color: PropTypes.oneOf(["primary","secondary"]),
	children: PropTypes.node,
	icon: PropTypes.string,
	disabled: PropTypes.bool
};

export default Button;