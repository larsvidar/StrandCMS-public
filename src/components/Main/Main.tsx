/***** IMPORTS *****/
import React, { useContext } from 'react';
import TopBar from './TopBar/TopBar';
import Footer from './Footer/Footer';
import { AppContext } from '../../Handler/Handler';
import Messages from '../utils/Messages/Messages';
import styled from 'styled-components';
import { IHistory } from '../../interfaces/IGeneral';
import { withRouter } from 'react-router-dom';
import Loader from '../utils/ShowLoader/Loader/Loader';
//import { styleValues } from '../../styles/general';


/***** Global Variables *****/


/***** Styles *****/
const MainStyle = styled.div`

    .main {
        background: #a9b8cf;
    }

    .admin {
        background: white;
    }

    .TopBar {

    }

    .Footer {

    }
`;


/***** INTERFACES *****/
interface IMainProps extends IHistory {
    children: any,
}


/***** COMPONENT-FUNCTION *****/
const Main = ({children, location}: IMainProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {showLoader, messages} = state || {};
    const path = location.pathname.split('/')[1];


    /*** Return-statement ***/
    return(
        <MainStyle className={path === 'admin' ? 'admin' : 'main'}>
            {/* Loading-indicator */}
            {showLoader && <Loader />}

            {/* Message-component */}
            {messages?.length
                ?   <Messages />
                :   null
            }

            {/* Site-layout */}
            <TopBar className='TopBar' />
                {children}
            <Footer className={path === 'admin' ? 'Footer' : ''} />
        </MainStyle>
    );
}


/***** EXPORTS *****/
export default withRouter(Main);
