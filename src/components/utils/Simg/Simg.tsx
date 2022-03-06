/***** IMPORTS *****/
import React, { useState } from 'react';
import noimage from './noimage.png';
import broken from './broken.png';
import { IBaseProps } from '../../../interfaces/IGeneral';
import styled from 'styled-components';


/***** STYLES *****/
const SimgStyle = styled.img``;



/***** INTERFACES *****/
interface IUimgProps extends IBaseProps {
    src?: string,
    alt?: string,
}


/***** COMPONENT-FUNCTION *****/
const Simg = ({src, alt, className}: IUimgProps) => {

    /*** State ***/
    const [imageSrc, setImageSrc] = useState(src);

    
    /*** Return-statement ***/
    return <SimgStyle
                className={className}
                src={imageSrc ? imageSrc : broken}
                alt={alt ? alt : ''} 
                onError={() => setImageSrc(noimage)}
            /> 
}


/***** EXPORTS *****/
export default Simg;
