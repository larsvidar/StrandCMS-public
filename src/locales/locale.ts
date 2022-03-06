/***** IMPORTS *****/
import { no } from "./no";
import { genObject } from "../interfaces/IGeneral";


/***** FUNCTIONS ******/

/**
 * Gets and returns object with language-strings.
 * @param {string} page -OPTIONAL- The component to get strings for. 
 * @param {string} language -OPTIONAL- Two-letter language code.
 *  - Change parameter default to change default language.
 * @return {genObject} Returns strings for specified page, 
 *  or whole language-object. 
 */
export const locale = (
    page: string = '', language:string = 'no'
): genObject | Error => {
    switch(language) {
        //Insert case for each language-file.
        case 'no': if(page) {
            if(no[page]) return no[page]; else return new Error(`No page named "${page}" found...`)
        } else {
            return no;
        }
        //If language is not found, return error.
        default: new Error('No such language: "' + language + '"');
    }
    return new Error('Nothing found...');
};
