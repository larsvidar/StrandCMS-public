/***** IMPORTS *****/
import React, { useEffect, useRef } from 'react';
import styles from './SubMenu.module.scss';
import { Link } from 'react-router-dom';
import { genObject } from '../../../../../interfaces/IGeneral';
import { MdExpandMore } from 'react-icons/md';
import { setTheme } from '../../../../../Handler/actions/sActions';



/***** INTERFACES *****/
interface ISubMenuProps {
    baseUrl: string,
    menu: Array<any>,
    theme: genObject,
}


/***** COMPONENT-FUNCTION *****/
const SubMenu = ({menu, theme}: ISubMenuProps) => {

    /*** Variables ***/
    const submenuRef = useRef(null);


    /*** Effects ***/
    //Runs when theme-context updates
    // -Sets theme-values to css.
    useEffect(() => {
        setTheme(theme, submenuRef);
    }, [theme]);

    /*** Return-statement ***/
    return(
        <div className={styles.SubMenu} ref={submenuRef} >
            <p className='sub-menu-link' >{menu[0]}</p>
            <MdExpandMore />
            <div className='sub-menu'>
                {menu[1].map((subItem: genObject, index: number) => {
                    return (
                        <Link 
                            key={index} 
                            to={subItem.url} 
                            className='sub-menu-item'
                        >
                            {subItem.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};


/***** EXPORTS *****/
export default SubMenu;
