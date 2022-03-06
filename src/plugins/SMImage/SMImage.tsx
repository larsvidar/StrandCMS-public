/***** IMPORTS *****/
import React, {SyntheticEvent, useContext, useEffect, useRef, useState} from 'react';
import styles from './SMImage.module.scss';
import {AppContext} from '../../Handler/Handler';
import {setTheme} from '../../Handler/actions/sActions';
import {IBaseProps} from '../../interfaces/IGeneral';


/***** COMPONENT-FUNCTION *****/
const SMImage = ({onChange, className}: IBaseProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};

    
    /*** State ***/
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');
    const [caption, setCaption] = useState('');


    /*** Variables ***/
    const imageRef = useRef(null);
    const loc = getLoc('smImage');
    const MODULE_NAME = 'Image';
    const CONTENT_TYPE = 'file';
    const smImageClass = className
        ? styles.SMImage + ' ' + className
        : styles.SMImage;


    /*** Effects ***/

    //Runs when theme-context updates.
    // -Sets values from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, imageRef);
    }, [theme]);


    //Runs when 
    // -
    useEffect(() => {
        const content = {file: image, caption, name: imageName};
        onChange({type: CONTENT_TYPE, value: content});
    
    }, [image, imageName, caption]);


    /*** Functions ***/

    /**
     * Sends changes in textarea-input to parent.
     * @param {Event} event Event-object form textarea-input.
     * @return {void} Sends data with onChange-prop-function.
     */
    const handleUpload = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if(file?.name) setImageName(file.name);
        const reader = new FileReader();
        reader.onloadend = handleImage;
        
        console.log(file);
        if(file) reader.readAsDataURL(file);  
    };


    const handleImage = (image: ProgressEvent<FileReader>) => {
        const imageData = image?.target?.result || '';
        if(typeof imageData === 'string') setImage(imageData);
    };



    /*** Return-statement ***/
    return(
        <div className={smImageClass} ref={imageRef} >
            <label htmlFor={MODULE_NAME}>{loc.title}</label>
            <button className={styles.fileButton}>
                {imageName || loc.chooseImage}
                <input
                    className={styles.fileInput}
                    type={CONTENT_TYPE}
                    name={MODULE_NAME} 
                    id={MODULE_NAME}  
                    onChange={handleUpload}
                    accept='image/png, image/jpeg'
                />
            </button>
            <img src={image} />
            {!!image && 
                <input
                    className={styles.caption}
                    type='text'
                    name='caption'
                    id='caption'
                    placeholder={loc.captionPlaceholder}
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                />
            }
        </div>
    );
};


/***** EXPORTS *****/
export default SMImage;
