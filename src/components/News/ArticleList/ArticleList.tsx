/***** IMPORTS *****/
import React, {FC, useContext} from 'react';
import styled from 'styled-components';
import ArticleItem from './ArticleItem';
import {AppContext} from '../../../Handler/Handler';
import {IArticle} from '../../../interfaces/IGeneral';


/***** STYLES *****/
const ArticleListStyle = styled.div`
        margin: 1em 0;

        .article {
            margin: 1.5em 0;
        }

        hr {
            border: solid 1px #eee;
        }
`;


/***** INTERFACES *****/
interface IArticlesProps {};


/***** COMPONENT-FUNCTION *****/
const ArticleList: FC = (): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {articles} = state || {};

    /*** Return-statement ***/
    return(
        <ArticleListStyle>
            {articles?.length
                ?   articles.map((article: IArticle, index: number) => (
                        <div key={index}>
                            <ArticleItem 
                                className='article' 
                                article={article} 
                            />
                            <hr />
                        </div>
                    ))
                :   <p>Ingen artikler funnet...</p> 
            }
        </ArticleListStyle>
    );
}


/***** EXPORTS *****/
export default ArticleList;
