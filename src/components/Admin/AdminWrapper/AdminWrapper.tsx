/***** IMPORTS *****/
import React from 'react';
import styles from './AdminWrapper.module.scss';
import AdminMenu from '../AdminMenu/AdminMenu';


/***** INTERFACES *****/
interface IAdminWrapperProps {
    children: any,
}


/***** COMPONENT-FUNCTION *****/
const AdminWrapper = ({children}: IAdminWrapperProps) => {

    /*** Return-statement ***/
    return (
        <div className={styles.AdminWrapper}>
            <AdminMenu />
            <div className={styles.pageContent}>
                {children}
            </div>
        </div>
    );
};


/***** EXPORTS *****/
export default AdminWrapper;
