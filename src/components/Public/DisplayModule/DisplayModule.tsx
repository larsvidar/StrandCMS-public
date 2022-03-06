/***** IMPORTS *****/
import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './DisplayModule.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {getModule, setTheme} from '../../../Handler/actions/sActions';
import {genObject} from '../../../interfaces/IGeneral';
import {isError, sortObjectArray} from '../../../Handler/actions/actions';
import { useLocation } from 'react-router-dom';
import { articlesHandler } from '../../../Handler/collectionActions/articlesHandler';


/***** COMPONENT-FUNCTION *****/
const DisplayModule = () => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** Variables ***/
    const displayModuleRef = useRef(null);
    const location = useLocation();


    /*** State ***/
    const [article, setArticle] = useState<genObject>({});
    const [moduleArray, setModuleArray] = useState([] as genObject[]);


    /*** Effects ***/

    //Runs when 
    // -
    useEffect(() => {
        const slug = location.pathname.split('/')[2];
        articlesHandler.read({slug}).then((response: genObject[] | Error) => {
            if(response && !isError(response)) setArticle(response[0]);
        });
    }, []);

    //Runs when 
    // -
    useEffect(() => {
        if(article?.uid) setModuleArray(article.modules);
    }, [article]);

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, displayModuleRef);
    }, [theme]);


    //Runs when
    useEffect(() => {
        if(article?.uid) {
            const modules = sortObjectArray(article.modules, 'index');
            const moduleViews = modules.map(async (thisModule: genObject) => {
                const view = await getModule(thisModule.title, true);
                return {View: view, content: thisModule.value};
            });

            Promise.all(moduleViews).then((all) => {
                setModuleArray(all);
            });
        }
    }, [article]);

    
    /*** Return-statement ***/
    return(
        <div className={styles.DisplayModule} ref={displayModuleRef} >
            {moduleArray.map((module, index) => {
                if(module.View && !isError(module.View)) {
                    return <module.View key={index} content={module.content} />;
                }
            })}
        </div>
    );
};


/***** EXPORTS *****/
export default DisplayModule;
