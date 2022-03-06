/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { IHistory } from '../../interfaces/IGeneral';
import { Title2 } from '../../styles/general';
import { logout } from '../../Handler/actions/authActions';


/***** STYLES *****/
const AdminStyle = styled.div`
    padding: 1em 2em;
    display: flex;
    flex-direction: column;

    ${Title2} {
        margin-bottom: 1em;
    }

    .link {
        font-size: 1.2em;
        cursor: pointer;
        margin-bottom: .3em;
        text-decoration: underline;
    }

    p {
        margin-bottom: 2em;
    }

    .logout {
        cursor: pointer;
    }
`;


/***** INTERFACES *****/
interface IadminProps extends IHistory {}


/***** COMPONENT-FUNCTION *****/
const Admin = ({history}: IadminProps) => {


    /*** Return-statement ***/
    return(
        <AdminStyle>
            <Title2>Adminpanel</Title2>

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

            <p className='logout' onClick={() => logout(history, '/')}>
                Logg ut!
            </p>
        </AdminStyle>
    );
}


/***** EXPORTS *****/
export default withRouter(Admin);
