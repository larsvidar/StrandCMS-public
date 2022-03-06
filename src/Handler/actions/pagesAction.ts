/***** IMPORTS *****/
import { readFile, pagesObj } from "../FireBase/firebaseHandler";
import { IArticle, genObject } from "../../interfaces/IGeneral";
import { sortObjectArray, isError } from "./actions";


/***** FUNCTIONS *****/
export const handleCreatePage = async (
    formData: any, 
    setPages: Function
) => {

    const newPage = await pagesObj.create(formData);

    setPages((prevPages: Array<IArticle>) => {
            const sortedPages = sortObjectArray([...prevPages, newPage], 'created', 'desc');
            return isError(sortedPages)
                ? []
                : sortedPages;
    });

    return newPage;
}


/**
 * Gets articles from server.
 * @param {Function} setArticles Function for setting gotten articles to state.
 * @param {boolean} getAll Get also unpublished articles (must be athenticated).
 */
export const readPages = async (
    query?: genObject, 
) => {

    //Get articles from Server.
    const pagesArray: Array<genObject> = await pagesObj.read(query);
    //Check for errors.
    if(isError(pagesArray)) return pagesArray;
    
    //Sort articles, if any.
    const sortedPages = sortObjectArray(pagesArray, 'created', 'desc');

    //Getting images from Server, if any.
    for(let page of sortedPages) {

        //Check if article has any images...
        if(page.image && page.image.length) {
            //...if so, get imageUrl from server.
            let imageError = '';
            const fetchedImage = await readFile(page.image)
                .catch((error: any) => imageError = error.message);

            //If there was an error getting image url, then return empty value.
            page.image = imageError ? '' : fetchedImage;
            
        }
    }
    
    //Set articles to state, then return them.
    //setArticles(sortedArticles);
    return sortedPages;
}


/**
 * Updates an article.
 * @param {string} articleId Id of article to update. 
 * @param {genObject} data Data to update.
 * @param {Function} setArticles Function to update articles in state.
 * @return {Promise<boolean | Error> } Promise that resolves to true if update was
 *  - sucsessful, Error-object if not. 
 */
export const updatePage = async (
    pageId: string, data: genObject, setPages: Function
): Promise<boolean | Error> => {

    //Updates article.
    const pageResponse = await pagesObj.update(pageId, data, true);
    
    //If update was succsessful, update article in state.
    if(pageResponse) {
        setPages((prevArticles: Array<genObject>) => {
            return prevArticles.map((page: genObject) => {
                if(page.id === pageId) {
                    return {...page, ...data};
                }
                return page;
            })
        })
    }

    //Return response.
    return pageResponse;
}


/**
 * 
 * @param articleId 
 * @param setArticles 
 */
export const handleDeletePage = async (articleId: string, setArticles: Function) => {
    const deleteResponse = await pagesObj.delete(articleId);
    console.log(deleteResponse)
    if(deleteResponse) {
        setArticles((prevArticles: Array<genObject>) => {
            return prevArticles.filter((article: genObject) => {
                return article.id !== articleId;
            });
        })
    }

    return deleteResponse;
}
