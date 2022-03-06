/***** IMPORTS *****/
import React, {useContext, useState} from 'react';
import { AppContext } from '../../Handler/Handler';
import { Form } from '../../styles/general';


/***** INTERFACES *****/
interface IMailInfoProps {}


/***** COMPONENT-FUNCTION *****/
const MailInfo = (props: IMailInfoProps) => {

    const context = useContext(AppContext);
    const {settings} = context.state;
    const {theme} = settings;

    const [emailAdress, setEmailAdress] = useState<string>(' ');

    //const mailUrl = 'https://us-central1-strandkantenbydel.cloudfunctions.net/sendMail';
    //const mailResponse = fetchUrl(mailUrl + '?to=larsvidar@gmail.com');
    
    const handleEmailSubmit = (event: any) => {
        event.preventDefault();

        if(emailAdress.trim()) {
            console.log(emailAdress);
            setEmailAdress('');
        }
    }
    
    
    /*** Return-statement ***/
    return(
        <div>
            <h1 className='mb-3'>Få tilsendt info om Strandkanten bydel</h1>
            <p className='mb2'>
                Skriv inn din e-post adresse i feltet under for å få tilsendt 
                en e-post med informasjon om Strandkanten Bydel.
            </p>

            <Form
                theme={theme} 
                className='flex-column width-300'
            >
                <input 
                    className='mb1' 
                    type='email' 
                    placeholder='Skriv inn e-post her...'
                    value={emailAdress}
                    onChange={(event: any) => setEmailAdress(event.target.value)}
                />
                <input 
                    className='' 
                    type='submit'
                    onClick={handleEmailSubmit} 
                />
            </Form>
        </div>
    );
}


/***** EXPORTS *****/
export default MailInfo;
