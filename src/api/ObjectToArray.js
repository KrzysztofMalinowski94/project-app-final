export const ObjectToArray =(object, keyProperty = "id")=>{
	return (
		Object
			.entries(object || {})
			.map((entry)=>{
				const key=entry[0];
				const value=entry[1];

				if (typeof value === "object"){
					value[keyProperty] = key;
					return value;
				}

				return {
					[keyProperty]: key,
					value:value
				};

			})

	);
};

export default ObjectToArray;