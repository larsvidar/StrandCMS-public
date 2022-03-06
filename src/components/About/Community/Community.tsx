/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import {Page, Title2} from '../../../styles/general';


/***** STYLES *****/
const CommunityStyle = styled.div`
    margin-bottom: 1em;

    ${Title2} {
        margin-bottom: 1em;
    }
`;


/***** COMPONENT-FUNCTION *****/
const Community = () => {
    
    /*** Return-statement ***/
    return(
        <CommunityStyle><Page>
            <Title2>Bomiljø</Title2>
            <p>
                Strandkanten Bydel SA arbeider aktivt for å skape et best 
                mulig nærmiljø i boligområdet. Det handler om at veiene skal 
                være brøytet og strødd på vinteren og at gresset skal være 
                grønt og klippet på sommeren. For å bidra til et godt bomiljø 
                trenger vi også beboeres hjelp. Avfall kastes i søppeldunker. 
                Privat husholdningsavfall skal i avfallssugene. Avfall fra 
                firbente skal kastes i poser og avhendes i nærmeste søppelboks. 
                Kjøring skal foregå etter skilt og anvisninger. Det er mange 
                barn i bydelen og flere leksesoner, og kjørende bes tas ekstra 
                hensyn.
            </p>
        </Page></CommunityStyle>
    );
}


/***** EXPORTS *****/
export default Community;
