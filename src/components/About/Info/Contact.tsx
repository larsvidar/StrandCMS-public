/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { Page, Title2 } from '../../../styles/general';
import { genObject } from '../../../interfaces/IGeneral';
//@ts-ignore
import anne from '../../../images/styret/anneg.jpg';
//@ts-ignore
import halvard from '../../../images/styret/halvard.jpg';
//@ts-ignore
import jarl from '../../../images/styret/jarl.jpg';
//@ts-ignore
import maykristin from '../../../images/styret/maykristin.jpg';
import {IoIosPerson} from 'react-icons/io';
import FixedImage from '../../utils/FixedImage/FixedImage';


/***** STYLES *****/
const ContactStyle = styled.div`
    margin-bottom: 1em;

    ${Title2} {
        margin-bottom: 1em;
    }

    ${Page} {
        .grid {
            .row-3 {
                grid-template-columns: 2fr 4fr 2fr;
                
                p {
                    margin-bottom: 1em;
                }

                .name, .contact {
                    padding: 1em;
                }

                .contact {
                    
                }
            }
        }
    }

`;


/***** COMPONENT-FUNCTION *****/
const Contact = () => {

    /*** Variables ***/
    const boardArray = [
        {
            name: 'May Kristin Lockert', 
            role: 'Styreleder', 
            phone: '90915127', 
            mail: 'nlp.maykristin@gmail.com',
            image: maykristin,
        },
        {
            name: 'Jarl Rønneberg', 
            role: 'Styrets nestleder', 
            phone: '', 
            mail: 'jarlronneberg@gmail.com',
            image: jarl,
        },
        {
            name: 'Sylvi Fjellheim', 
            role: '(i permisjon ut perioden)', 
            phone: '', 
            mail: '',
            image: '',
        },   
        {
            name: 'Anne-Grete Annsdatter Haug', 
            role: 'Styremedlem', 
            phone: '90588426', 
            mail: 'agskavhaug@gmail.com',
            image: anne,
        },
        {
            name: 'Halvard Salamonsen', 
            role: 'Styremedlem', 
            phone: '90061080', 
            mail: 'hasmon@online.no',
            image: halvard,
        },
        {
            name: 'Christer Lund', 
            role: 'Varamedlem (for Sylvi Fjellheim ut perioden)', 
            phone: '', 
            mail: '',
            image: '',
        },
        {
            name: 'Kim-Freddy Thomesen', 
            role: 'Varamedlem', 
            phone: '', 
            mail: '',
            image: '',
        },
    ];

    
    /*** Return-statement ***/
    return(
        <ContactStyle><Page>
            <Title2>Styret</Title2>
            <div className='grid'>
                {boardArray.map((row: genObject) => (
                    <div className='row-3'>
                        {row.image
                            ? <FixedImage  
                                src={row.image}
                                width='150px'
                                height='190px' 
                            />
                            : <IoIosPerson className='person' />
                        }
                        <div className='name'>
                            <h3>{row.name}</h3>
                            <p>{row.role}</p>
                        </div>
                        <div className='contact'>
                            <p>Telefon: {row.phone}</p>
                            <p>{row.mail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Page></ContactStyle>
    );
}


/***** EXPORTS *****/
export default Contact;
