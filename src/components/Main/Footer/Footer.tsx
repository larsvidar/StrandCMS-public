/***** IMPORTS *****/
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Handler/Handler';
import { IBaseProps } from '../../../interfaces/IGeneral';
import ShowLoader from '../../utils/ShowLoader/ShowLoader';
import { BaseClass } from '../../../styles/general';
//import waves from '../../../images/waves.png';

/***** STYLES *****/
const FooterStyle = styled(BaseClass)`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;

    .dark-gradient {
        margin: 0;
        width: 100%;
        height: 60px;
        background: linear-gradient(${props => props.theme.primaryColor}, black);

        .footer {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;

            p {

            }
        }
    }
`;

/***** INTERFACES *****/
interface IFooterProps extends IBaseProps {}


/***** COMPONENT-FUNCTION *****/
const Footer = ({className}: IFooterProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {site, theme} = settings || {};


    /*** Return-statement ***/
    if(!settings) return <ShowLoader />;
    return(
        <FooterStyle className={className} theme={theme} >
            <div className='dark-gradient'>
                <div className='container'>
                    <div className='footer'>
                        <p>{site?.footer}</p>
                    </div>
                </div>
            </div>
        </FooterStyle>
    );
}


/***** EXPORTS *****/
export default Footer;
