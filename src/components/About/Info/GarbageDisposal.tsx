/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { Page, Title2 } from '../../../styles/general';
//@ts-ignore
import glassmetall from '../../../images/glassmetall.jpg';
//@ts-ignore
import soppelboks from '../../../images/soppelboks.jpg';
import FixedImage from '../../utils/FixedImage/FixedImage';


/***** STYLES *****/
const GarbageDisposalStyle = styled.div`
    margin-bottom: 1em;

    ${Title2} {
        margin-bottom: 1em;
    }
`;


/***** COMPONENT-FUNCTION *****/
const GarbageDisposal = () => {
    
    /*** Return-statement ***/
    return(
        <GarbageDisposalStyle><Page>
            <article>
                <Title2>Avfallshåndtering</Title2>
                <p>
                    Container for glass og metall er tilgjengelig i bydelen.
                    Strandkanten Bydel SA ønsker å være en aktiv pådriver for at 
                    bydelen har en effektiv og miljøvennlig avfallshåndtering, 
                    og har derfor innledet et samarbeid med Remiks AS. 
                    Samarbeidet innebærer Strandkanten Bydel SA skal bidra til at 
                    avfallsnedkastene blir holdt ryddige og at vi setter opp flere 
                    små søppelbokser som vi også tømmer. Det er svært uheldig når 
                    folk fyller disse små søppelboksene med søppelposer som burde 
                    vært kastet i et av søppelnedkastene. Det øker sjansen for at 
                    annet søppel ender opp på bakken, eller at bydelen må bruke 
                    ekstra midler på tømming.</p>
                <p>
                    Disse små søppelboksene driftes av bydelen og tømmes en 
                    gang i uka.
                </p>
                <p>
                    Remiks AS har på sin side satt ut en container beregnet for 
                    glass og metall ved torget, og kommer til Strandkanten bydel 
                    for å samle inn elektrisk- og farlig avfall to ganger per år. 
                    Når det gjelder containeren for glass og metall, er det veldig 
                    viktig at folk viser hensyn til de som bor i nærområdet. Det 
                    bråker en del når flasker blir kastet inn i containeren, og 
                    skal derfor ikke benyttes mellom 21.00 og 07.00. Søppel og 
                    øvrig avfall som ikke passer i containerne skal IKKE settes 
                    utenfor, men tas med å kastes på egnede steder.
                </p>
            </article>
            
            <div className='row-2'>
                <div>
                    <FixedImage src={glassmetall} />
                    <p className='caption'>Container for glass og metall er tilgjengelig i bydelen</p>
                </div>

                <div>
                    <FixedImage src={soppelboks} />
                    <p className='caption'>
                        Disse små søppelboksene driftes av bydelen og tømmes en gang 
                        i uka
                    </p>
                </div>
            </div>
        </Page></GarbageDisposalStyle>
    );
}


/***** EXPORTS *****/
export default GarbageDisposal;
