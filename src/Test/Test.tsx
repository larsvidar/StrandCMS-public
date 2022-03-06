/***** IMPORTS *****/
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {getToken} from '../Handler/crudder/firebaseHandler';
import {genObject} from '../interfaces/IGeneral';
import ContactForm from '../components/utils/ContactForm/ContactForm';
import {isError} from '../Handler/actions/actions';


/***** STYLES *****/
const TestStyles = styled.div`
    margin: 0 auto;
    text-align: center;
`;


/***** COMPONENT-FUNCTION *****/
const Test = () => {

    /*** State ***/
    const [result, setResult] = useState<genObject>({});


    /*** Effects ***/

    //Runs when 
    useEffect(() => {
        if(!result.status) setResult({status: 'No result...'});

    //eslint-disable-next-line
    }, []);

    //Runs when 
    useEffect(() => {
        if(result) console.log(result);

    //eslint-disable-next-line
    }, [result]);

    const sendMail = async () => {

        const token: any = await getToken();
        
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
                    body: JSON.stringify({info: {email: 'larsvidar@gmail.com'}}),
                }
            ).then((response) => {
                return response.json();
            }).then((thisResult) => setResult(thisResult));
        }
    };

    const sendMessage = async () => {
        const token: any = await getToken();
        
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
                            from: 'larsvidar@gmail.com', 
                            message: 'Dette er en testmelding til styret. Denne meldingen skal ikke komme fram!',
                        }
                    }),
                }
            ).then((response) => response.json())
                .then((thisResult) => setResult(thisResult));
        }
    };


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
};


/***** EXPORTS *****/
export default Test;
