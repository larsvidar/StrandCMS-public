/***** IMPORTS *****/
import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Main from './components/Main/Main';
import PublicWrapper from './components/Main/PublicWrapper/PublicWrapper';
import ArticleList from './components/News/ArticleList/ArticleList';
import PublicSite from './components/PublicSite';

import Test from './Test/Test';



/***** COMPONENT-FUNCTION *****/
const App: React.FC = () => {

  /*** Variables ***/
  const isDevelopment = process.env.NODE_ENV !== 'production';


  /*** Return-statement ***/
  return (
    <BrowserRouter>
      <Main>
        <Switch>

          {isDevelopment && 
            <Route 
              path='/test/'
              exact
              component={Test}
            />
          }

          <Route 
            path='/'
            exact
            render={() =>
              <PublicWrapper>
                <ArticleList />
              </PublicWrapper>
            }
          />

          <Route 
            path='/:section/' 
            render={() => <>
              <PublicSite />
            </>} 
          />

        </Switch>
      </Main>
    </BrowserRouter>
  );
}


/***** EXPORTS *****/
export default App;
