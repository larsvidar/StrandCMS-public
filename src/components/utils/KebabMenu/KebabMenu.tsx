/***** IMPORTS *****/
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Handler/Handler';
import { FaEllipsisH } from 'react-icons/fa';


/***** STYLES *****/
const KebabMenuStyle = styled.div`
    position: relative;

    .kebab {
        font-size: 1.2em;
        cursor: pointer;
    }

    .menu {
        background: white;
        border: solid 1px #aaa;
        z-index: 100;
        position: absolute;
        right: -20px;
        border-radius: 5px;
        box-shadow: 5px 5px 3px rgba(0, 0, 0, .3);

        li {
            cursor: pointer;

            &:hover{
                background: ${props => props.theme.primaryColor};
                filter: brightness(1.5) hue-rotate(20deg);
            }
        }
    }
`;


/***** INTERFACES *****/
interface IKebabMenuProps {
    menu: Array<string>,
    id: string;
    onClick: Function,
};


/***** COMPONENT-FUNCTION *****/
const KebabMenu = ({menu, id, onClick}: IKebabMenuProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {settings} = context && context.state;


    /*** State ***/
    const [showKebab, setShowKebab] = useState(false);


    /*** Effects ***/
    //Runs when showKebab changes.
    useEffect(() => {
        // Sets eventlistener to close kebab-menu if any part of the 
        // page is clicked.
        if(showKebab) {
            document.addEventListener('click', handleKebab);
        } else {
            document.removeEventListener('click', handleKebab);
        }

        return () => document.removeEventListener('click', handleKebab);
    //eslint-disable-next-line
    }, [showKebab])


    /*** Functions ***/

    /**
     * Shows or hides Kebab-menu.
     * @return {void}
     */
    const handleKebab = () => {
        showKebab
            ? setShowKebab(false)
            : setShowKebab(true);
    }


    /**
     * Handles clicks on menu-items and sends info back to parents function.
     * @param {number} index Index-number of the clicked item.
     * @return {void}
     */
    const handleMenuClick = (index: number) => {
        onClick(index, [[id]]);
    }

    /*** Return-statement ***/
    return <KebabMenuStyle theme={settings && settings.theme}>
        {/* The elipse-icon */}
        <FaEllipsisH
            className='kebab' 
            onClick={handleKebab}/>

        {/* The menu itself */}
        {showKebab && <ul className='menu'>
            {/* Mapping out each item in the menu */}
            {menu.map((item: string, index: number) => (
                <li key={index} onClick={() => handleMenuClick(index)}>
                    {item}
                </li>
            ))}
        </ul>}
    </KebabMenuStyle>;
}


/***** EXPORTS *****/
export default KebabMenu;
