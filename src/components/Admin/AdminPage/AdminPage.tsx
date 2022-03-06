/***** IMPORTS *****/
import React from 'react';
import styles from './AdminPage.module.scss';
import {Link, withRouter} from 'react-router-dom';
import {IHistory} from '../../../interfaces/IGeneral';
import {logout} from '../../../Handler/actions/authActions';


/***** COMPONENT-FUNCTION *****/
const Admin = ({history}: IHistory) => {


    /*** Return-statement ***/
    return(
        <div className={styles.AdminPage}>
            <h2>Adminpanel</h2>

            <Link className='link' to='/admin/article-list/' >
                Artikkelliste.
            </Link>
            <p>Her kan du se alle artiklene på siden.</p>

            <Link className='link' to='/admin/make-article/' >
                Lag nye artikler.
            </Link>
            <p>Her kan du lage nye artikler.</p>

            <Link className='link' to='/admin/page-settings/' >
                Sideinnstillinger.
            </Link>
            <p>Her kan du endre innstillinger for siden.</p>

            <Link className='link' to='/admin/create/' >
                Nytt verktøy.
            </Link>
            <p><strong><i>BETA</i></strong> Nytt verktøy for å lage artikler.</p>

            <p className='logout' onClick={() => logout(history, '/')}>
                Logg ut!
            </p>
        </div>
    );
};


/***** EXPORTS *****/
export default withRouter(Admin);
