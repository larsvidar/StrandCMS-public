/***** IMPORTS *****/
import React, {SyntheticEvent, useContext, useEffect} from 'react';
import styles from './Login.module.scss';
import {AppContext} from '../../Handler/Handler';
import {isError} from '../../Handler/actions/actions';
import {fireLogin} from '../../Handler/crudder/crudderHandler';
import {useNavigate} from 'react-router-dom';


/***** COMPONENT-FUNCTION *****/
const Login = () => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {isLoggedIn} = state || {};
    const {setMessage, setShowLoader} = actions || {}; 
	const navigate = useNavigate();


    /*** Effects ***/

    //If user is logged in, redirect to admin-page.
    useEffect(() => {
        if(isLoggedIn) navigate('/admin/');
    }, [isLoggedIn]);


    /*** Functions ***/

    /**
     * Handles submitting username and password.
     * @param {Event} event Form submit-event-object.
     * @return {void} Check if credentials is authentic, and set result to state.
     */
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        setShowLoader(true);

        //Get data from form.
        const data = new FormData(target);
        const username: string = data.get('username') as string;
        const password: string = data.get('password') as string;

        //Reset form.
        target.reset();

        //Send login-data to back-end and get response.
        const loginResponse = await fireLogin(username, password);

        //If error, show error-message...
        if(isError(loginResponse)) {
            setMessage('Feil med innlogging: ', loginResponse.message);
        //...else set isLoggedIn to true, and send user to admin-pages.
        } else {
            setShowLoader(false);
            navigate('/admin/');
        }

        setShowLoader(false);
    };


    /*** Return-statement ***/
    return(
        <div className={styles.Login}>
            <h2>Logg inn</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex-row justify-between mb2'>
                    <label htmlFor='username'>E-post:</label>
                    <input type='text' id='username' name='username' required autoComplete='username' />
                </div>

                <div className='flex-row justify-between'>
                    <label htmlFor='password' >Passord:</label>
                    <input type='password' id='password' name='password' required autoComplete='current-password' />
                </div>

                <input type='submit' value='Logg inn' />
            </form>
        </div>
    );
};


/***** EXPORTS *****/
export default Login;
