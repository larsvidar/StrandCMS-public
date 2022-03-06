/***** IMPORTS *****/
import React, {SyntheticEvent, useContext, useEffect, useRef} from 'react';
import styles from './SMText.module.scss';
import {AppContext} from '../../Handler/Handler';
import { setTheme } from '../../Handler/actions/sActions';
import { IBaseProps } from '../../interfaces/IGeneral';


/***** COMPONENT-FUNCTION *****/
const SMText = ({onChange, className}: IBaseProps): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};


    /*** Variables ***/
    const textRef = useRef<HTMLDivElement | null>(null);
    const loc = getLoc('smText');
    const MODULE_NAME = 'Text';
    const CONTENT_TYPE = 'textarea';
    const smTextClass = className
        ? styles.SMText + ' ' + className
        : styles.SMText;


    /*** Effects ***/

    //Runs when theme-context updates.
    // -Sets values from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, textRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Sends changes in textarea-input to parent.
     * @param {Event} event Event-object form textarea-input.
     * @return {void} Sends data with onChange-prop-function.
     */
    const handleChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLTextAreaElement;
        const value: string = target.value;
        onChange({type: CONTENT_TYPE, value});
    };

    
    /*** Return-statement ***/
    return(
        <div className={smTextClass} ref={textRef} >
            <label htmlFor={MODULE_NAME}>{loc.title}</label>
            <textarea 
                name={MODULE_NAME} 
                id={MODULE_NAME}  
                placeholder={loc.textPlaceholder}
                onChange={handleChange} 
            />
        </div>
    );
};


/***** EXPORTS *****/
export default SMText;
