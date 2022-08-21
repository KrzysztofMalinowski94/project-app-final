import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import Typography from "../Typography";
import Avatar from "../Avatar";

export const UserDropdown = (props) => {
	const {
		className,
		userDisplayName,
		userEmail,
		userAvatar,
		contentList,
		onOpenRequest,
		onCloseRequest,
		...otherProps
	} = props;

	return (
		<div
			className={`${classes.root}${className ? ` ${className}` : ""}`}
			{...otherProps}
		>
			<div className={classes.wrapper}>
				<div
					onClick={onOpenRequest}
					className={classes.textWrapper}
				>
					<Typography
						className={classes.userDisplayName}
						variant={"textFontStyle1"}
					>
						{userDisplayName || "-- --"}
					</Typography>
					<Typography
						className={classes.userEmail}
						variant={"caption"}
					>
						{userEmail}
					</Typography>
				</div>
				<div
					className={classes.avatarWrapper}
				>
					<Avatar
						src={userAvatar}
					/>
				</div>
			</div>
			{
				 contentList ?
				 <>
				   <div
					 className={classes.overlay}
					 onClick={onCloseRequest}
				   >
					
				   </div>
				   <div
					 className={classes.listContainer}
				   >
					 {contentList}
				   </div>
				 </>
				 :
				 null
			}
		</div>
	);
};

UserDropdown.propTypes = {
	className: PropTypes.string,
	userDisplayName: PropTypes.string,
	userEmail: PropTypes.string,
	userAvatar: PropTypes.string,
	contentList: PropTypes.node,
	onOpenRequest: PropTypes.func.isRequired,
	onCloseRequest: PropTypes.func.isRequired,
};

export default UserDropdown;
