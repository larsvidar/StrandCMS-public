/***** IMPORTS *****/
import React, {useContext, useEffect, useRef} from 'react';
import styles from './ModuleList.module.scss';
import {AppContext} from '../../../../Handler/Handler';
import {IBaseProps} from '../../../../interfaces/IGeneral';
import {ISModule, TSModuleListOutput} from '../CreatePage';
import {setTheme} from '../../../../Handler/actions/sActions';
import ModuleItem, {FHandleOutput} from './ModuleItem/ModuleItem';



/***** INTERFACES *****/
interface IModuleListProps extends IBaseProps {
    modules: ISModule[],
}


/***** COMPONENT-FUNCTION *****/
const ModuleList = ({modules, onSubmit}: IModuleListProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};


    /*** Variables ***/
    const moduleListRef = useRef(null);
    const loc = getLoc('moduleList');
    const moduleOutput = useRef<TSModuleListOutput>({});


    /*** Effects ***/

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, moduleListRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Saves changes from modules to moduleOutput-ref. ref.
     * @param {ISModuleOutput} eventObject Change-object from module.
     * @return {void} Saves updated eventObject to moduleOutput-ref.
     */
    const handleModuleOutput: FHandleOutput = (eventObject) => {
        moduleOutput.current[eventObject.index] = eventObject;
    };


    /**
     * Handles click on submit-button. Sends moduleOutput back to parent.
     * @return {void} Triggers onSubmit-prop-function.
     */
    const handleSubmit = () => {
        onSubmit(moduleOutput.current);
    };
    

    /*** Return-statement ***/
    return(
        <div className={styles.ModuleList} ref={moduleListRef} >
            
            {/* List of added modules */}
            {modules.map((moduleObject, index) => (
                <ModuleItem 
                    key={index} 
                    className={styles.module}
                    moduleObject={moduleObject} 
                    handleOutput={handleModuleOutput} 
                />
            ))}

            {/* Submit-button (Only shows if an module has been added). */}
            {!!modules.length &&
                <button 
                    className={styles.saveButton} 
                    onClick={handleSubmit}
                >
                    {loc.saveButton}
                </button>
            }
        </div>
    );
};


/***** EXPORTS *****/
export default ModuleList;
