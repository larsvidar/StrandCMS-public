/***** IMPORTS *****/
import React from 'react';
import EmailSettings from './EmailSettings';
import SiteSettings from './SiteSettings';
import {Route} from 'react-router-dom';
import ItemsAdmin from './ItemsAdmin';
import ItemEditor from './ItemEditor';
import EditMenu from './EditMenu';
import Admin from './Admin';


/***** COMPONENT-FUNCTION *****/
const AdminPage = () => {
    
    /*** Return-statement ***/
    return <>

        <Route 
            path='/admin/' 
            exact
            component={Admin} 
        />

        <Route 
            path='/admin/article-list/'
            exact
            component={ItemsAdmin} 
        />

        <Route 
            path='/admin/pages-list/'
            exact
            render={() => <ItemsAdmin articleMode={false} />} 
        />

        <Route
            path='/admin/article-list/edit-article/:article'
            exact
            render={() => <ItemEditor editMode={true} />} 
        />

        <Route
            path='/admin/pages-list/edit-page/:page'
            exact
            render={() => <ItemEditor editMode={true} articleMode={false} />} 
        />

        <Route 
            path='/admin/make-article/' 
            exact
            component={ItemEditor} 
        />

        <Route 
            path='/admin/make-pages/' 
            exact
            render={() => <ItemEditor articleMode={false} />} 
        />

        <Route 
            path='/admin/edit-menu/' 
            exact
            component={EditMenu} 
        />    

        <Route 
            path='/admin/page-settings/' 
            exact
            component={SiteSettings} 
        />

        <Route 
            path='/admin/email-settings/' 
            exact
            component={EmailSettings} 
        />

    </>;
}


/***** EXPORTS *****/
export default AdminPage;
