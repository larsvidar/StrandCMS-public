/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
//@ts-ignore
import drage from '../../../images/drage.jpg';
import { Page, Title2 } from '../../../styles/general';
import FixedImage from '../../utils/FixedImage/FixedImage';


/***** STYLES *****/
const InfoStyle = styled.div`
    margin-bottom: 1em;

    ${Title2} {
        margin-bottom: 1em;
    }
`;


/***** COMPONENT-FUNCTION *****/
const Info = () => {
    
    /*** Return-statement ***/
    return(
        <InfoStyle><Page>
            <article>
                <Title2>Informasjon</Title2>
                <p>
                    Foretakets navn er Strandkanten Bydel SA. Foretakets formål er 
                    på vegne av medlemmene å drifte og vedlikeholde alle utendørs 
                    fellesarealer på en mest mulig og kostnadseffektiv måte slik 
                    at medlemmene får mest mulig igjen for kontingenten.
                </p>
                <p>
                    Foretaket skal i henhold til reguleringsplan L12–1426, og avtale
                    mellom utbyggerne og Tromsø kommune, stå som eier av alle 
                    felles uteareal i boligbydelen. Samvirket er dermed gitt i 
                    oppgave å drifte og vedlikeholde fellesområdene i bydelen, 
                    herunder parker, ball-løkker kvartalslekeplasser, stier og 
                    gangveier i bydelen, samt drifte den kommunalt eide 
                    strandpromenaden i samarbeid med kommunen. Dette betyr 
                    plenklipp, brøyting, strøing/feiing, måking av trapper og 
                    gangveier, belysning, renhold, reasfaltering etc.
                </p>
                <p>
                    I tillegg skal foretaket arbeide aktivt for å skape et best 
                    mulig nærmiljø i boligområdet. Foretaket kan ta opp saker som 
                    er egnet til å fremme disse formål.
                </p>
                <p>
                    De områder som foretaket er eier av, eller som samvirket 
                    skal ha drifts- og vedlikeholdsansvar for uten å være eier,
                    skal nærmere spesifiseres ved avtale mellom samvirket, 
                    utbygger og Tromsø kommune.
                </p>
                <p>
                    Foretakets medlemmer betaler årlig en kontingent til 
                    foretaket og deltar i nødvendig finansiering av foretakets 
                    oppgaver. Ulik servicegrad tilsier at kontingenten bør være
                    ulik i den nordlige og sørlige delen av Strandkanten 
                    boligområde. Når utbyggingen har nådd så langt at 
                    strandpromenaden er gjennomgående forutsettes lik 
                    kontingent. Kontingenten innkreves av det enkelte medlem 
                    og fastsettes ut i fra det antall boenheter som ligger til 
                    hvert enkelt boligsameie/borettslag.
                </p>
                <FixedImage src={drage} />
            </article>
        </Page></InfoStyle>
    );
}


/***** EXPORTS *****/
export default Info;
