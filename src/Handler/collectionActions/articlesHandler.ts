/***** IMPORTS *****/
import {genObject, IArticle} from '../../interfaces/IGeneral';
import {isError} from '../actions/actions';
import {crudderRead} from '../crudder/crudderHandler';


/***** ARTICLE-HANDLER OBJECT *****/
const articlesHandler: genObject = {

    //Collection-name
    collection: 'articles',

    /**
     * Method for formatting articles coming from back-end.
     * @param {genObject} data Object with unformatted article-data
     * @return {IArticle} Formatted article-object. 
     */
    format(data: genObject) {
        if(!data) return {};
        const articles: IArticle[] = [];
        const articlesArray = data.documents || [];
        articlesArray.forEach((articleObj: genObject) => {
            const settingsIdArray = articleObj.name?.split('/');
            const id = settingsIdArray.reverse()[0];
            
            const thisArticle: any = {id} as IArticle;
            Object.keys(articleObj.fields).forEach((key: any) => {
                thisArticle[key] = Object.values(articleObj.fields[key])[0];
            });

            articles.push(thisArticle);
        });

        return articles;
    },
};


/**
 * Default read-method for articles.
 * @param {genObject} query
 * @return {IArticles[]} Array of articles.
 */
articlesHandler.read = async function(query: genObject = {}) {

    const crudderQuery = {
        collection: this.collection,
        ...query,
    };

    const response = await crudderRead(crudderQuery);
                
    return isError(response)
        ? []
        : response.articles;
};


/***** EXPORTS *****/
export {articlesHandler};
