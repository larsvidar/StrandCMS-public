/***** IMPORTS *****/
import React, {FC, SyntheticEvent, useContext, useEffect, useRef} from 'react';
import styles from './SMMediumTitle.module.scss';
import {AppContext} from '../../Handler/Handler';
import {IBaseProps} from '../../interfaces/IGeneral';
import {setTheme} from '../../Handler/actions/sActions';


/***** SCMediumTitle-FUNCTION *****
 * Component for choosing a component to add to the page.
 * @param {Function} onChange Returns chosen item
 * @return {JSX.Element}
 */
const SMMediumTitle: FC<IBaseProps> = ({onChange, className}): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};


    /*** Variables ***/
    const smMediumTitleRef = useRef<HTMLDivElement | null>(null);
    const loc = getLoc('smMediumTitle');
    const MODULE_NAME = 'MediumTitle';
    const CONTENT_TYPE = 'text';
    const SMMediumTitleClass = className
        ? styles.SMMediumTitle + ' ' + className
        : styles.SMMediumTitle;


    /*** Effects ***/

    //Runs when theme-context updates.
    // -Sets values from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, smMediumTitleRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Sends changes in mediumTitle-input back to parent
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
        <div className={SMMediumTitleClass} ref={smMediumTitleRef} >
            <label htmlFor={MODULE_NAME}>{loc.mediumTitle}</label>
            <input 
                type={CONTENT_TYPE}
                name={MODULE_NAME} 
                id={MODULE_NAME} 
                placeholder={loc.mediumTitlePlaceholder}
                onChange={handleChange}
            />
        </div>
    );
};


/***** EXPORTS *****/
export default SMMediumTitle;
