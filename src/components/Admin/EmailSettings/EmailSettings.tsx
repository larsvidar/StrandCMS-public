/***** IMPORTS *****/
import React, {SyntheticEvent, useContext, useEffect, useRef} from 'react';
import styles from './EmailSettings.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {updateSettings} from '../../../Handler/actions/settingsActions';
import { setTheme } from '../../../Handler/actions/sActions';


/***** COMPONENT-FUNCTION *****/
const EmailSettings = () => {

    /*** Variables ***/
    const emailSettingsRef = useRef(null);

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {email, theme} = settings || {};
    const {setMessage, setShowLoader} = actions || {};


    /*** Effects ***/
    //Runs when theme-context updates
    // -Sets theme-values to css.
    useEffect(() => {
        setTheme(theme, emailSettingsRef);
    }, [theme]);


    /*** Functions ***/
    const handleSubmit = async (event: SyntheticEvent) => {
        const target = event.target as HTMLFormElement;
        if(setShowLoader && setMessage) {
            setShowLoader(true);
            event.preventDefault();
            event.persist();

            const data = new FormData(target);
            const emailSettings = {
                subject: data.get('subject'),
                text: data.get('text'),
            };

            const response = await updateSettings('email', emailSettings);

            
            if(!response) {
                setMessage('En feil oppstod. Prøv igjen.');
            } else {
                setMessage('E-post-innstillingene er oppdatert.');
            }
            setShowLoader(false);
        }
    };


    /*** Return-statement ***/
    return(
        <div className={styles.EmailSettings} ref={emailSettingsRef} >
            <h2>Innstillinger for utgående e-post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='subject'>E-post emne</label>
                <input type='text' id='subject' name='subject' defaultValue={email && email.subject} placeholder='Skriv inn emne her...' />

                <label htmlFor='text'>E-post tekst</label>
                <textarea id='text' className='height-250' name='text' defaultValue={email && email.text} placeholder='Skriv inn e-post beskjed her...' />

                <input className='button' type='submit' value='Lagre' />
            </form>
        </div>
    );
};


/***** EXPORTS *****/
export default EmailSettings;
