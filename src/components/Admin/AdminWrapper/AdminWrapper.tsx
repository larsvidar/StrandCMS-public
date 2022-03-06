/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import AdminMenu from './AdminMenu';


/***** STYLES *****/
const AdminWrapperStyle = styled.div`
    display: flex;
`;


/***** INTERFACES *****/
interface IAdminWrapperProps {
    children: any,
};


/***** COMPONENT-FUNCTION *****/
const AdminWrapper = ({children}: IAdminWrapperProps) => {

    /*** Return-statement ***/
    return (
        <AdminWrapperStyle>
            <AdminMenu />
            <div className='content'>
                {children}
            </div>
        </AdminWrapperStyle>
    );
}


/***** EXPORTS *****/
export default AdminWrapper;
