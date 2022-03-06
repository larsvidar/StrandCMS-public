/***** IMPORTS *****/
import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import PublicWrapper from './Main/PublicWrapper/PublicWrapper';
import {IHistory} from '../interfaces/IGeneral';
import News from './News/News';
import Page from './Pages/Page';
import Article from './News/Article';
import AdminProvider from './Admin/AdminWrapper/AdminProvider';
import Authorize from './Admin/AdminWrapper/Authorize';
import AdminPage from './Admin/AdminPage';
import Login from './Admin/Login';


/***** INTERFACES *****/
interface IPublicSiteProps extends IHistory {}


/***** COMPONENT-FUNCTION *****/
const PublicSite = () => {
    

    /*** Return-statement ***/
    return <>
        <Route 
            path={'/page/:page/'} 
            exact
            render={() => <>
                <PublicWrapper hero={false} latest={true}>
                    <Page />
                </PublicWrapper>
            </>} 
        />

        <Route 
            path={'/news/'} 
            exact
            render={() => <News />} 
        />

        <Route 
            path={'/news/:article/'} 
            exact
            render={() => <>
                <PublicWrapper hero={false} latest={true}>
                    <Article />
                </PublicWrapper>
            </>} 
        />

        <Route 
            path={'/login/'} 
            exact
            render={() => <Login />} 
        />

        <Route 
            path='/admin/' 
            render={() =>
                <AdminProvider>
                    <Authorize> 
                        <AdminPage />
                    </Authorize>
                </AdminProvider>
            } 
        />

    </>;
}


/***** EXPORTS *****/
export default withRouter(PublicSite);
