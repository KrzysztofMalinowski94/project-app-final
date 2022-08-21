import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export const Typography =(props)=>{
	const {
		className,
		children,
		variant,
		...otherProps
	} = props;

	const variantClass = styles[variant];

	return(
		<div
			className={`${styles.root}${className ? ` ${className}` : ""}${variantClass ? ` ${variantClass}` : ""}`}
			{...otherProps}
		>
			{children}
		</div>
	);
};

Typography.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	variant: PropTypes.oneOf([
		"h1","h3","button","textFontStyle1","textFontStyle2", "caption"]
	)
};

export default Typography;