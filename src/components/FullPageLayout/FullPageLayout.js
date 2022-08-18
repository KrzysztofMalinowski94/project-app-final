import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export const FullPageLayout =(props)=>{
	const {
		className,
		children,
		...otherProps
	} = props;

	return(
		<div
			className={`${styles.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>
			{children}
		</div>
	);
};

FullPageLayout.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default FullPageLayout;