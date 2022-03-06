/***** IMPORTS *****/
import React, {useContext, useEffect, useRef} from 'react';
import {genObject, IBaseProps} from '../../../../interfaces/IGeneral';
import {AppContext} from '../../../../Handler/Handler';
import styles from './Menu.module.scss';
import {Link} from 'react-router-dom';
import SubMenu from './SubMenu/SubMenu';
import { setTheme } from '../../../../Handler/actions/sActions';


/***** INTERFACES *****/
interface IMenuProps extends IBaseProps {
    baseUrl?: string,
}


/***** COMPONENT-FUNCTION *****/
const Menu = ({baseUrl = '/', className}: IMenuProps) => {

    /*** Variables ***/
    const menuRef = useRef(null);
    const menuClass = className
        ? styles.Menu + ' ' + className
        : styles.Menu;

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings, menu} = state || {};
    const {theme} = settings || {};


    /*** Effects ***/

    //Runs when theme-context updates
    // -Sets values from theme to css.
    useEffect(() => {
        setTheme(theme, menuRef);
    }, [theme]);


    /*** Program ***/
    //Mapping out menu
    const menuObject: genObject = {};
    
    menu?.forEach((thisItem: genObject) => {
        if(thisItem.menuParent) {
            menuObject[thisItem.menuParent] = menuObject[thisItem.menuParent] 
                ? [...menuObject[thisItem.menuParent], thisItem] 
                : [thisItem];
        } else {
            menuObject[thisItem.title] = thisItem;
        }
    });

    const mapMenu = Object.entries(menuObject);

    /*** Return-statement ***/
    return(
        <div className={menuClass} ref={menuRef}>
            
            {/* Mapping out LI-elements */}
            {mapMenu.map((menuEntry, index: number) => {

                if(!Array.isArray(menuEntry[1])) { 
                    return  <Link key={index} className={styles.menuLink} to={menuEntry[1].url}>
                        {menuEntry[1].title}
                    </Link>;
                } else {
                    return <SubMenu
                        key={index}
                        baseUrl={baseUrl}
                        menu={menuEntry}
                        theme={theme}
                    />;

                }
            })}
        </div>
    );
};


/***** EXPORTS *****/
export default Menu;
