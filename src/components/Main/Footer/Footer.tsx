/***** IMPORTS *****/
import React, {FC, useContext, useEffect, useRef} from 'react';
import styles from './Footer.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {setTheme} from '../../../Handler/actions/sActions';


/***** COMPONENT-FUNCTION *****/
const Footer: FC = (): JSX.Element => {

    /*** Variables ***/
    const footerRef = useRef<HTMLDivElement | null>(null);

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {site, theme} = settings || {};

    useEffect(() => {
        if(theme) setTheme(theme, footerRef);
    }, [theme]);


    /*** Return-statement ***/
    return(
        <div className={styles.Footer} ref={footerRef} >
            <div className={styles.darkGradient}>
                <p className={styles.text}>{site?.footer}</p>
            </div>
        </div>
    );
};


/***** EXPORTS *****/
export default Footer;
