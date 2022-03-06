/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { IBaseProps } from '../../../interfaces/IGeneral';

/***** STYLES *****/
const FixedImageStyle = styled('div')<{src: string, height: string, width: string}>`
    background: url(${props => props.src}) !important;
    background-position: center !important;
    background-size: cover !important;
    width: ${props => props.width};
    height: ${props => props.height};
    overflow: hidden;
`;


const EmptyImageStyle = styled('div')<{height: string, width: string}>`
    background: #eee;
    width: ${props => props.width};
    height: ${props => props.height};
    overflow: hidden;
`;

/***** INTERFACES *****/
interface IFixedImageProps extends IBaseProps {
    src?: string,
    height?: string,
    width?: string,
}



/***** COMPONENT-FUNCTION *****/
const FixedImage = ({src='', height='auto', width='100%', className=''}: IFixedImageProps) => {
    
    /*** Return-statement ***/
    return src 
        ?   <FixedImageStyle {...{src, height, width}} className={className} />
        :   <EmptyImageStyle {...{height, width}} className={className} />

}


/***** EXPORTS *****/
export default FixedImage;
