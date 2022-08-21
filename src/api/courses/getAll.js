import { makeAuthorizedRequest } from "../../auth";
import { COURSES_API_KEY } from "./consts";
import ObjectToArray from "../ObjectToArray";
import makeApiUrl from "../MakeApiUrl";

export const getAll =async()=>{
	const rawData = await makeAuthorizedRequest(makeApiUrl(COURSES_API_KEY));
	return ObjectToArray(rawData);
    
};

export default getAll;