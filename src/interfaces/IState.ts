/***** IMPORTS *****/
import { genObject, IArticle } from "./IGeneral";


/***** INTERFACES ******/
export interface IContext {
    state: IState,
    actions: IActions,
}

export interface IState {
    settings: ISettings,
    articles: IArticle[], 
    showLoader: boolean,
    messages: string[],
    isLoggedIn: boolean,
    pages: genObject[],
    menu: genObject,
}

export interface ISettings {
    site: ISite,
    theme: ITheme,
    email: genObject,
};

export interface ISite {
    footer: string,
    siteTitle: string,
};

export interface ITheme {
    primaryColor: string,
    primaryText: string,
    secondaryColor: string,
    secondaryText: string,
    linkColor: string,
    linkUnderline: boolean,
};

export interface IActions {
    setSettings: Function,
    setArticles: Function,
    setShowLoader: Function,
    setMessage: Function,
    cache: Function,
    setIsLoggedIn: Function,
    setPages: Function,
    setMenu: Function,
}
