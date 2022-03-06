/***** IMPORTS *****/
import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {AppContext} from '../../Handler/Handler';
import {Title2, Form} from '../../styles/general';
import {IHistory} from '../../interfaces/IGeneral';
import {isError} from '../../Handler/actions/actions';
import {login} from '../../Handler/actions/authActions';


/***** STYLES *****/
const LoginStyle = styled.div`
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
    text-align: center;

    ${Title2} {
        margin: 1em 0;
    }

    label {
        font-size: 1.5em;
    }

    input {
        margin-bottom: 1em;
    }

    input[type='submit'] {
        width: 400px;
        margin: 2em 0;
    }

`;


/***** INTERFACES *****/
interface IloginProps extends IHistory {};


/***** COMPONENT-FUNCTION *****/
const Login = ({history}: IloginProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {settings, isLoggedIn} = context.state;
    const {setMessage, setShowLoader} = context.actions; 
    const {theme} = settings;


    /*** Effects ***/

    //If user is logged in, redirect to admin-page.
    useEffect(() => {
        if(isLoggedIn) {
            history.push('/admin/');
        }

    //eslint-disable-next-line
    }, [isLoggedIn]);


    /*** Functions ***/

    /**
     * Handles submitting username and password.
     * @param {Event} event Form submit-event-object.
     * @return {void} Check if credentials is authentic, and set result to state.
     */
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setShowLoader(true);

        //Get data from form.
        const data = new FormData(event.target);
        const username: string = data.get('username') as string;
        const password: string = data.get('password') as string;

        //Reset form.
        event.target.reset();

        //Send login-data to back-end and get response.
        const loginResponse: any = await login(username, password);

        //If error, show error-message...
        if(isError(loginResponse)) {
            setMessage('Feil med innlogging: ', loginResponse.message)
        //...else set isLoggedIn to true, and send user to admin-pages.
        } else {
            setShowLoader(false);
            history.push('/admin/');
        }

        setShowLoader(false);
    }


    /*** Return-statement ***/
    return(
        <LoginStyle>
            <Title2>Logg inn</Title2>
            <Form onSubmit={handleSubmit} theme={theme} ><form>
                <div className='flex-row justify-between mb2'>
                    <label htmlFor='username'>E-post:</label>
                    <input type='text' id='username' name='username' required autoComplete='username' />
                </div>

                <div className='flex-row justify-between'>
                    <label htmlFor='password' >Passord:</label>
                    <input type='password' id='password' name='password' required autoComplete='current-password' />
                </div>

                <input type='submit' value='Logg inn' />
            </form></Form>
        </LoginStyle>
    );
}


/***** EXPORTS *****/
export default withRouter(Login);
