/***** IMPORTS *****/
import React, {useContext, useEffect, useRef} from 'react';
import styles from './SMTitleView.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {setTheme} from '../../../Handler/actions/sActions';


/***** INTERFACES *****/
interface ISMTitleViewProps {
    content: string;
}


/***** COMPONENT-FUNCTION *****/
const SMTitleView = ({content}: ISMTitleViewProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** Variables ***/
    const smTitleViewRef = useRef<HTMLDivElement | null>(null);


    /*** Effects ***/

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, smTitleViewRef);
    }, [theme]);

    
    /*** Return-statement ***/
    return(
        <div className={styles.SMTitleView} ref={smTitleViewRef} >
            <h1>{content}</h1>
        </div>
    );
};


/***** EXPORTS *****/
export default SMTitleView;
