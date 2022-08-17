import React from "react";
import LoaderSvg from "../../svg/Loader";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

export const Loader =(props)=> {

	const {
		className,
		// eslint-disable-next-line no-unused-vars
		...otherProps
	}=props;
	return (
		<div
			className={`${styles.root}${className ? ` ${className}` : "" }`}
		>
			<LoaderSvg/>
		</div>
	);
};

Loader.propTypes ={ 
	className: PropTypes.string
};

export default Loader;