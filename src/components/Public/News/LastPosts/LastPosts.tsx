/***** IMPORTS *****/
import React, {useContext} from 'react';
import {IArticle, IHistory, IBaseProps} from '../../../../interfaces/IGeneral';
import {Link, withRouter} from 'react-router-dom';
import styles from './LastPosts.module.scss';
import {AppContext} from '../../../../Handler/Handler';


/***** INTERFACES *****/
interface ILastPostsProps extends IHistory, IBaseProps {}


/***** COMPONENT-FUNCTION *****/
const LastPosts = ({className}: ILastPostsProps) => {

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
export default withRouter(LastPosts);
