/***** IMPORTS *****/
import React, {FC} from 'react';
import {Route} from 'react-router-dom';
import Page from './Pages/Page';
import FrontPage from './FrontPage/FrontPage';


/***** COMPONENT-FUNCTION *****/
const PublicSite: FC = () => {
    
    /*** Return-statement ***/
    return <>

        {/* FrontPage */}
        <Route 
            path={'/'} 
            exact
            render={() => <FrontPage />} 
        />


        {/* Pages */}
        <Route 
            path={'/page/:page'} 
            exact
            render={() => <>
                <Page />
            </>} 
        />
    </>;
};


/***** EXPORTS *****/
export default PublicSite;
