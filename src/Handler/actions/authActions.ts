/***** IMPORTS *****/
import { loginAction, checkLoginAction, logoutAction } from "../FireBase/firebaseHandler";
import { isError } from "./actions";


/***** FUNCTIONS *****/

/**
 * Handles login
 * @param {string} email Users email-adress.
 * @param {string} password Users password.
 * @return {}
 */
export const login = (email: string, password: string) => {
    return loginAction(email, password);
}


/**
 * 
 * @param setIsLoggedIn 
 */
export const checkLogin = (setIsLoggedIn: Function): Promise<boolean> => {
    return checkLoginAction(setIsLoggedIn);
}


/**
 * 
 * @param history 
 * @param url 
 */
export const logout = async (history: any, url: string) => {
    const logoutResponse = await logoutAction();

    if(isError(logoutResponse)) console.log('Error logging out...');

    history.push(url);
    return logoutResponse;
}
