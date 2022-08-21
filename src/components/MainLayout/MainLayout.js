import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import AppBar from "../AppBar";

export const MainLayout = (props) => {
	const {
		className,
		contentAppBar,
		contentMain,
		...otherProps
	} = props;

	return (
		<div
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>
			<AppBar>
				{contentAppBar}
			</AppBar>
			  {contentMain}
		</div>
	);
};

MainLayout.propTypes = {
	className: PropTypes.string,
	contentAppBar: PropTypes.node,
	contentMain: PropTypes.node,
};

export default MainLayout;
