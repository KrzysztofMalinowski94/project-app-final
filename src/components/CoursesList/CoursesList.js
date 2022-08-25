import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import CourseCard from "../CourseCard/CourseCard";

export const CoursesList = (props) => {
	const {
		className,
		courses,
		...otherProps
	} = props;

	return (
		<div
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>										
			{
				(!courses || courses.length === 0) ?
					"NO COURSES" :
					courses &&  courses.map((course)=>{
						return(
							<CourseCard
								key={course.id}
								course={course}
							/>);
					})}
		</div>
	);
};

CoursesList.propTypes = {
	className: PropTypes.string,
	courses:PropTypes.array
};

export default CoursesList;
