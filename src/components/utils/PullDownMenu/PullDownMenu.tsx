/***** IMPORTS *****/
import React, {FC, SyntheticEvent, useContext, useEffect, useRef, useState} from 'react';
import styles from './PullDownMenu.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {genObject, IBaseProps} from '../../../interfaces/IGeneral';
import {setTheme} from '../../../Handler/actions/sActions';


/***** INTERFACES *****/
interface IPullDownMenuProps extends IBaseProps {
    items: string[],
}


/***** PULLDOWN-MENU *****/
const PullDownMenu: FC<IPullDownMenuProps> = ({items, onChange=()=>{/*Empty*/}}): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};


    /*** Variables ***/
    const pullDownMenuRef = useRef(null);
    const loc = getLoc('pullDownMenu');
    const arrow = '<';


    /*** State ***/
    const [showMenu, setShowMenu] = useState<boolean>(false);


    /*** Efects ***/

    //Runs when theme-context updates.
    // -Assigns theme-values to CSS.
    useEffect(() => {
        if(theme) setTheme(theme, pullDownMenuRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Handles changes in pulldown-menu
     * @param {Event} event 
     * @param {string} item 
     * @return {void}
     */
    const thisOnChange = (event: SyntheticEvent, item: string) => {
        const target = event.target as genObject;
        target.value = item;
        onChange(event);
    };

    
    /*** Return-statement ***/
    return(
        <div 
            className={styles.PullDownMenu} 
            ref={pullDownMenuRef} 
            onClick={() => setShowMenu(!showMenu)} 
        >
            {/* Placeholder with arrow */}
            <p className={styles.label} >{loc.chooseModule}</p>
            <p className={styles.arrow + (showMenu ? ' ' + styles.down  : '')} >{arrow}</p>

            {/* Items in pulldown-menu */}
            <div className={styles.selectBox}>
                {showMenu && items.map((item, index) => (
                    <p
                        key={index}
                        className={styles.componentName} 
                        onClick={(event) => thisOnChange(event, item)}
                    >
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
};


/***** EXPORTS *****/
export default PullDownMenu;
