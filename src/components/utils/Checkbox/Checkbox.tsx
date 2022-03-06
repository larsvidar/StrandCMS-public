/***** IMPORTS *****/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/***** STYLES *****/
const CheckboxStyle = styled.div`
        margin-bottom: 1em;
`;


/***** INTERFACES *****/
interface ICheckboxProps {
    onChange: Function,
    checked: boolean,
    value: string,
};


/***** COMPONENT-FUNCTION *****/
const Checkbox = ({onChange, checked, value}: ICheckboxProps) => {

    /*** State ***/
    const [isChecked, setIsChecked] = useState(false);


    /*** Effects ***/
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);


    /*** Functions ***/
    const handleCheckbox = () => {
        onChange(isChecked, value);
    }
    
    /*** Return-statement ***/
    return(
        <CheckboxStyle>
             <input
                type='checkbox'
                checked={isChecked}
                onChange={handleCheckbox}
             />
           
        </CheckboxStyle>
    );
}


/***** EXPORTS *****/
export default Checkbox;
