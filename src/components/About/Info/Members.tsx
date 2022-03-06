/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { Page, Title2 } from '../../../styles/general';


/***** STYLES *****/
const MembersStyle = styled.div`
    margin-bottom: 1em;

    ${Title2} {
        margin-bottom: 1em;
    }
`;


/***** COMPONENT-FUNCTION *****/
const Members = () => {

    /*** Variables ***/
    const memberArray = [
        ['Sameiet Strandkanten Marina', '20. april 2015', 755],
        ['Seaside 23 Borettslag', '31. mars 2015', 623],
        ['Strandkanten K11', '31. mars 2015', 541],
        ['Strandkanten Brygge E Borettslag', '31. mars 2015', 544],
        ['Sameiet Ungbo Strandkanten A 1 og 2', '31. mars 2015', 624],
        ['Nor-Strand – Utleiegården B5', '31. mars 2015', 511],
        ['Nor-Strand – Utleiegården B3', '31. mars 2015', 485],
        ['Nor-Strand – Utleiegården B4', '31. mars 2015', 480],
        ['Nor-Strand – Utleiegården A3 og A4', '31. mars 2015', 472],
        ['Strandkanten Brygge C Borettslag', '31. mars 2015', 526],
        ['OTD Borettslag', '31. mars 2015', 410],
        ['Strandkanten Amfi borettslag', '31. mars 2015', 435],
        ['Strandkanten Brygge G Borettslag', '31. mars 2015', 434],
        ['Strandkanten Brygge D Borettslag', '31. mars', 437],
    ];

    
    /*** Return-statement ***/
    return(
        <MembersStyle><Page>
            <article>
                <Title2>Medlemmer</Title2>
                <p>
                    Borettslag og eiere av boenheter i boligsameie innenfor 
                    Strandkanten boligbydel (planområdet omfattet av 
                    reguleringsplan for Strandkanten boligbydel, plan L12-1426), 
                    har en kontraktsforpliktelse til å være medlemmer/andelseiere 
                    i foretaket.
                </p>
                <p>
                    Borettslag registreres i foretaket som ett medlem, og ivaretar 
                    sine beboeres interesser. Hver beboer blir da å anse som 
                    andelseier i foretaket. For eiere av boenheter i boligsameier 
                    foretas innmelding kollektivt for samtlige boenheter ved 
                    boligsameiets styre. Boligsameiets styre representerer da 
                    samtlige boenheter i det aktuelle sameie i foretaket og 
                    ivaretar deres interesser. Hver enkelt seksjonseier i det 
                    enkelte boligsameie anses da som andelseier i foretaket, men 
                    anses i fellesskap å være ett medlem i relasjon til § 4, § 5 
                    og § 7.
                </p>
                <div className='grid'>
                    <div className='row-3'>
                        <h4>Borettslag</h4>
                        <h4>Dato</h4>	
                        <h4>Treff</h4>
                    </div>

                        {memberArray.map((row: Array<any>, index: number) => (
                            <div key={index} className='row-3' >
                                <p>{row[0]}</p>
                                <p>{row[1]}</p>
                                <p>{row[2]}</p>
                            </div>
                        ))}
                </div>
            </article>
        </Page></MembersStyle>
    );
}


/***** EXPORTS *****/
export default Members;
