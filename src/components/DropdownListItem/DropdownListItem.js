import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import LogOut from "../../svg/LogOut";
import AvatarSvg from "../../svg/AvatarSvg";
import Typography from "../Typography";

export const DropdownListItem = (props) => {
	const {
		className,
		text,
		icon,
		disabled,
		...otherProps
	} = props;

	return (
		<li
			className={`${classes.root}${className ? ` ${className}` : ""}${disabled ? ` ${classes.disabled}`: ""}`}
			{...otherProps}
		>
			<div
				className={classes.iconWrapper}
			>
				{icon === "logout" ?
					<LogOut/>
					:
					icon === "profile" ?
						<AvatarSvg/>
						:
						null
				}
			</div>
			<div
				className={classes.textWrapper}
			>
				<Typography
					variant={"textFontStyle2"}
					className={classes.text}
				>
					{text}
				</Typography>
			</div>
		</li>
	);
};

DropdownListItem.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	icon: PropTypes.oneOf("logout" , "profile"),
	disabled: PropTypes.bool
};

export default DropdownListItem;
