/***** IMPORTS *****/
import React, {useContext} from 'react';
import {IArticle, IHistory, IBaseProps} from '../../../interfaces/IGeneral';
import {AppContext} from '../../../Handler/Handler';
import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';


/***** STYLES *****/
const LastPostsStyle = styled.div`
    max-width: 500px;

    margin-bottom: 1em;
    height: auto;
    border: solid 1px #ddd;
    margin-top: 1em;
    padding: 1em;

    h1 {
        color: #666;
        margin-bottom: 1em;
        letter-spacing: .7px;
    }

    p {
        color: #888;
        margin-bottom: 1.2em;
        font-size: 1em;
        font-weight: 100;
        letter-spacing: .7px;
    }

    /*** MEDIA QUERIES ***/
    @media(max-width: 300px) {
        h1 {
            font-size: 8vw;
        }

        p {
            font-size: 6vw;
        }  
    }
`;


/***** INTERFACES *****/
interface ILastPostsProps extends IHistory, IBaseProps {};


/***** COMPONENT-FUNCTION *****/
const LastPosts = ({className}: ILastPostsProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {articles} = state || {};


    /*** Return-statement ***/
    return(
        <LastPostsStyle className={className} >
            <h1>Siste innlegg</h1>
            {articles?.map((article: IArticle, index: number) => (
                 <Link key={index} to={`/news/${article.slug}/`}>
                        <p>{article.title}</p>
                    </Link>
                
            ))}
        </LastPostsStyle>
    );
}


/***** EXPORTS *****/
export default withRouter(LastPosts);
