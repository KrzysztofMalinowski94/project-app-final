import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import defaultAvatar from "./person.svg";

export const Avatar = (props) => {
	const {
		className,
		src = src,
		...otherProps
	} = props;

	return (
		<img
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
			alt="Avatar"
			src={src || defaultAvatar}
		/>
	);
};

Avatar.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string
};

export default Avatar;
