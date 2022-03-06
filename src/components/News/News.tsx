/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import ArticleList from './ArticleList/ArticleList';
import { Route, withRouter, Switch } from 'react-router-dom';
import PublicWrapper from '../Main/PublicWrapper/PublicWrapper';
import Article from './Article';
import { IHistory } from '../../interfaces/IGeneral';

/***** STYLES *****/
const NewsStyle = styled.div`
        margin-bottom: 1em;
`;


/***** INTERFACES *****/
interface INewsProps extends IHistory {};


/***** COMPONENT-FUNCTION *****/
const News = ({match}: INewsProps) => {

    const isNews = match.path === '/news/' && match.isExact;
    
    /*** Return-statement ***/
    return(
        <NewsStyle>
            {isNews &&
                <PublicWrapper hero={false}>
                    <ArticleList />
                </PublicWrapper>
            }

            <Switch>
            <Route 
                path={match.path + ':article'}
                exact
                render={() => <>
                    <PublicWrapper hero={false}>
                        <Article />
                    </PublicWrapper>
                </>}
            />
            </Switch>
            
        </NewsStyle>
    );
}


/***** EXPORTS *****/
export default withRouter(News);
