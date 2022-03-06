/***** IMPORTS *****/
import React, {useContext, useEffect, useRef} from 'react';
import styles from './SMImageView.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {setTheme} from '../../../Handler/actions/sActions';
import Simg from '../../../components/utils/Simg/Simg';


/***** INTERFACES *****/
interface ISMImageViewProps {
    content: {name: string, file: string, caption: string},
}


/***** COMPONENT-FUNCTION *****/
const SMImageView = ({content}: ISMImageViewProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** Variables ***/
    const smImageViewRef = useRef(null);
    const {file, caption} = content || {};


    /*** Effects ***/

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, smImageViewRef);
    }, [theme]);
    
    /*** Return-statement ***/
    return(
        <div className={styles.SMImageView} ref={smImageViewRef} >
            <Simg className={styles.image} src={file} />
            <p>{caption}</p>
        </div>
    );
};


/***** EXPORTS *****/
export default SMImageView;
