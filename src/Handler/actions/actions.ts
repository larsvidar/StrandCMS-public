/***** IMPORTS *****/
import { genObject } from '../../interfaces/IGeneral';


/***** FUNCTIONS ******/

/**
 * Converts passed unix epoch-number to date-string.
 * @param {number} epoch Ms since unix epoch.
 */
export const formatDate = (epoch: number | string): string => {
    const date = new Date(epoch);
    return date && 
        date.toLocaleDateString('no-NB', {
            day: '2-digit', month: '2-digit', year: 'numeric',
        });
};


/**
 * Checks if passed value is an error-object.
 * @param {any} value Value to be checked.
 * @return {boolean} True if error, false if not.
 */
export function isError(value: genObject | Error | boolean): value is Error {
    return value instanceof Error
        ? true
        : typeof value !== 'object'
            ? false
            : value?.error
                ? true
                : false;
}


/**
 * Formats a string into a link-friendly format.
 * @param {string} link string to be formated
 * @return {string} the formated string.
 */
export const stringifyLink = (link: string): string => {
    if(link) {
        let newLink = link.toLowerCase()
            .replace(/ø/g, 'o')
            .replace(/æ/g, 'e')
            .replace(/å/g, 'a');
        newLink = newLink.replace(/[^a-z0-9\s]/g, '');
        return newLink.replace(/\s/g, '-');
    }
    return 'Undefined';
};


/**
 * Sorts an array of object based on values in passed key.
 * @param {Array<any>} array - Array of objects to be sorted.
 * @param {string} key to be sorted by.
 * @param {string} sort - Optional - Sort order: 'asc' or 'desc'. 
 * @param {Array<any>} Array of sorted objects (or error-object).
 */
export const sortObjectArray = (array: genObject[], key: string, sort = 'asc'): genObject[] => {
    //Checking if passed array has objects with passed key.
    const valueObject = array?.[0];
    if(valueObject[key] !== undefined) {
        //Returns sorted array
        return [...array].sort((a, b) => {
            //Checking sort-order.
            const sortFactor = sort.toLowerCase() === 'asc' ? 1 : -1;
            //Converting to lower-case if property is string.
            const value1 = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
            const value2 = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

            //comparing values.
            return value1 > value2
                ? sortFactor
                : -sortFactor;
        });
    //If array don't have object, or object don't have passed key, return error-object.
    } else {
        return array || [];
    }
};


/**
 * 
 * @param obj 
 * @return {boolean}
 */
export function isEmpty<T> (obj: T) {
    if(!obj) return true;
    if(Array.isArray(obj)) {
        if(obj.length) return false;
        return true;
    }
    if(typeof obj === 'object') {
        if(Object.keys(obj).length) return false;
        return true;
    }
    
    return false; 
}


export function removeEmpty<T>(data: T) {
    return isEmpty(data)
        ? undefined
        : data;
}


export const removeUndefined = (data: genObject): genObject => {
    const newObject: genObject = {};
    const entries = Object.entries(data);
    entries.forEach((entrie) => {
        if(!isEmpty(entrie[1])) newObject[entrie[0]] = entrie[1];
    });

    return newObject;
};


/**
 * Generates a UUID of variabel size.
 * @param {number} size - Default value: 16 - Length of UUID-string.
 * @return {string} UUID-string.
 */
export const genUid = (size = 16): string => {
    //Make variabel for Uid.
    const code = [];

    //Loop through number of characters
    for(let i = 0; i < size; i++) {

        //Get random number or letter and add it to variabel
        if(Math.random() < .3) code.push(Math.floor(Math.random()*10));
        else code.push(String.fromCharCode(Math.floor(Math.random() * 26) + 97));
    }

    //Return finished code.
    return code.join('');
};
