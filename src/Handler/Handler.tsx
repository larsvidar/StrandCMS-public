/***** IMPORTS *****/
import React, {useState, useEffect, ReactNode} from 'react';
import '../styles/styles.css';
import {isError} from './actions/actions';
import {ISettings, IContext, IState, IActions} from '../interfaces/IState';
import {genObject, IArticle} from '../interfaces/IGeneral';
import {settingsHandler} from './collectionActions/settingsHandler';
import {pagesHandler} from './collectionActions/pagesHandler';
import {articlesHandler} from './collectionActions/articlesHandler';
import {checkLogin} from './actions/authActions';
import {getConfig, getLanguage} from './actions/sActions';


/***** CONTEXT *****/
export const AppContext = React.createContext<IContext>({} as IContext);


/***** INTERFACES *****/
interface IStateContainerProps {
    children: ReactNode,
}


/***** PROVIDER-FUNCTION *****/
const Provider = (props: IStateContainerProps) => {

    /*** Variables ***/
    const defaultLocale = 'en';
    

    /*** State ***/
    const [settings, setSettings] = useState<ISettings>({} as ISettings);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [messages, setMessageArray] = useState<string[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [menu, setMenu] = useState<genObject[]>([]);
    const [locale, setLocale] = useState<string>(defaultLocale);
    const [pages, setPages] = useState<genObject[]>([]);
    const [language, setLanguage] = useState<genObject>({});
    const [articles, setArticles] = useState<IArticle[]>([]);


    /*** Effects ***/

    //Runs once
    // -Fetches config-data from file.
    useEffect(() => {
        const config = getConfig(); 
        setLocale(config.locale);
        checkLogin().then((response: genObject) => {
            if(response.idToken) {
                setIsLoggedIn(true);
                console.log('User logged in...');
            } else {
                setIsLoggedIn(false);
            }
        });

        //Logs current version out to console.
        console.log('Current version: ', config.version);
    }, []);


    //Runs once.
    // -Fetches data
    useEffect(() => {
        settingsHandler.read().then((thisSettings: ISettings) => setSettings(thisSettings));
        pagesHandler.read().then((thisPages: genObject[]) => {
            if(!isError(thisPages)) setPages(thisPages || []);
        });
        articlesHandler.read().then((thisArticles: IArticle[]) => {
            setArticles(thisArticles);
        });
    }, []);


    //Runs when locale-state changes
    // -Gets language-object from file and sets to state.
    useEffect(() => {
        getLanguage(locale).then((languageObject) => {
            if(languageObject?.title) setLanguage(languageObject);
        });
    }, [locale]);


    //Runs when pages-state has changes
    // -generates menu from pages, and sets menu to state.
    useEffect(() => {
        const thisMenu = pages?.map((page) => {

            const menuItem: genObject = {
                title: page?.menuTitle ? page.menuTitle : page?.title,
                url: '/page/' + page?.slug,
            };

            if(page?.menuParent) menuItem.menuParent = page.menuParent;
            return menuItem;
        });

        thisMenu.unshift({title: 'Nyheter', url: '/news/'});

        setMenu(thisMenu);
    }, [pages]);


    /*** Functions ***/

    /**
     * Gets language-data for a specific page, or whole language-object if page is not specified. 
     * @param {string=} page Name of component to get language-data for.
     * @return {genObject} Language-object 
     */
    const getLoc = (page?: string) => {
        if(page) return language[page] || {};
        return language;
    };
    

    /**
     * Function for setting messages
     * @param {string} message Message to be added to message-array. 
     * @return {void} Setting message to state.
     */
    const setMessage = (message: string) => {
        
        //Add message to message-array in state.
        setMessageArray(
            (prevMessages: Array<string>) => message === null
                ? []
                : [...prevMessages, message]
        );
    };


    /*** Context-variables ***/

    //State
    const state: IState = {
        settings,
        showLoader,
        messages,
        isLoggedIn,
        pages,
        menu,
        locale,
        articles,
    };


    // Actions
    const actions: IActions = {
        setSettings,
        setShowLoader,
        setMessage,
        setIsLoggedIn,
        setPages,
        setMenu,
        setArticles,
        getLoc,
    };


    /*** Return-statement ***/
    return (
        <AppContext.Provider value={{
            state,
            actions,
        }} >
            {props.children}
        </AppContext.Provider>
    );
};


/***** EXPORTS *****/
export default Provider;
