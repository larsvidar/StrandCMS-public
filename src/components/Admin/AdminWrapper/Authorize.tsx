/***** IMPORTS *****/
import React, {useEffect, useContext} from 'react';
import {checkLogin} from '../../../Handler/actions/authActions';
import {AppContext} from '../../../Handler/Handler';
import AdminWrapper from './AdminWrapper';
import styled from 'styled-components';
import {Link, withRouter} from 'react-router-dom';
import { IHistory } from '../../../interfaces/IGeneral';


/***** STYLES *****/
const AuthorizeStyle = styled.div`
    margin-top: 2em;
    text-align: center;
    font-size: 1.3em;

    input[type='checkbox'] {
        font-size: 2em;
        width: 30px;
    }
    
    a {
        text-decoration: underline;
        font-size: 1.3em;
    }
`;


/***** INTERFACES *****/
interface IAuthorizeProps extends IHistory {
    children: any,
};


/***** COMPONENT-FUNCTION *****/
const Authorize = ({children, history}: IAuthorizeProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {isLoggedIn} = state || {};
    const {setIsLoggedIn, setShowLoader} = actions || {};



    /*** Effects ***/
    //Check-login
    useEffect(() => {
        if(setShowLoader && setIsLoggedIn) {
            setShowLoader(true);
            checkLogin(setIsLoggedIn).then((response) => {
                if(!response) {
                    console.log('Not logged in...');
                    setShowLoader(false);
                    history.push('/login/');
                }
                setShowLoader(false);
            });
        }

    //eslint-disable-next-line
    }, []);

    
    //Set showLoader if children-prop is loaded or not.
    useEffect(() => {
        if(children && setShowLoader) {
            setShowLoader(false);
        }
    //eslint-disable-next-line
    }, [children]);
    

    /*** Return-statement ***/
    return isLoggedIn
        ?   <AdminWrapper>
                {children}
            </AdminWrapper>
            
        :   <AuthorizeStyle className='unauthorized'>
                <p>Du er ikke logget inn.</p> 
                <Link to='/login/'>Logg inn her!</Link>
            </AuthorizeStyle>
}


/***** EXPORTS *****/
export default withRouter(Authorize);
