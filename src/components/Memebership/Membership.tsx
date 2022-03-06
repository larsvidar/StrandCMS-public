/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { Page, Title2 } from '../../styles/general';


/***** STYLES *****/
const MembershipStyle = styled.div`
    margin-bottom: 1em;

    ${Title2} {
        margin-bottom: 1em;
    }

    ul {
        list-style-position: outside;
        
        li {
            margin-left: 1em;
        }
    }
`;


/***** COMPONENT-FUNCTION *****/
const Membership = () => {
    
    /*** Return-statement ***/
    return(
        <MembershipStyle><Page>
            <article>
                <Title2>Medlemsskap</Title2>
                <p>
                    Medlemmene i Strandkanten Bydel SA er borettslagene og sameiene som
                    er lokalisert på Strandkanten fra nord ved Hålogaland teater til 
                    sør på Sjøsia ved Lanes.
                </p>

                <h3>Hvordan fungerer medlemsskap?</h3>
                <p>
                    Medlemskap fungerer på følgende måte: styret i sameier og 
                    borettslag melder seg inn og betaler 145,- i kontingent per måned 
                    per enhet i borettslaget/sameiet. Dette viderefaktureres den 
                    enkelte sameier/andelseier gjennom felleskostandene.
                </p>

                <h3>Hvorfor være medlem?</h3>
                <p>
                    Medlemmene av bydelen får nyte godt av en rekke felles goder som 
                    Strandkanten bydel SA tilbyr. Blant dette er snøbrøyting om 
                    vinteren, plenklipping om sommeren, container ved vårdugnad, 
                    søppelrydding, utomhus vedlikehold med mer. Medlemmene står også 
                    fritt til å foreslå andre fellesgoder som kan fremforhandles. 
                    Gjennom årsmøtet velger medlemmene også hvem som skal representere 
                    dem i styret for kommende perioden.
                </p><p>
                    Alle borettslag og sameier benytter seg av bydelen og deres 
                    fasiliteter og dette er jo også et argument for å melde seg inn, 
                    da Strandkanten bydel har flere kollektive avtaler som styrene får 
                    tatt ut av sine budsjetter ved at sameiet/borettslaget blir medlem. 
                    I tillegg til å ta det ut av budsjettet letter det også arbeidet 
                    til styret, og som vi vet av erfaring kan styreverv i lag og 
                    sameier være svært arbeidskrevende. Derfor lister vi her opp noen 
                    av fordelene ved å melde seg inn:
                </p>

                <ul>
                    <li>
                        Kollektiv avtale for snøbrøyting med tilhørende kvalitetskrav 
                        gjeldende områder, kvalitet og tidspunkter for snørydding.
                    </li>
                    <li>
                        Kollektiv avtale for utomhus vedlikehold etter avtalte 
                        kvalitetskrav (plenklipping, håndtering av planter, vanning, 
                        gjødsling etc.).
                    </li>
                    <li>
                        Søppel- og avfallshåndtering på fellesområder (med unntak av 
                        søppelsug som håndteres av Remiks).
                    </li>
                    <li>
                        Felles dugnad og rengjøring av bydelen med innleie av 
                        containere fra Remiks på Strandkanten bydel SAs regning.
                    </li>
                    <li>
                        Inngåelse av kollektive avtaler: styret og beboere står 
                        fritt til å foreslå kollektive avtaler som kan være aktuelle 
                        for bydelen.
                    </li>
                </ul>
                    
                <h3>Så til betingelsene og hvordan medlemskap fungerer: </h3>
                <p>
                    Selv om det er det enkelte borettslag/sameie som tegner medlemskap,
                    betaler hver andelseier/sameier kontingent til bydelsforeningen. 
                    For denne kontingenten får beboerne en ryddig, vel i varetatt og 
                    hyggelig bydel å bo i.
                </p><p>
                    Slik er medlemskapet med på å sikre et trivelig og velfungerende 
                    bomiljø og hver beboers kontigent er med på å bidra til 
                    realiseringen av et trivelig og velstelt boområde. Dette kan 
                    faktureres hver enkelt månedlig sammen med felleskostnadene. 
                    Samtidig blir styrene i borettslag og sameier med dette fritatt 
                    for en rekke større arbeidsoppgaver, som kan lette hverdagen slik 
                    at styret får konsentrere seg og prioritert andre arbeidsoppgaver 
                    innad i sin organisasjon.
                </p><p>
                    Ta gjerne kontakt med styreleder i Strandkanten bydel for mer 
                    informasjon.
                </p>
            </article>
        </Page></MembershipStyle> 
    );
}


/***** EXPORTS *****/
export default Membership;
