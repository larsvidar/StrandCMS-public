/***** IMPORTS *****/
import React, {useContext} from 'react';
import {IArticle, IBaseProps} from '../../../../interfaces/IGeneral';
import {Link} from 'react-router-dom';
import styles from './LastPosts.module.scss';
import {AppContext} from '../../../../Handler/Handler';


/***** COMPONENT-FUNCTION *****/
const LastPosts = ({className}: IBaseProps) => {

    const context = useContext(AppContext);
    const {state} = context || {};
    const {articles} = state || {};

    const lastPostsClass = className
        ? styles.lastPosts + ' ' + className
        : styles.LastPosts;


    /*** Return-statement ***/
    return(
        <div className={lastPostsClass} >
            <h1>Siste innlegg</h1>
            {Array.isArray(articles) && articles?.map((article: IArticle, index: number) => (
                 <Link key={index} to={`/news/${article.slug}/`}>
                        <p>{article.title}</p>
                    </Link>
                
            ))}
        </div>
    );
};


/***** EXPORTS *****/
export default LastPosts;
