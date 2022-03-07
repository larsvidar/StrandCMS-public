/***** IMPORTS *****/
import React, {useContext, useEffect, useRef} from 'react';
import styles from './AdminMenu.module.scss';
import {Link} from 'react-router-dom';
import {AppContext} from '../../../Handler/Handler';
import {logout} from '../../../Handler/actions/authActions';
import {setTheme} from '../../../Handler/actions/sActions';


/***** COMPONENT-FUNCTION *****/
const AdminMenu = () => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};


    /*** Variables ***/
    const AdminMenuRef = useRef(null);
    const loc = getLoc('adminMenu');


    /*** Effects ***/
    //Runs when theme-context updates
    // -
    useEffect(() => {
        setTheme(theme, AdminMenuRef);
    }, [theme]);
    

    /*** Return-statement ***/
    return(
        <div className={styles.AdminMenu} ref={AdminMenuRef} >
            <ul className='menu-list'>
                <Link to='/admin/'><li>{loc.admin}</li></Link>
                <Link to='/admin/article-list/'><li>Artikler</li></Link>
                {/* <Link to='/admin/make-article/'><li>Lag ny artikkel</li></Link> */}
                <Link to='/admin/pages-list/'><li>Sider</li></Link>
                {/* <Link to='/admin/make-pages/'><li>Lag ny side</li></Link> */}
                {/* <Link to='/admin/edit-menu/'><li>Rediger meny</li></Link> */}
                <Link to='/admin/page-settings/'><li>Nettsideinnstillinger</li></Link>
                {/* <Link to='/admin/email-settings/'><li>E-post innstillinger</li></Link> */}
                <p onClick={() => logout(history, '/')}><li>Logg ut</li></p>
            </ul>
        </div>
    );
};


/***** EXPORTS *****/
export default AdminMenu;
