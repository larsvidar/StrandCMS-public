/***** IMPORTS *****/
import React, {useContext, useEffect, useRef} from 'react';
import styles from './SMTextView.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {setTheme} from '../../../Handler/actions/sActions';


/***** INTERFACES *****/
interface ISMTextViewProps {
    content: string,
}


/***** COMPONENT-FUNCTION *****/
const SMTextView = ({content}: ISMTextViewProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** Variables ***/
    const smTextViewRef = useRef(null);


    /*** Effects ***/

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, smTextViewRef);
    }, [theme]);

    
    /*** Return-statement ***/
    return(
        <div className={styles.SMTextView} ref={smTextViewRef} >
            {content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
    );
};


/***** EXPORTS *****/
export default SMTextView;
