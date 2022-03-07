/***** IMPORTS *****/
import React from 'react';
import EmailSettings from './EmailSettings/EmailSettings';
import SiteSettings from './SiteSettings/SiteSettings';
import {Route, Routes} from 'react-router-dom';
import ItemsAdmin from './ItemsAdmin/ItemsAdmin';
import ItemEditor from './ItemEditor/ItemEditor';
import EditMenu from './EditMenu';
import AdminPage from './AdminPage/AdminPage';
import CreatePage from './CreatePage/CreatePage';


/***** COMPONENT-FUNCTION *****/
const Admin = () => {
    
    /*** Return-statement ***/
    return <Routes>

        <Route path='/admin/' element={<AdminPage />} />

        <Route path='/admin/article-list/' element={<ItemsAdmin />} />

        <Route path='/admin/pages-list/' element={<ItemsAdmin articleMode={false} />} />

        <Route path='/admin/article-list/edit-article/:article' element={<ItemEditor editMode={true} />} />

        <Route path='/admin/pages-list/edit-page/:page' element={<ItemEditor editMode={true} articleMode={false} />} />

        <Route path='/admin/make-article/' element={<ItemEditor />} />

        <Route path='/admin/create/' element={<CreatePage />} />

        <Route path='/admin/make-pages/' element={<ItemEditor articleMode={false} />} />

        <Route path='/admin/edit-menu/' element={<EditMenu />} />

        <Route path='/admin/page-settings/' element={<SiteSettings />} />

        <Route path='/admin/email-settings/' element={<EmailSettings />} />

    </Routes>;
};


/***** EXPORTS *****/
export default Admin;
