import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";

export const UserDropdown = (props) => {
	const {
		className,
		userDisplayName,
		userEmail,
		// userAvatar,
		...otherProps
	} = props;

	return (
		<div
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>
			<div>
				<p>{userDisplayName}</p>
				<p>{userEmail}</p>
			</div>
			<div>
        IMG
			</div>
		</div>
	);
};

UserDropdown.propTypes = {
	className: PropTypes.string,
	userDisplayName: PropTypes.string,
	userEmail: PropTypes.string,
	userAvatar: PropTypes.img,
};

export default UserDropdown;
