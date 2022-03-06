/***** IMPORTS *****/
import React, {FC, SyntheticEvent, useContext, useEffect, useRef} from 'react';
import styles from './SMLead.module.scss';
import {AppContext} from '../../Handler/Handler';
import {setTheme} from '../../Handler/actions/sActions';
import {IBaseProps} from '../../interfaces/IGeneral';


/***** COMPONENT-FUNCTION *****/
const SMLead: FC<IBaseProps> = ({onChange, className}): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};


    /*** Variables ***/
    const leadRef = useRef<HTMLDivElement | null>(null);
    const loc = getLoc('smLead');
    const MODULE_NAME = 'Lead';
    const CONTENT_TYPE = 'textarea';
    const smLeadClass = className
        ? styles.SMLead + ' ' + className
        : styles.SMLead;


    /*** Effects ***/

    //Runs when theme-context updates.
    // -Sets values from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, leadRef);
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
        <div className={smLeadClass} ref={leadRef} >
            <label htmlFor={MODULE_NAME}>{loc.title}</label>
            <textarea 
                name={MODULE_NAME} 
                id={MODULE_NAME}  
                placeholder={loc.leadPlaceholder}
                onChange={handleChange} 
            />
        </div>
    );
};


/***** EXPORTS *****/
export default SMLead;
