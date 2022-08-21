import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";

export const CourseCard = (props) => {
	const {
		className,
		...otherProps
	} = props;

	return (
		<div
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>
			<div
				className={classes.card__media}
			>
        IMG
			</div>
			<div
				className={classes.card__header}
			>
        TITLE and NAME
			</div>
			<div
				className={classes.card__content}
			>
        DESC
			</div>
			<div
				className={classes.card__actions}
			>
        ICON
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	className: PropTypes.string
};

export default CourseCard;
