/***** IMPORTS *****/
import configFile from '../../config.json';
import {genObject} from '../../interfaces/IGeneral';


/***** FUNCTIONS *****/

/**
 * 
 * @param moduleName 
 */
export const getModule = async (moduleName: string, getView = false) => {
    const fullName = 'SM' + moduleName;

    let modulePath = fullName + '/';
    modulePath += getView
        ? 'View/' + fullName + 'View'
        : fullName;

    const module = await import('../../plugins/' + modulePath).catch((error) => error);
    return(module.default || module);
};


/**
 * 
 * @param key 
 */
export const getConfig = (key?: string) => {
    const config: genObject = configFile;
    if(key) return config?.[key] || {};
    return config;
};


/**
 * 
 * @param language 
 */
export const getLanguage = async (language: string) => {
    if(!language) return {};
    
    const locale = await import('../../locales/' + language).catch(error => error);

    return locale?.default || {};
};


/**
 * 
 * @param theme 
 * @param element 
 */
export const setTheme = (theme: genObject, element: genObject) => {
    if(theme && element.current) {
        Object.keys(theme)?.forEach((key: string) => {
            element.current?.style.setProperty('--' + key, theme[key]);
        });
    }
};

