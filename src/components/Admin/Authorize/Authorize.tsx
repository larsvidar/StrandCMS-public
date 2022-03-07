/***** IMPORTS *****/
import React, {useEffect, useContext} from 'react';
import {checkLogin} from '../../../Handler/actions/authActions';
import {AppContext} from '../../../Handler/Handler';
import AdminWrapper from '../AdminWrapper/AdminWrapper';
import styles from './Authorize.module.scss';
import {Link, useNavigate} from 'react-router-dom';


/***** INTERFACES *****/
interface IAuthorizeProps {
    children: any,
}


/***** COMPONENT-FUNCTION *****/
const Authorize = ({children}: IAuthorizeProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {isLoggedIn} = state || {};
    const {setIsLoggedIn, setShowLoader} = actions || {};

	/*** Variables ***/
	const navigate = useNavigate();



    /*** Effects ***/
    //Check-login
    useEffect(() => {
        if(setShowLoader && setIsLoggedIn) {
            setShowLoader(true);
            checkLogin().then((response) => {
                if(!response) {
                    console.log('Not logged in...');
                    setShowLoader(false);
                    navigate('/login/');
                } else {
                    setIsLoggedIn(true);
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
            
        :   <div className={styles.Authorize}>
                <div className={styles.unauthorized}>
                    <p>Du er ikke logget inn.</p> 
                    <Link to='/login/'>Logg inn her!</Link>
                </div>
            </div>;
};


/***** EXPORTS *****/
export default Authorize;
