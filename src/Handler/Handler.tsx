/***** IMPORTS *****/
import React, {useState, useEffect} from 'react';
import '../styles/styles.css';
import {getConfig, isError, sortObjectArray} from './actions/actions';
import {ISettings, IContext, IState, IActions} from '../interfaces/IState';
import {IArticle, genObject} from '../interfaces/IGeneral';
import {settingsObj, pagesObj, articlesObj} from './FireBase/firebaseHandler';
import staticArticles from '../staticData/staticArticles.json';
import staticSettings from '../staticData/staticSettings.json';
import staticPages from '../staticData/staticPages.json';
import staticMenu from '../staticData/staticMenu.json';
import { defaultSettings } from './defaultState';


/***** CONTEXT *****/
export const AppContext = React.createContext<IContext>({} as IContext);


/***** INTERFACES *****/
interface IStateContainerProps {
    children: any,
}


/***** PROVIDER-FUNCTION *****/
const Provider = (props: IStateContainerProps) => {

    /*** State ***/
    const [settings, setSettings] = useState<ISettings>(staticSettings as ISettings);
    const [articles, setArticles] = useState<IArticle[]>(staticArticles as IArticle[]);
    const [pages, setPages] = useState<genObject[]>(staticPages)
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [messages, setMessageArray] = useState<string[]>([]);
    const [cacheState, setCacheState]: any = useState<genObject>({});
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [menu, setMenu] = useState<genObject[]>(staticMenu)


    /*** Effects ***/
    useEffect(() => {
        getConfig().then((config: genObject) => {
            console.log('Current version: ', config.version)
        });   
    }, []);

    useEffect(() => {
        settingsObj.read().then((thisSettings: any) => setSettings(thisSettings));
        pagesObj.read().then((thisPages: genObject[]) => setPages(thisPages));
        articlesObj.read().then((thisArticles: IArticle[]) => {
            const sortedArticles = sortObjectArray(thisArticles, 'created', 'desc')
            setArticles(sortedArticles);
        });
        if(!settings.site) setSettings(defaultSettings);
    //eslint-disable-next-line
    }, []);



    useEffect(() => {
        const thisMenu = pages?.map((page: genObject) => {

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

    /* State-functions */

    /**
     * Handels writing and reading data from cache.
     * @param {string} thisState Name of state to set or get.
     * @param {genObject=} data -Optional- Data as an object to cache and set to state.
     * @param {Function=} setData -Optional- Function for setting data to state.
     */
    const cache = (thisState: keyof typeof state, data?:  genObject, setData?: Function) => {
        //Check to see if passed data is valid.
        if(isError(data)) return new Error('No valid data...');

        // If no date or no function for setting data is passed, just return 
        // data from cache, or from state if it does not exist in cache.
        if(!data || !setData) {
            if(cacheState[thisState]) {
                return cacheState[thisState];
            } else {
                return state[thisState];
            }
        }

        //If data and setState-function is passed, set data to both cache and state.
        if(data && setData) {
            setData(data);
            setCacheState({[thisState]: data});
            return true;
        }

        //If no of the above conditions are met, return error.
        return new Error('Could not cache data...');
    }

    
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
    }

    /*** Variables ***/

    //State
    const state: IState = {
        settings,
        articles, 
        showLoader,
        messages,
        isLoggedIn,
        pages,
        menu,
    };

    // Actions
    const actions: IActions = {
        setSettings,
        setArticles,
        setShowLoader,
        setMessage,
        cache,
        setIsLoggedIn,
        setPages,
        setMenu,
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
}


/***** EXPORTS *****/
export default Provider;
