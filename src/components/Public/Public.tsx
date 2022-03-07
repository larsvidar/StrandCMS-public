/***** IMPORTS *****/
import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import Page from './Pages/Page';
import FrontPage from './FrontPage/FrontPage';


/***** COMPONENT-FUNCTION *****/
const PublicSite: FC = () => {
    
    /*** Return-statement ***/
    return(
		<Routes>

			{/* FrontPage */}
			<Route path={'/'} element={<FrontPage />} />


			{/* Pages */}
			<Route path={'/page/:page'} element={<Page />} />
		</Routes>
	);
};


/***** EXPORTS *****/
export default PublicSite;
