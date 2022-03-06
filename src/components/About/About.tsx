/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';

const AboutStyles = styled.div`
        margin: 1em;
`;


/***** INTERFACES *****/
interface IAboutProps {}


/***** COMPONENT-FUNCTION *****/
const About = (props: IAboutProps) => {
    
    /*** Return-statement ***/
    return(
        <AboutStyles>
            <p>Content of this new component goes here!</p>
        </AboutStyles>
    );
}


/***** EXPORTS *****/
export default About;

