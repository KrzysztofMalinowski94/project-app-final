import React from "react";

import Loader from "../Loader";
import FullPageLayout from "../FullPageLayout";

export const FullPageLoader = (props) => {
	return(
		<FullPageLayout>
			<Loader
				{...props}            
			/>
		</FullPageLayout>
	);
};

export default FullPageLoader; 