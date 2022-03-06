/***** IMPORTS *****/
import React, {SyntheticEvent, useContext, useEffect, useRef} from 'react';
import styles from './SMTitle.module.scss';
import {AppContext} from '../../Handler/Handler';
import {IBaseProps} from '../../interfaces/IGeneral';
import {setTheme} from '../../Handler/actions/sActions';


/***** SCTitle-FUNCTION *****/
const SMTitle = ({onChange, className}: IBaseProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};


    /*** Variables ***/
    const smTitleRef = useRef<HTMLDivElement | null>(null);
    const loc = getLoc('smTitle');
    const MODULE_NAME = 'Title';
    const CONTENT_TYPE = 'text';
    const SMTitleClass = className
        ? styles.SMTitle + ' ' + className
        : styles.SMTitle;


    /*** Effects ***/

    //Runs when theme-context updates.
    // -Sets values from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, smTitleRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Sends changes in title-input back to parent
     * @param {Event} event Event-object from input.
     * @return {void} Sends data back with onChange-prop-function.
     */
    const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const value:string = target.value;
        onChange({type: CONTENT_TYPE, value});
    };

    
    /*** Return-statement ***/
    return(
        <div className={SMTitleClass} ref={smTitleRef} >
            <label htmlFor={MODULE_NAME}>{loc.title}</label>
            <input 
                type={CONTENT_TYPE}
                name={MODULE_NAME} 
                id={MODULE_NAME} 
                placeholder={loc.titlePlaceholder}
                onChange={handleChange}
            />
        </div>
    );
};


/***** EXPORTS *****/
export default SMTitle;
