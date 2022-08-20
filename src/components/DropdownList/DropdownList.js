import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import DropdownListItem from "../DropdownListItem/DropdownListItem";

export const DropdownList = (props) => {
	const {
		className,
		...otherProps
	} = props;

	return (
		<ul
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>
			<DropdownListItem
				text={"Profile"}
				icon={"profile"}
				disabled={true}
			/>
			<DropdownListItem
				text={"Logout"}
				icon={"logout"}
			/>

		</ul>
	);
};

DropdownList.propTypes = {
	className: PropTypes.string
};

export default DropdownList;
