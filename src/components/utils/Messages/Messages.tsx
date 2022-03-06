/***** IMPORTS *****/
import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../../Handler/Handler';
import styled from 'styled-components';


/***** STYLES *****/
const MessagesStyle = styled.div`
    position: absolute;
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    top: 80px;
    z-index: 100;
    align-items: center;
    margin-bottom: .5em;

    .message-container {
        width: 60%;
        text-align: right;
    
        h2 {
            display: inline-block;
            position: relative;
            background: white;
            color: black;
            border: solid 1px #aaa;
            border-radius: 5px;
            box-shadow: 5px 5px 3px rgba(0, 0, 0, .3);
            font-weight: 100;
            padding: .9em 1em .4em;
            margin-bottom: .5em;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 15px;
                background: ${props => props.theme.primaryColor};
            }
        }
    }

`;


/***** INTERFACES *****/
interface IMessagesProps {
};


/***** COMPONENT-FUNCTION *****/
const Messages = () => {

    /*** Variables ***/
    const interval: any = useRef();


    /*** Context ***/
    const context = useContext(AppContext);
    const {settings, messages,} = context.state;
    const {setMessage} = context.actions;


    /*** Effects ***/

    //Set timeout for how long message should be displayed when new message is set.
    useEffect(() => {
        interval.current = setTimeout(() => {
            if(messages.length) {
                messages.shift();
            }
            setMessage(null);
        }, 7000);

        //Cleanup, clear timeout if Message-component is unmounted.
        return () => clearTimeout(interval.current);
    //eslint-disable-next-line
    }, [messages]);


    /*** Return-statement ***/
    return <MessagesStyle theme={settings && settings.theme}>
        <div className='message-container'>
            {messages.length 
                ?   messages.map((message: string, index: number) => {
                        return <h2 key={index}>{message}</h2>
                    })
                :   null
            }
        </div>
    </MessagesStyle>
}


/***** EXPORTS *****/
export default Messages;
