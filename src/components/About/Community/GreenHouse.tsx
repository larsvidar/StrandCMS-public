/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { Page, Title2 } from '../../../styles/general';
import drivhusene1 from '../../../images/drivhusene1.jpg';
import drivhusene2 from '../../../images/drivhusene2.jpg';
import FixedImage from '../../utils/FixedImage/FixedImage';


/**** STYLES *****/
const GreenhouseStyles = styled.div`
    ${Title2} {
        margin-bottom: 1em;
    }
`;


/***** INTERFACES *****/
interface IGreenHouseProps {}


/***** COMPONENT-FUNCTION *****/
const GreenHouse = (props: IGreenHouseProps) => {
    
    /*** Return-statement ***/
    return(
        <GreenhouseStyles><Page>
            <article>
                <Title2>Drivhusene</Title2>
                <p>
                    Strandkanten Bydel SA leier ut drivhus til den som måtte ønske
                    å teste sine grønne fingre.
                </p><p>
                    For 1200 kroner disponerer du ditt eget drivhus hele 
                    vekstsesongen, og kan forhåpentligvis nyte friske grønnsaker 
                    eller fargerike blomster før drivhusene stenges ned for 
                    vinteren.
                </p><p>
                    Leietakerne er ansvarlige for å ivareta drivhusene i 
                    leieperioden. Det betyr at en må påse at vindu og dører er 
                    lukket/sikret når været tilsier det, samt skifte ut lyspærer 
                    og liknende. Skulle drivhuset bli utsatt for hærverk eller vær 
                    i leieperioden kontakt styret, så legger vi en plan for å ordne 
                    huset. Strøm og tilgang til vann er inkludert i prisen.
                </p><p>
                    Ta kontakt med på kontakt@strandkantenbydel.no ved interesse
                </p>
            </article>
            <div className='row-2'>
                <div>
                    <FixedImage src={drivhusene1} />
                    <p className='caption'>Container for glass og metall er tilgjengelig i bydelen</p>
                </div>

                <div>
                    <FixedImage src={drivhusene2} />
                    <p className='caption'>
                        Disse små søppelboksene driftes av bydelen og tømmes en gang 
                        i uka
                    </p>
                </div>
            </div>
        </Page></GreenhouseStyles>
    );
}


/***** EXPORTS *****/
export default GreenHouse;
