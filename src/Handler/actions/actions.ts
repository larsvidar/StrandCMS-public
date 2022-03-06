import { genObject } from "../../interfaces/IGeneral";

/***** FUNCTIONS ******/

/**
 * Converts passed unix epoch-number to date-string.
 * @param {number} epoch Ms since unix epoch.
 */
export const formatDate = (epoch: number): string => {
    const date = new Date(epoch);
    return date && 
        date.toLocaleDateString('no-NB', {
            day: '2-digit', month: '2-digit', year: 'numeric',
        });
}


/**
 * Checks if passed value is an error-object.
 * @param {any} value Value to be checked.
 * @return {boolean} True if error, false if not.
 */
export const isError = (value: any): value is Error => value instanceof Error
    ? true
    : value?.error
        ? true
        : false;


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
            .replace(/å/g, 'a');;
        newLink = newLink.replace(/[^a-z0-9\s]/g, "");
        return newLink.replace(/\s/g, "-");
    }
    return 'Undefined';
}


/**
 * Sorts an array of object based on values in passed key.
 * @param {Array<any>} array - Array of objects to be sorted.
 * @param {string} key to be sorted by.
 * @param {string} sort - Optional - Sort order: 'asc' or 'desc'. 
 * @param {Array<any>} Array of sorted objects (or error-object).
 */
export const sortObjectArray = (array: Array<any>, key: string, sort: string = 'asc'): any[] => {
    //Checking if passed array has objects with passed key.
    if(array && array[0] && array[0].hasOwnProperty(key)) {
        //Returns sorted array
        return [...array].sort((a: any, b: any) => {
            //Checking sort-order.
            const sortFactor = sort.toLowerCase() === 'asc' ? 1 : -1;
            //Converting to lower-case if property is string.
            const value1 = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
            const value2 = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

            //comparing values.
            return value1 > value2
                ? sortFactor
                : -sortFactor
        });
    //If array don't have object, or object don't have passed key, return error-object.
    } else {
        return [];
    }
}


export const isEmpty = (obj: any): any => {
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


export const removeEmpty = (data: any) => {
    return isEmpty(data)
        ? undefined
        : data;
}

export const removeUndefined = (data: genObject): genObject => {
    const newObject: genObject = {};
    const entries: Array<Array<any>> = Object.entries(data);
    entries.forEach((entrie: Array<any>) => {
        if(!isEmpty(entrie[1])) newObject[entrie[0]] = entrie[1];
    });

    return newObject;
}


export const getConfig = async () => {
    const config: genObject = await import('../../config.json');
    if(config && !isError(config)) return config;
    else return {};
}
