import { genObject } from '../../../../interfaces/IGeneral';
import {lvactions} from '../../lvactions/lvactions';
const {handleErrors} = lvactions;


/**
 * Fetching data
 * @param {string} url Url to send request to.
 * @param {genObject} data Data to send with request.
 * @param {genObject} options Fetch-options.
 * @return {Promise<genObject | Error>} Promise that resolves to data, or error. 
 */
export const fetchData = (url: string, data?: genObject, options?: genObject) => {
    
    //Default options for request.
    const defaultOptions = {
        method: 'GET',
        body: JSON.stringify(data),
    };

    //Filling out options with passed data.
    const thisOptions: genObject = {
        ...defaultOptions,
        ...options,
    };
    
    if(!data) delete thisOptions.body;

    //Sending fetch-request.
    return fetch(url, thisOptions)
        .then(async (response) => {
            return response.ok
                ? response.json()
                : handleErrors(await response.json());
        }).catch((error: Error) => handleErrors(error));
};