/***** IMPORTS *****/
import React, {FC, useContext, useEffect, useRef} from 'react';
import styles from './ModuleItem.module.scss';
import {AppContext} from '../../../../../Handler/Handler';
import {setTheme} from '../../../../../Handler/actions/sActions';
import {ISModule, ISModuleOutput} from '../../CreatePage';
import { IBaseProps } from '../../../../../interfaces/IGeneral';


/***** INTERFACES *****/
interface IModuleItemProps extends IBaseProps {
    moduleObject: ISModule,
    handleOutput: FHandleOutput,
}

export type FHandleOutput = (eventObject: ISModuleOutput) => void;


/***** COMPONENT-FUNCTION *****/
const ModuleItem: FC<IModuleItemProps> = ({moduleObject, handleOutput, className}): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** Variables ***/
    const moduleItemRef = useRef(null);
    const {id, title, Module} = moduleObject;
    const moduleItemClass = className
        ? styles.ModuleItem + ' ' + className
        : styles.ModuleItem;


    /*** Effects ***/

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, moduleItemRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Sends changes in module back to parent.
     * @param {ISModuleOutput} data Data to be sent.
     * @return {void} Sends ISModuleOutput to handleOutput-function
     */
    const handleModuleChange = (data: ISModuleOutput) => {
        const output: ISModuleOutput = {
            ...data, title, index: moduleObject.index, id, 
        };

        handleOutput(output);
    };

    
    /*** Return-statement ***/
    return(
        <div className={moduleItemClass} ref={moduleItemRef} > 
            <Module
                className={styles.module}
                onChange={handleModuleChange} 
            />
        </div>
    );
};


/***** EXPORTS *****/
export default ModuleItem;
