import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import Typography from "../Typography";
import Button from "../Button";

export const CourseCard = (props) => {
	const {
		className,
		course = {},
		...otherProps
	} = props;

	const {
		image,
		title,
		description,
		category,
	} =course;

	return (
		<div
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>
			<div
				className={classes.card__media}
			>
				<div 
					className={classes.image}
					style={{
						backgroundImage:`url(${image})`,
					}}
				>
          
				</div>
			</div>

			<div
				className={classes.textWrapper}>
				<div
					className={classes.card__header}
				>
					<Typography
						variant={"textFontStyle1"}
						className={classes.title}
					>
						{title}
					</Typography>
					<Typography
						variant={"textFontStyle2"}
						className={classes.category}
					>
						{category}
					</Typography>
				</div>
				<div
					className={classes.card__content}
				>
					<Typography
						variant={"textFontStyle2"}
						className={classes.description}
					>
						{description}
					</Typography>
				</div>
			</div>
			<div
				className={classes.card__actions}
			>
				<Button
					variant={"contained"}
					color={"primary"}
					icon={"eye"}
					disabled={true}
				>
          View course
				</Button>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	className: PropTypes.string,
	course:PropTypes.shape({
		image: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		category: PropTypes.string,
	})
};

export default CourseCard;
