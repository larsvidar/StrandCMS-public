/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { Page, Title2 } from '../../../styles/general';


/**** STYLES *****/
const DocksStyles = styled.div`
    ${Title2} {
        margin-bottom: 1em;
    }
`;


/***** INTERFACES *****/
interface IDocksProps {}


/***** COMPONENT-FUNCTION *****/
const Docks = (props: IDocksProps) => {
    
    /*** Return-statement ***/
    return(
        <DocksStyles><Page>
            <article>
                <Title2>Havna</Title2>
                <p>
                    Strandkanten Bydel SA drifter en flytebrygge som er 
                    lokalisert ved torget nord i bydelen. Her kan småbåteiere 
                    som gjester bydelen leie båtplass for korte eller lengre 
                    perioder.
                </p><p>
                    Prisen er 100 kroner per døgn ved korttidsleie. Intensjonen 
                    med båthavna var først og fremst å være en gjestehavn for 
                    tilreisende, men da den har vært lite brukt er det nå også 
                    mulig for bydelens beboere å leie den for lengre perioder. 
                    Prisen er da 2500 kroner per halvår. Formålet med utleie er 
                    å regulere bruken av havna, samt å sikre tilstrekkelig 
                    inntekter til vedlikehold.
                </p><p>
                    Ta kontakt med styret om du er interessert.
                </p>
            </article>
        </Page></DocksStyles>
    );
}


/***** EXPORTS *****/
export default Docks;
