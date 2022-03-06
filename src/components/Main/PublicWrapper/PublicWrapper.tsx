/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import poster from '../../../images/hero.jpg';
import FixedImage from '../../utils/FixedImage/FixedImage';
import {BaseClass} from '../../../styles/general';
import LastPosts from '../../News/LastPosts/LastPosts';


/***** STYLES *****/
const PublicWrapperStyles = styled(BaseClass)`

    .hero {
        position: absolute;
        left: 0;
        width: 100%;
        margin: 0;
    }

    .lastPosts {
        min-width: 300px;
    }
    
    @media(max-width: 1000px) {
        .lastPosts {
            display: none;
        }
    }

    .middle {
        position: relative;
        display: grid;
        grid-template-columns: 1fr min-content;
        column-gap: 1.5em;
        max-width: 100%;
        background: white;
        top: ${props => props.theme.heroHeight};
        padding: 2em 4em 2em;
        box-shadow: 5px 0 10px rgba(0, 0, 0, .3), -5px 0 10px rgba(0, 0, 0, .3);

        @media(max-width: 700px) {
            margin: 0;
            padding: .7em 2em 1em;
        }
    }
    
    /* position: relative;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url(${''});
        background-size: 200%;
        opacity: .8;
        z-index: -1;
    } */
`;

/***** INTERFACES *****/
interface IPublicWrapperProps {
    children: any,
    hero?: boolean;
    latest?: boolean,
}


/***** COMPONENT-FUNCTION *****/
const PublicWrapper = ({children, hero = true, latest = true}: IPublicWrapperProps) => {

    const heroHeight = hero ? '400px' : '0';
    
    /*** Return-statement ***/
    return(
        <PublicWrapperStyles theme={{heroHeight: heroHeight}}>
            <div className='container' >
                {hero && <FixedImage className='hero' src={poster} height={heroHeight} />}
                <div className='middle'>
                    {children}
                    {latest && <LastPosts className={'lastPosts'} />}
                </div>
            </div>
        </PublicWrapperStyles>
    );
}


/***** EXPORTS *****/
export default PublicWrapper;
