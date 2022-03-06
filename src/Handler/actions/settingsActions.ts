/***** IMPORTS *****/
import { genObject } from "../../interfaces/IGeneral";
import { settingsObj } from "../FireBase/firebaseHandler";


/***** FUNCTIONS *****/

/**
 * Gets and returns settings
 * @param {Function} setSettings Function for setting result to state.
 * @param {string} docName - OPTIONAL - Name of subsettings to return.
 * @return {Promise<genObject>} Promise that resolves to Settings-object.
 */
export const readSettings = async (
    setSettings: Function, docName?: string
):Promise<genObject> => {
//Get settings from back-end.
const settings = await settingsObj.read(docName);

//Set settings to state.
docName
    ? setSettings({[docName]: settings})
    : setSettings(settings);

//Return settings-object.
return docName
    ? {[docName]: settings}
    : settings;
}


/**
 * Updates settings-object.
 * @param {string} item Item to update in settings-collection. 
 * @param {genObject} data Date to update.
 * @param {boolean} doMerge If true, then dont overwrite item, just merge data.
 */
export const updateSettings = (
    item: string, 
    data: genObject, 
    doMerge: boolean = false
) => {

    return settingsObj.update(item, data, doMerge);
}