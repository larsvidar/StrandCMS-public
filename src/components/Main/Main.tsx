/***** IMPORTS *****/
import React, {ReactNode, useContext} from 'react';
import styles from './Main.module.scss';
import TopBar from './TopBar/TopBar';
import Footer from './Footer/Footer';
import {AppContext} from '../../Handler/Handler';
import Messages from '../utils/Messages/Messages';
import Loader from '../utils/ShowLoader/Loader/Loader';


/***** INTERFACES *****/
interface IMainProps {
    children: ReactNode,
}


/***** COMPONENT-FUNCTION *****/
const Main = ({children}: IMainProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {showLoader, messages} = state || {};


    /*** Return-statement ***/
    return(
        <div className={styles.Main}>

            {/* Loading-indicator */}
            {showLoader && <Loader />}

            {/* Message-component */}
            {!!messages?.length && <Messages />}

            {/* Site-layout */}
            <TopBar />
                <div className={styles.container}>
                    {children}
                </div>
            <Footer />
        </div>
    );
};


/***** EXPORTS *****/
export default Main;
