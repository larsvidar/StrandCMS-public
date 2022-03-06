/***** IMPORTS *****/
import { genObject } from '../../interfaces/IGeneral';
import { isError } from '../actions/actions';
import { crudderRead } from '../crudder/crudderHandler';


/***** PAGES-HANDLER-OBJECT *****/
const pagesHandler: genObject = {

    //Collection-title
    collection: 'pages',

    /**
     * Format-function for pages.
     * @param {genObject} data Object with unformatted page-data from back-end.
     * @return {genObject} Formatted page-object.
     */
    format(data: genObject) {
        if(!data) return {};
        const pages: genObject = [];
        const pagesArray = data.documents || [];
        pagesArray.forEach((pagesObj: genObject) => {
            const settingsIdArray = pagesObj.name?.split('/');
            const id = settingsIdArray.reverse()[0];
            
            const thisPage: genObject = {id};
            Object.keys(pagesObj.fields).forEach((key: string) => {
                thisPage[key] = Object.values(pagesObj.fields[key])[0];
            });

            pages.push(thisPage);
        });

        return pages;
    },
};


/**
 * Deafault read-method for pages
 * @return {genObject[]} Array of page-objects.
 */
pagesHandler.read = async function() {

    const query = {
        collection: this.collection,
    };

    const response = await crudderRead(query);

    const result = !response
        ? {}
        : response;
                
    return isError(result)
        ? result
        : this.format(response);
};


/***** EXPORTS *****/
export {pagesHandler};