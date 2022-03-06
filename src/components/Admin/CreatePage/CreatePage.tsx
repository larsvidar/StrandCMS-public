/***** IMPORTS *****/
import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import styles from './CreatePage.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {genUid, isError} from '../../../Handler/actions/actions';
import ModuleChooser, { FGetComponent } from './ModuleChooser/ModuleChooser';
import ModuleList from './ModuleList/ModuleList';
import {setTheme} from '../../../Handler/actions/sActions';
import {crudderCreate} from '../../../Handler/crudder/crudderHandler';
import { genObject } from '../../../interfaces/IGeneral';


/***** INTERFACES *****/
export interface ISModule {
    id: string,
    index: number;
    title: string,
    Module: FC<any>,
}

export interface ISModuleOutput {
    index: number, 
    id: string,
    type: string, 
    value: string | genObject, 
    title: string,    
}

export type TSModuleListOutput = {
    [x: number]: ISModuleOutput,
}


/***** COMPONENT-FUNCTION *****/
const CreatePage: FC = (): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** Variables ***/
    const createPageRef = useRef(null);


    /*** State ***/
    const [moduleArray, setModuleArray] = useState<ISModule[]>([]);


    /*** Effects ***/

    //Runs when theme is loaded
    // -Sets value from theme to css.
    useEffect(() => {
        if(theme) setTheme(theme, createPageRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Handles adding new modules to create page.
     * @param {ISModule} newModule Module object, containing React-component and metadata.
     * @return {Promise<void>} Checks for errors and sets module-object to moduleArray.
     */
    const handleNewComponent: FGetComponent = async (newModule) => {
        if(isError(newModule)) return console.log(newModule.message);
        setModuleArray([...moduleArray, newModule]);
    };


    /**
     * Handles output from all modules in ModuleList
     * @param {TModuleOutput} data Data-object, with data from each module as a ICModule-object.
     * @return {}
     */
    const handleOutput = async (data: TSModuleListOutput) => {

        const modules = Object.values(data);
        const slug = genUid(8);

        const saveData = {modules, created: Date.now(), slug};

        const response = await crudderCreate('articles', saveData);
        console.log(response);
    };



    /*** Return-statement ***/
    return(
        <div className={styles.CreatePage} ref={createPageRef} >

            <ModuleList modules={moduleArray} onSubmit={handleOutput} />
            <ModuleChooser
                className={styles.chooser} 
                getComponent={handleNewComponent} 
            />

        </div>
    );
};


/***** EXPORTS *****/
export default CreatePage;
