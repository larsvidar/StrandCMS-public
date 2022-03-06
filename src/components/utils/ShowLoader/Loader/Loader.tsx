/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';


/***** STYLES *****/
const LoaderStyle = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        //background: rgba(0, 0, 0, .3);
        backdrop-filter: blur(5px);
        z-index: 1000000;

        .wheel {
            width: 7vw;
            height: 7vw;
            border-radius: 50%;
            /* background: linear-gradient(${props => props.theme.primaryColor ? props.theme.primaryColor : 'black'}, rgba(255, 255, 255, 0) 50%); */
            animation-name: spin;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            opacity: .7;
        }

        @keyframes spin {
            from {transform: rotate(0deg)}
            to {transform: rotate(360deg)}
        }
`;


/***** COMPONENT-FUNCTION *****/
const Loader = () => {
    
    /*** Return-statement ***/
    return <LoaderStyle theme={{primaryColor: 'blue'}}>
            <FaSpinner className='wheel'/>
        </LoaderStyle>;
}


/***** EXPORTS *****/
export default Loader;
