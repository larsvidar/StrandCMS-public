/***** IMPORTS *****/
import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import AdminPage from './components/Admin/Admin';
import AdminProvider from './components/Admin/AdminWrapper/AdminProvider';
import Authorize from './components/Admin/Authorize/Authorize';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import DisplayModule from './components/Public/DisplayModule/DisplayModule';
import ArticleList from './components/Public/News/ArticleList/ArticleList';
import Public from './components/Public/Public';
import Test from './Test/Test';


/***** COMPONENT-FUNCTION *****/
const App: React.FC = () => {

  /*** Variables ***/
  const isDevelopment = process.env.NODE_ENV !== 'production';


  /*** Return-statement ***/
  return (
    <BrowserRouter>
		<Main>
			<Routes>
				{/* Test (only available in development-mode) */}
				{isDevelopment &&
					<Route path='/test/' element={<Test />} />
				}
				
				{/* Public-content */}
				<Route path='/' element={<Public />} />

				{/* News */}
				<Route path={'/news'} element={<ArticleList /> } />

				<Route path={'/news/:article'} element={<DisplayModule />} />

				{/* Login */}
				<Route path={'/login'} element={<Login />} />

				{/* Admin-panel */}
				<Route path='/admin' element={
					<AdminProvider>
						<Authorize> 
							<AdminPage />
						</Authorize>
					</AdminProvider>
				} />
			</Routes>
		</Main>
    </BrowserRouter>
  );
};


/***** EXPORTS *****/
export default App;
