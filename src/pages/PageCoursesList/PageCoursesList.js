import React from "react";
import PropTypes from "prop-types";

import classes from "./styles.module.css";
import Logo from "../../svg/Logo";
import TextField from "../../components/TextField/TextField";
import MainLayout from "../../components/MainLayout/MainLayout";
import UserDropdown from "../../components/UserDropdown/UserDropdown";
import DropdownList from "../../components/DropdownList/DropdownList";
import CoursesList from "../../components/CoursesList/CoursesList";

export class PageCoursesList extends  React.Component {
	state = {
		isUserDropdownOpen: false,
		searchPhrase: ""
	};
  
  

	render(){

		const {
			className,
			userDisplayName,
			userEmail,
			userAvatar,
			courses,
			logOutClick,
			...otherProps
		} = this.props;

		const {
			isUserDropdownOpen,
			searchPhrase,
		}=this.state;

		const searchPhraseUpperCase = searchPhrase.toUpperCase();
		const filteredCourses = courses && courses.filter((course)=>{
			return (
				course.title.toUpperCase().includes(searchPhraseUpperCase) ||
				course.category.toUpperCase().includes(searchPhraseUpperCase) ||
				course.description.toUpperCase().includes(searchPhraseUpperCase)
			);
		});

		return (
			<div
				className={`${classes.root}${className ? ` ${className}` : ""}`}
				{...otherProps}
			>
				<MainLayout
					contentAppBar={
						<>
							<Logo
								className={classes.logo}
							/>
							<UserDropdown
								onOpenRequest={()=>this.setState(()=>({isUserDropdownOpen:true}))}
								onCloseRequest={()=>this.setState(()=>({isUserDropdownOpen:false}))}
								className={classes.userDropdown}
								userDisplayName={userDisplayName}
								userEmail={userEmail}
								userAvatar={userAvatar}
								contentList={
									isUserDropdownOpen ?
										<DropdownList
											onLogOutClick={logOutClick}
										/> 
										: null}
							/>
						</>}
					contentSearch={
						<TextField
							className={classes.searchTextfield}
							placeholder={"Type to Search..."}
							value={searchPhrase}
							onChange={(e)=>this.setState(()=>({searchPhrase: e.target.value}))}
						/>
					}
					contentMain= {
						<>
							<CoursesList
								courses={filteredCourses}
							/>		
						</>
					}
											
				>
				</MainLayout>
										
			</div>
		);
	}
} 

PageCoursesList.propTypes = {
	className: PropTypes.string,
	userDisplayName: PropTypes.string,
	userEmail: PropTypes.string,
	userAvatar: PropTypes.string,
	searchPhrase: PropTypes.string,
	courses: PropTypes.array,
	isUserDropdownOpen: PropTypes.bool,
	filteredCourses: PropTypes.array,
	logOutClick: PropTypes.func
};

export default PageCoursesList;
