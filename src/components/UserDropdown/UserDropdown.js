import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";

export const UserDropdown = (props) => {
	const {
		className,
		...otherProps
	} = props;

	return (
		<div
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>
			<div>
				<p>NAME</p>
				<p>EMAIL</p>
			</div>
			<div>
        IMG
			</div>
		</div>
	);
};

UserDropdown.propTypes = {
	className: PropTypes.string
};

export default UserDropdown;
