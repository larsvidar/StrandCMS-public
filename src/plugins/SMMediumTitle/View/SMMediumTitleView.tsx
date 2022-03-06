/***** IMPORTS *****/
import React, {FC, useContext, useEffect, useRef} from 'react';
import styles from './SMMediumTitleView.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {setTheme} from '../../../Handler/actions/sActions';


/***** INTERFACES *****/
interface ISMMediumTitleViewProps {
    content: string;
}


/***** COMPONENT-FUNCTION *****/
const SMMediumTitleView: FC<ISMMediumTitleViewProps> = ({content}): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** Variables ***/
    const smMediumTitleViewRef = useRef<HTMLDivElement | null>(null);


    /*** Effects ***/

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, smMediumTitleViewRef);
    }, [theme]);

    
    /*** Return-statement ***/
    return(
        <div className={styles.SMMediumTitleView} ref={smMediumTitleViewRef} >
            <h1>{content}</h1>
        </div>
    );
};


/***** EXPORTS *****/
export default SMMediumTitleView;
