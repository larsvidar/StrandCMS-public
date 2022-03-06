/***** IMPORTS *****/
import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
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
        {/* Test (only available in development-mode) */}
        {isDevelopment && 
          <Route 
            path='/test/'
            exact
            component={Test}
          />
        }
        
        {/* Public-content */}
        <Route 
          path={'/'}
          exact
          render={() => <Public />}
        />

        {/* News */}
        <Route 
          path={'/news'} 
          exact
          render={() => <ArticleList />} 
        />

        <Route 
          path={'/news/:article'} 
          exact
          render={() => <DisplayModule />} 
        />

        {/* Login */}
        <Route 
          path={'/login'} 
          exact
          render={() => <Login />} 
        />

        {/* Admin-panel */}
        <Route 
          path='/admin' 
          render={() =>
              <AdminProvider>
                  <Authorize> 
                      <AdminPage />
                  </Authorize>
              </AdminProvider>
          } 
        />
      </Main>
    </BrowserRouter>
  );
};


/***** EXPORTS *****/
export default App;
