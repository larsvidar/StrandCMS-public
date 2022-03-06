/***** IMPORTS *****/
import {genObject} from '../../interfaces/IGeneral';
import {isError} from '../actions/actions';
import {crudder} from '../actions/crudder-source/crudder';
import {getConfig} from '../actions/sActions';


/***** FUNCTIONS *****/

/**
 * Gets crudder-client
 * @return {genObject | Error} Returns crudder-client, with Firebase, or Error.
 */
export const crudderClient = (): any | Error => {
    const firebaseConfig = getConfig('firebase');
    if(!firebaseConfig?.apiKey) return Error('No config-object');
    const newCrudder =  crudder('firebase', firebaseConfig);

    return newCrudder;
};


export const crudderCreate = async (collection: string, data: genObject) => {
    const client: any = crudderClient();
    const createResponse = await client.create(collection, data);
    return createResponse;
};


/**
 * Reads collection from FireStore.
 * @param {genObject} query Options for what collection to query.
 * @return {any}
 */
export const crudderRead = async (query: genObject) => {
    
    const client: any = crudderClient();
    const {collection} = query;
    
    if(client && !isError(client)) {
        const response = await client.read(collection);
        const result = !response
            ? Error('No data found in collection ' + collection)
            : response;

        return result;
    }
};


/**
 * Logg user inn to crudder-framework.
 * @param {string} username 
 * @param {string} password 
 * @return {genObject} Response from back-end.
 */
export const fireLogin = async (username: string, password: string) => {
    const client: any = crudderClient();
    const loginResponse = await client.client.login(username, password);

    return loginResponse;
};


/**
 * Function for clearing all login-information when user logs out.
 * @return {boolean} Returns true if no errors are thrown.
 */
export const fireLogout = async () => {
    const client: any = crudderClient();
    await client.client.logout();
    return true;
};


/**
 * Authenticates already logged in user
 * @return {genObject} Response from back-end.
 */
export const authenticateUser = async () => {
    const fireClient: any = crudderClient();
    const refreshToken = localStorage.refreshToken;
    const loginResponse = await fireClient.client.login(undefined, undefined, refreshToken);
    return loginResponse;
};
