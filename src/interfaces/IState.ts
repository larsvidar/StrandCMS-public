/***** IMPORTS *****/
import {genObject, IArticle} from "./IGeneral";


/***** INTERFACES ******/
export interface IContext {
    state: IState,
    actions: IActions,
}

export interface IState {
    settings: ISettings, 
    showLoader: boolean,
    messages: string[],
    isLoggedIn: boolean,
    pages: genObject[],
    menu: genObject,
    locale: string,
    articles: IArticle[],
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
    created?: string,
    updated?: string,
    uid?: string,
};

export interface IActions {
    setSettings: Function,
    setShowLoader: Function,
    setMessage: Function,
    setIsLoggedIn: Function,
    setPages: Function,
    setMenu: Function,
    getLoc: Function,
    setArticles: Function,
}
