/***** IMPORTS *****/
import React, {FC, SyntheticEvent, useContext, useEffect, useRef, useState} from 'react';
import styles from './SMByline.module.scss';
import {AppContext} from '../../Handler/Handler';
import {setTheme} from '../../Handler/actions/sActions';
import { IBaseProps } from '../../interfaces/IGeneral';


/***** COMPONENT-FUNCTION *****/
const SMByline: FC<IBaseProps> = ({className, onChange}): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};


    /*** State ***/
    const [date, setDate] = useState<Date>(new Date(Date.now()));


    /*** Variables ***/
    const smbylineRef = useRef<HTMLDivElement | null>(null);
    const loc = getLoc('smByline');
    const MODULE_NAME = 'Byline';
    const CONTENT_TYPE = 'text';
    const SMBylineClass = className
        ? styles.SMByline + ' ' + className
        : styles.SMByline;
    const dateOptions: any = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric', 
    };


    /*** Efects ***/

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, smbylineRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Sends changes in title-input back to parent
     * @param {Event} event Event-object from input.
     * @return {void} Sends data back with onChange-prop-function.
     */
    const handleChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        const now = Date.now();
        setDate(new Date(now));
        const title: string = target.value;
        onChange({type: CONTENT_TYPE, value: {title, date: date.valueOf()}});
    };

    
    /*** Return-statement ***/
    return(
        <div className={SMBylineClass} ref={smbylineRef} >
            <input 
                type={CONTENT_TYPE}
                id={MODULE_NAME}
                name={MODULE_NAME}
                placeholder={loc.bylinePlaceholder}
                onChange={handleChange}
            />
            <p className={styles.date}>{loc.date}: {date?.toLocaleDateString('no-NB', dateOptions)}</p>
        </div>
    );
};


/***** EXPORTS *****/
export default SMByline;
