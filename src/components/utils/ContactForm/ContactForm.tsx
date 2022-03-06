/***** IMPORTS *****/
import React, {SyntheticEvent, useContext, useRef} from 'react';
import styles from './ContactForm.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {isError} from '../../../Handler/actions/actions';
import {genObject, TContact} from '../../../interfaces/IGeneral';
import {setTheme} from '../../../Handler/actions/sActions';


/***** INTERFACES *****/
interface IContactFormProps {
    test?: boolean,
    mode?: TContact, //Default is 'contact
}


/***** COMPONENT-FUNCTION *****/
const ContactForm = ({test, mode = 'contact'}: IContactFormProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {actions} = context || {};
    const {setShowLoader, setMessage} = actions || {};


    /*** Variables ***/
    const contactFormRef = useRef(null);
    const theme = {width: mode === 'member' ? '700px' : mode === 'info' ? '530px' : '650px'};


    /*** Functions ***/
    const handleSubmit = async (event: SyntheticEvent) => {

        const target = event.target as HTMLFormElement;
        
        //Handle event
        event.preventDefault();
        event.persist();

        //Make variables for form-data, and date to post to server.
        const formData = new FormData(target);
        const postData: genObject = {test: test};

        //Build postData based on passed mode.
        postData.mode = 'contact';
        postData.email = formData.get('email');

        //If mode is 'contact' or 'member', add message.
        if(['contact', 'member'].includes(mode)) {
            postData.message = formData.get('message');

            //If mode is 'member', change mode-key to 'member', and add name and phone.
            if(mode === 'member') {
                postData.mode = 'member';
                const name = formData.get('name');
                const phone = formData.get('phone');
        
                //Build message with name and phone included.
                postData.message = 
                    '<strong>Interesse for medlemsskap:</strong>' +
                    '<p>Borettslag/sameie: ' + name + '</p>' +
                    '<p>Epost: ' + postData.email + '.</p>';
                
                if(phone) postData.message += '<p>Telefon: ' + phone + '.</p><br>';
                if(formData.get('message')) {
                    postData.message += '<p>Beskjed: </p><div>' + formData.get('message') + '</div>';
                }
            }
        } else if(mode === 'info') {
            postData.mode = 'info';
        }


        setShowLoader(true);
        const response = await fetch('https://us-central1-strandkantenbydel.cloudfunctions.net/sendmail/email', {   
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(postData),
        }).then((response) => response.json())
        .catch((error) => error);

        if(isError(response)) {
            setMessage('Feil ved sending. Prøv igjen...');
            console.log('ERROR: ', response?.message);
            setShowLoader(false);
            return;
        }

        setShowLoader(false);
        setMessage('Melding sent');
        target.reset();
    };

    /*** Program ***/
    //Send values to css.
    setTheme(theme, contactFormRef);
    

    /*** Return-statement ***/
    return(
        <div className={styles.ContactForm} ref={contactFormRef} >
            {mode === 'contact' && <p>Skriv inn e-post og beskjed:</p>}
            <form onSubmit={handleSubmit}>

                {mode === 'member' &&
                    <div className='formItem'>
                        <label htmlFor='name'>Borettslag/sameie:</label>
                        <input 
                            type='text'
                            name='name'
                            id='name'
                            required
                            placeholder='Navn på Borettslag/sameie' 
                        />
                    </div>
                }

                <div className='formItem'>
                    <label htmlFor='email'>E-post:</label>
                    <input 
                        type='email'
                        name='email'
                        id='email'
                        required
                        placeholder='E-post' 
                    />
                </div>

                {mode === 'member' &&
                    <div className='formItem'>
                        <label htmlFor='phone'>Telefon (valgfritt):</label>
                        <input 
                            type='text'
                            name='phone'
                            id='phone'
                            placeholder='Telefonnummer' 
                        />
                    </div>
                }

                {mode !== 'info' &&
                    <div className='formItem'>
                        <label htmlFor='message'>Beskjed{mode === 'member' ? ' (valgfritt)' : ''}:</label>
                        <textarea
                            name='message'
                            id='message'
                            placeholder='Skriv inn beskjed her...'
                        />
                    </div>
                }

                <div className='submitButton'>
                    <input type='submit' value={mode === 'info' ? 'Få info' : 'Send melding'} />
                </div>
            </form>
        </div>
    );
};


/***** EXPORTS *****/
export default ContactForm;

