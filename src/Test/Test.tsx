/***** IMPORTS *****/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getToken } from '../Handler/FireBase/firebaseHandler';
import { genObject } from '../interfaces/IGeneral';
import ContactForm from '../components/utils/ContactForm/ContactForm';
import {isError} from '../Handler/actions/actions';


/***** STYLES *****/
const TestStyles = styled.div`
    /* border: solid 1px #eee;
    margin: 3em;
    */

    margin: 0 auto;
    text-align: center;

`;


/***** INTERFACES *****/
interface ITestProps {}


/***** COMPONENT-FUNCTION *****/
const Test = (props: ITestProps) => {

    // const context = useContext(AppContext);
    // const {articles} = context.state;

    const [result, setResult] = useState<genObject>({});


    useEffect(() => {
        if(!result.status) setResult({status: 'No result...'});

    //eslint-disable-next-line
    }, []);


    useEffect(() => {
        if(result) console.log(result);

    //eslint-disable-next-line
    }, [result]);

    console.log('dette er testen')
    const sendMail = async () => {
        console.log('sendmail')
        const token = await getToken();
        
        if(!token || isError(token)) {
            console.log(token ? 'Error: ' + token.message : 'Token not found...');
        } 

        if(token) {

            fetch('http://localhost:8000/sendmail',
                {   
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        //Authorization: 'Bearer ' + token,
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({info: {email: "larsvidar@gmail.com"}}),
                }
            ).then((response: any) => {
                console.log('RESPONSE: ', response);
                return response.json()
            }).then((thisResult: any) => setResult(thisResult));
        }
    }

    const sendMessage = async () => {
        const token = await getToken();
        
        if(!token || isError(token)) {
            console.log(token ? 'Error: ' + token.message : 'Token not found...');
        } 

        if(token) {

            fetch('https://localhost:8000/sendmail',
                {   
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                        contact: {
                            from: "larsvidar@gmail.com", 
                            message: "Dette er en testmelding til styret. Denne meldingen skal ikke komme fram!",
                        }
                    }),
                }
            ).then((response: any) => response.json())
                .then((thisResult: any) => setResult(thisResult));
        }
    }


    /*** Return-statement ***/
    return(
        <TestStyles>
            {/* Place component to test below this line */}

                <button onClick={sendMail}>Send mail</button>

                <button onClick={sendMessage}>Send message</button>

                <ContactForm mode='contact' test={true} />

                <ContactForm mode='info' test={true} />

            {/* Place component to test above this line */}
        </TestStyles>
    );
}


/***** EXPORTS *****/
export default Test;
