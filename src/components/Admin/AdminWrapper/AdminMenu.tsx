/***** IMPORTS *****/
import React, { useContext } from 'react';
import styled from 'styled-components';
import { BaseClass } from '../../../styles/general';
import { Link, withRouter } from 'react-router-dom';
import { IHistory } from '../../../interfaces/IGeneral';
import { AppContext } from '../../../Handler/Handler';
import { logout } from '../../../Handler/actions/authActions';


/***** STYLRS *****/
const AdminMenuStyles = styled(BaseClass)`
    display: inline-flex;
    background: ${props => props.theme.secondaryColor};
    min-height: 100%;
    padding-bottom: 2em;

    p, a {
        color: ${props => props.theme.secondaryText};
        font-size: 1.2em;
    }

    .menu-list {
        list-style: none;
        padding-top: 2em;

            li {
                padding: 1em 1.5em;
                cursor: pointer;

            &:hover {
                backdrop-filter: brightness(1.5);
            }
        }
    }
`;


/***** INTERFACES *****/
interface IAdminMenuProps extends IHistory {}


/***** COMPONENT-FUNCTION *****/
const AdminMenu = ({history}: IAdminMenuProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    

    /*** Return-statement ***/
    return(
        <AdminMenuStyles theme={theme}>
            <ul className='menu-list'>
                <Link to='/admin/'><li>Admin</li></Link>
                <Link to='/admin/article-list/'><li>Artikler</li></Link>
                {/* <Link to='/admin/make-article/'><li>Lag ny artikkel</li></Link> */}
                <Link to='/admin/pages-list/'><li>Sider</li></Link>
                {/* <Link to='/admin/make-pages/'><li>Lag ny side</li></Link> */}
                {/* <Link to='/admin/edit-menu/'><li>Rediger meny</li></Link> */}
                <Link to='/admin/page-settings/'><li>Nettsideinnstillinger</li></Link>
                {/* <Link to='/admin/email-settings/'><li>E-post innstillinger</li></Link> */}
                <p onClick={() => logout(history, '/')}><li>Logg ut</li></p>
            </ul>
        </AdminMenuStyles>
    );
}


/***** EXPORTS *****/
export default withRouter(AdminMenu);
