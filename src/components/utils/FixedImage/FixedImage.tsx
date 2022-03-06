/***** IMPORTS *****/
import React from 'react';
import styles from './FixedImage.module.scss';
import {IBaseProps} from '../../../interfaces/IGeneral';


/***** INTERFACES *****/
interface IFixedImageProps extends IBaseProps {
    src?: string,
    height?: string,
    width?: string,
}


/***** COMPONENT-FUNCTION *****/
const FixedImage = ({src='', height='auto', width='100%', className}: IFixedImageProps) => {


    /*** Program ***/
    //Set class based of class from parent and content of src.
    const fixedImageBaseClass = className
        ? styles.FixedImage + ' ' + className
        : styles.FixedImage; 

    const fixedImageClass = src
        ? fixedImageBaseClass
        : fixedImageBaseClass + ' ' + styles.emptyImage;
    //src=''

    /*** Return-statement ***/
    return <div 
        className={fixedImageClass}
        style={{
            background: src ? `url('${src}')` : '',
            height: height,
            width: width,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    />;
};


/***** EXPORTS *****/
export default FixedImage;
