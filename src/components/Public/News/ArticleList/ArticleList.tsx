/***** IMPORTS *****/
import React, {FC, useContext} from 'react';
import styles from './ArticleList.module.scss';
import ArticleItem from './ArticleItem/ArticleItem';
import {IArticle} from '../../../../interfaces/IGeneral';
import { AppContext } from '../../../../Handler/Handler';


/***** COMPONENT-FUNCTION *****/
const ArticleList: FC = (): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {articles} = state || {};


    /*** Return-statement ***/
    return(
        <div className={styles.ArticleList}>
            {articles?.length
                ?   articles.map((article: IArticle, index: number) => (
                        <div key={index}>
                            <ArticleItem 
                                className={styles.article} 
                                article={article} 
                            />
                            <hr />
                        </div>
                    ))
                :   <p>Ingen artikler funnet...</p> 
            }
        </div>
    );
};


/***** EXPORTS *****/
export default ArticleList;
