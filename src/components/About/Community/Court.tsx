/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { Page, Title2 } from '../../../styles/general';
import basketballbane1 from '../../../images//basketbane1.jpg';
import basketballbane2 from '../../../images/basketbane2.jpg';
import FixedImage from '../../utils/FixedImage/FixedImage';


/**** STYLES *****/
const CourtStyles = styled.div`
    ${Title2} {
        margin-bottom: 1em;
    }
`;


/***** INTERFACES *****/
interface ICourtProps {}


/***** COMPONENT-FUNCTION *****/
const Court = (props: ICourtProps) => {
    
    /*** Return-statement ***/
    return(
        <CourtStyles><Page>
            <article>
                <Title2>Basketballbanen</Title2>
                <p>
                    I de siste årene har bruken av basketballbanen på kveldstid 
                    (utenfor brukstid) økt betydelig. Konsekvensene har blant 
                    annet blitt et høyt støynivå på kveldstid, forsøpling av 
                    området og skader på privat eiendom. Styret har derfor 
                    bestemt å ta ned basketballkurvene for hele sesongen 2017 
                    og å revurdere situasjonen.
                </p><p>
                    Strandkanten Bydel SA ønsker at basketbanen blir brukt 
                    aktivt, og at bydelens beboere ser på den som et velkomment 
                    aktivitet- og mosjonstilbud. Det innebærer et brukerne 
                    husker på at den ligger midt i et boligområde og at det 
                    derfor er helt nødvendig at ordensreglene følges.
                </p><p>
                    Strandkanten Bydel SA vil aktivt jobbe for å hindre unødig 
                    slitasje på anlegget, samt hindre at den blir til sjenanse 
                    for beboerne i nærområdet. Det innebærer at det er 
                    tilstrekkelig muligheter for å kaste småsøppel i nærheten, 
                    at banen er tilstrekkelig skjermet fra omgivelsene, og 
                    påse at bruken avsluttes innen tidsfristen på kveldstid.
                </p><p>
                    Når det er sagt er det bare hyggelig å invitere til spill 
                    og trening på basketbanen. 
                </p>
            </article>
            
            <div className='row-2'>
                <div>
                    <FixedImage src={basketballbane1} />
                </div>

                <div>
                    <FixedImage src={basketballbane2} />
                    <p className='caption'>
                        Nord i bydelen er byens fineste, utendørs 
                        basketballbane lokalisert. Med stort tribuneanlegg, 
                        behagelig dekke og to fullverdige kurver er forholdene
                        lagt til rette for mye basketmoro.
                    </p>
                </div>
            </div>
        </Page></CourtStyles>
    );
}


/***** EXPORTS *****/
export default Court;
