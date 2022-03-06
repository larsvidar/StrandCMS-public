/***** IMPORTS *****/
import React, {FC, useContext, useEffect, useRef} from 'react';
import {setTheme} from '../../../Handler/actions/sActions';
import {AppContext} from '../../../Handler/Handler';
import styles from './Messages.module.scss';


/***** COMPONENT-FUNCTION *****/
const Messages: FC = (): JSX.Element => {

    /*** Variables ***/
    const interval = useRef<any>(0);
    const messagesRef = useRef(null);
    const MESSAGE_TIMEOUT = 7 * 1000;


    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings, messages} = state || {};
    const {theme} = settings || {};
    const {setMessage} = actions || {};


    /*** Effects ***/

    //Runs when messages-context updates.
    // -Set timeout for how long message should be displayed when new message is set.
    useEffect(() => {
        interval.current = setTimeout(() => {
            if(messages.length) {
                messages.shift();
            }
            setMessage(null);
        }, MESSAGE_TIMEOUT);

        //Cleanup, clear timeout if Message-component is unmounted.
        return () => clearTimeout(interval.current);
    //eslint-disable-next-line
    }, [messages]);

    
    //Runs when theme-context updates
    // -Sets values from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, messagesRef);
    }, [theme]);


    /*** Return-statement ***/
    return <div className={styles.Messages} ref={messagesRef} >
        <div className='message-container'>
            {messages.length 
                ?   messages.map((message, index) => {
                        return <h2 key={index}>{message}</h2>;
                    })
                :   null
            }
        </div>
    </div>;
};


/***** EXPORTS *****/
export default Messages;
