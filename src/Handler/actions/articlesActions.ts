/***** IMPORTS *****/
import {genObject} from "../../interfaces/IGeneral";
import {articlesObj} from "../FireBase/firebaseHandler";


/***** FUNCTIONS *****/

/**
 * Function for creating a new article in back-end.
 * @param {FormData} formData Form-data to create article from.
 * @param {Function} setArticles Function for setting article to state.
 * @return {Promise<genObject>} Promise that resolves to an article-object.
 */
// export const handleCreateItem = async (
//     formData: FormData, 
//     setArticles: Function
// ): Promise<genObject> => {
//     const newArticle = await articlesObj.create(formData);

//     setArticles((prevArticles: Array<IArticle>) => 
//             sortObjectArray([...prevArticles, newArticle], 'created', 'desc')
//     );

//     return newArticle;
// }


/**
 * Gets articles from server.
 * @param {Function} setArticles Function for setting gotten articles to state.
 * @param {boolean} getAll Get also unpublished articles (must be athenticated).
 */
// export const readArticles = async (
//     filter: genObject, 
//     getAll: boolean = false
// ) => {

//     //Get articles from Server.
//     const articlesArray: Array<genObject> = await articlesObj.read(getAll);
//     //Check for errors.
//     if(isError(articlesArray)) return articlesArray;
    
//     //Sort articles, if any.
//     const sortedArticles = articlesArray[0] 
//         ? sortObjectArray(articlesArray, 'created', 'desc')
//         : [];


//     //Getting images from Server, if any (No longer neccassary).
//     // for(let article of sortedArticles) {

//     //     //Check if article has any images...
//     //     if(article.image && article.image.length) {
//     //         //...if so, get imageUrl from server.
//     //         let imageError = '';
//     //         const fetchedImage = await readFile(article.image)
//     //             .catch((error: any) => imageError = error.message);

//     //         //If there was an error getting image url, then return empty value.
//     //         article.image = imageError ? '' : fetchedImage;
            
//     //     }
//     // }
    
    
//     //Set articles to state, then return them.
//     //setArticles(sortedArticles);
//     return sortedArticles;
// }


/**
 * Updates an article.
 * @param {string} articleId Id of article to update. 
 * @param {genObject} data Data to update.
 * @param {Function} setArticles Function to update articles in state.
 * @return {Promise<boolean | Error> } Promise that resolves to true if update was
 *  - sucsessful, Error-object if not. 
 */
export const updateArticle = async (
    articleId: string, data: genObject, setArticles: Function
): Promise<boolean | Error> => {

    //Updates article.
    const articleResponse = await articlesObj.update(articleId, data, true);
    
    //If update was succsessful, update article in state.
    if(articleResponse) {
        setArticles((prevArticles: Array<genObject>) => {
            return prevArticles.map((article: genObject) => {
                if(article.id === articleId) {
                    return {...article, ...data};
                }
                return article;
            })
        })
    }

    //Return response.
    return articleResponse;
}


/**
 * Function for deleting an article from backend.
 * @param {string} articleId Id of article to delete
 * @param {Function} setArticles Function for updating articles-state.
 * @return {Promise<genObject>} Promise that resolves to delete-response-object.
 */
export const handleDeleteArticle = async (articleId: string, setArticles: Function) => {
    const deleteResponse = await articlesObj.delete(articleId);
    
    if(deleteResponse) {
        setArticles((prevArticles: Array<genObject>) => {
            return prevArticles.filter((article: genObject) => {
                return article.id !== articleId;
            });
        })
    }

    return deleteResponse;
}
