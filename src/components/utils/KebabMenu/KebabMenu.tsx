/***** IMPORTS *****/
import React, {useContext, useState, useEffect, FC, useRef} from 'react';
import styles from './KebabMenu.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {FaEllipsisH} from 'react-icons/fa';
import {setTheme} from '../../../Handler/actions/sActions';


/***** INTERFACES *****/
interface IKebabMenuProps {
    menu: Array<string>,
    id: string;
    onClick: any,
}


/***** COMPONENT-FUNCTION *****/
const KebabMenu: FC<IKebabMenuProps> = ({menu, id, onClick}) => {

    /*** Variables ***/
    const kebabMenuRef = useRef(null);

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** State ***/
    const [showKebab, setShowKebab] = useState(false);


    /*** Effects ***/
    //Runs when showKebab changes.
    useEffect(() => {
        // Sets event-listener to close kebab-menu if any part of the 
        // page is clicked.
        if(showKebab) {
            document.addEventListener('click', handleKebab);
        } else {
            document.removeEventListener('click', handleKebab);
        }

        return () => document.removeEventListener('click', handleKebab);
    //eslint-disable-next-line
    }, [showKebab]);


    //Runs when theme-context updates
    // -Sets values from theme to css.
    useEffect(() => {
        setTheme(theme, kebabMenuRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Shows or hides Kebab-menu.
     * @return {void}
     */
    const handleKebab = () => {
        showKebab
            ? setShowKebab(false)
            : setShowKebab(true);
    };


    /**
     * Handles clicks on menu-items and sends info back to parents function.
     * @param {number} index Index-number of the clicked item.
     * @return {void}
     */
    const handleMenuClick = (index: number) => {
        onClick(index, [[id]]);
    };

    /*** Return-statement ***/
    return <div className={styles.KebabMenu} ref={kebabMenuRef} >
        {/* The ellipse-icon */}
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
    </div>;
};


/***** EXPORTS *****/
export default KebabMenu;
