/***** IMPORTS *****/
import React, {FC, useContext, useEffect, useRef} from 'react';
import styles from './SMLeadView.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {setTheme} from '../../../Handler/actions/sActions';


/***** INTERFACES *****/
interface ISMLeadViewProps {
    content: string,
}


/***** COMPONENT-FUNCTION *****/
const SMLeadView: FC<ISMLeadViewProps> = ({content}): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** Variables ***/
    const smLeadViewRef = useRef(null);


    /*** Efects ***/

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, smLeadViewRef);
    }, [theme]);

    
    /*** Return-statement ***/
    return(
        <div className={styles.SMLeadView} ref={smLeadViewRef} >
            {content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
    );
};


/***** EXPORTS *****/
export default SMLeadView;
