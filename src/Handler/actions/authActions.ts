/***** IMPORTS *****/
import {genObject} from '../../interfaces/IGeneral';
import {loginAction} from '../crudder/firebaseHandler';
import {authenticateUser, fireLogout} from '../crudder/crudderHandler';
import {isError} from './actions';


/***** FUNCTIONS *****/

/**
 * Handles login
 * @param {string} email Users email-adresse.
 * @param {string} password Users password.
 * @return {}
 */
export const login = (email: string, password: string) => {
    return loginAction(email, password);
};


/**
 * 
 * @param setIsLoggedIn 
 */
export const checkLogin = (): Promise<genObject> => {
    //return checkLoginAction(setIsLoggedIn);

    return authenticateUser();
};


/**
 * 
 * @param history 
 * @param url 
 */
export const logout = async (history: any, url: string) => {
    const logoutResponse = await fireLogout();

    if(isError(logoutResponse)) console.log('Error logging out...');

    history.push(url);
    return logoutResponse;
};
