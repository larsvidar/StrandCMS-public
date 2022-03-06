/***** IMPORTS *****/
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Form, Title2 } from '../../styles/general';
import { AppContext } from '../../Handler/Handler';
import { updateSettings } from '../../Handler/actions/settingsActions';


/***** STYLES *****/
const EmailSettingsStyle = styled(Form)`

    padding: 2em;

    ${Title2} {
        margin-bottom: 2em;
    }

    form {
        display: flex;
        flex-direction: column;

        label {
            margin-bottom: .5em;
        }

        input, textarea {
            margin-bottom: 2em;
            width: 600px;
            max-width: 100%;
        }
    }

`;


/***** INTERFACES *****/
interface IEmailSettingsProps {}


/***** COMPONENT-FUNCTION *****/
const EmailSettings = (props: IEmailSettingsProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {email} = settings || {};
    const {setMessage, setShowLoader} = actions || {};


    /*** Functions ***/
    const handleSubmit = async (event: any) => {
        if(setShowLoader && setMessage) {
            setShowLoader(true);
            event.preventDefault();
            event.persist();

            const data = new FormData(event.target);
            const emailSettings = {
                subject: data.get('subject'),
                text: data.get('text'),
            }

            const response = await updateSettings('email', emailSettings);

            
            if(!response) {
                setMessage('En feil oppstod. Prøv igjen.');
            } else {
                setMessage('E-post-innstillingene er oppdatert.');
            }
            setShowLoader(false);
        }
    }


    /*** Return-statement ***/
    return(
        <EmailSettingsStyle theme={settings?.theme}>
            <Title2>Innstillinger for utgående e-post</Title2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='subject'>E-post emne</label>
                <input type='text' id='subject' name='subject' defaultValue={email && email.subject} placeholder='Skriv inn emne her...' />

                <label htmlFor='text'>E-post tekst</label>
                <textarea id='text' className='height-250' name='text' defaultValue={email && email.text} placeholder='Skriv inn e-post beskjed her...' />

                <input className='button' type='submit' value='Lagre' />
            </form>
        </EmailSettingsStyle>
    );
}


/***** EXPORTS *****/
export default EmailSettings;
