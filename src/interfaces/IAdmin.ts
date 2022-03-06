/***** IMPORTS  *****/
import { genObject, IArticle } from "./IGeneral";


/***** INTERFACES *****/
export interface IAdminContext {
    adminState: IAdminState,
    adminActions: IAdminActions,

}

export interface IAdminState {
    allArticles: IArticle[],
    allPages:   genObject[]
}

export interface IAdminActions {
    setAllArticles: Function,
    setAllPages: Function,
}
