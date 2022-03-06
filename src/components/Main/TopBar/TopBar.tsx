///***** IMPORTS *****/
import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './TopBar.module.scss';
import {AppContext} from '../../../Handler/Handler';
import Menu from './Menu/Menu';
import logo from '../../../images/logo.png';
import {Link} from 'react-router-dom';
import {IBaseProps} from '../../../interfaces/IGeneral';
import ShowLoader from '../../utils/ShowLoader/ShowLoader';
import Simg from '../../utils/Simg/Simg';
import {FaBars} from 'react-icons/fa';
import { setTheme } from '../../../Handler/actions/sActions';


/***** COMPONENT-FUNCTION *****/
const TopBar = ({className}: IBaseProps) => {

    /*** Variables ***/
    const topBarRef = useRef(null);
    const topBarClass = className
        ? styles.TopBar + ' ' + className
        : styles.TopBar;


    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme, site} = settings || {};


    /*** State ***/
    const [showMenu, setShowMenu] = useState(false);


    /*** Effects ***/

    //Runs when theme-context updates 
    // -Sets value from theme to css.
    useEffect(() => {
        setTheme(theme, topBarRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Handles click on hamburger-menu
     */
    const handleBurgerClick = () => {
        setShowMenu((prevState) => !prevState);
        let num = 0;
        window.onclick = () => {
            num++;
            if(num > 1) {
                setShowMenu(false);
                window.onclick = null;
            }
        };
    };


    /*** Return-statement ***/
    if(!settings) return <ShowLoader />;
    return(
        <div className={topBarClass} ref={topBarRef} >
        <   div className='container' >
                <div className={styles.bar} >
                    <div className={styles.logo} >
                        <Simg src={logo} alt='logo' />
                        <Link to='/'>
                            <h1 className={styles.title}>{site?.siteTitle}</h1>
                        </Link>
                    </div>

                    <Menu className={styles.menu} />
                    <FaBars className={styles.hamburger} onClick={handleBurgerClick} />
                    {showMenu && <Menu className={styles.expandMenu} />}
                </div>
            </div>
        </div>
    );
};


/***** EXPORTS *****/
export default TopBar;
