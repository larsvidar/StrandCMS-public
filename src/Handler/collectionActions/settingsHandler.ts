/***** IMPORTS *****/
import {genObject} from '../../interfaces/IGeneral';
import {ISettings, ITheme} from '../../interfaces/IState';
import {isError} from '../actions/actions';
import {crudderRead} from '../crudder/crudderHandler';


/***** SETTINGS-HANDLER-OBJECT */
const settingsHandler: genObject = {

    //Collection-object
    collection: 'settings',

    /**
     * Format-function for settings-object from back-end.
     * @param {genObject} data Settings-data from backend.
     * @return {ISettings} Formatted ISettings-object.
     */
    format(data: genObject[]) {
        if(!data) return {};

        const settings: genObject = {} as ISettings;
        (data || []).forEach((settingsObj: genObject) => {
            const thisSettings = settingsObj.uid === 'theme'
                ? this.themeFormat(settingsObj)
                : settingsObj;

            settings[settingsObj.uid] = thisSettings;
        });

        return settings;
    },
};

settingsHandler.themeFormat = (theme: ITheme) => {
    if(typeof theme !== 'object' || Array.isArray(theme)) return theme;
    const newTheme = Object.assign({}, theme);
    delete newTheme.created;
    delete newTheme.updated;
    delete newTheme.uid;

    return newTheme;
};


/**
 * Default read-function for settings.
 * @return {ISettings} ISettings-object.
 */
settingsHandler.read = async function() {

    const query = {
        collection: this.collection,
    };

    const response = await crudderRead(query);
    const result = response?.settings || [];
                
    return isError(result)
        ? result
        : this.format(result);
};


/***** EXPORTS *****/
export {settingsHandler};
