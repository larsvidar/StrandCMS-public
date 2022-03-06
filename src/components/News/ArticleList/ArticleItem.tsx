/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { IArticle, IBaseProps } from '../../../interfaces/IGeneral';
import { formatDate } from '../../../Handler/actions/actions';
//@ts-ignore
import {Link} from 'react-router-dom';
import {ResponsiveEmbed} from 'react-bootstrap';


/***** STYLES *****/
const ArticleItemStyle = styled.div`
    display: grid;
    grid-template-columns: 3fr 4fr;
    grid-gap: 2em;

    .thumbnail {
        background: #eee;
        border-radius: 8px;
        overflow: hidden;
        object-fit: cover;
    }

    .front-article {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h2 {
            font-size: 2em;
            margin-bottom: .4em;
            letter-spacing: .7px;
        }

        .byline {
            display: flex;
            margin-bottom: 1.5em;

            .author, .date {
                font-size: .9em;
                font-style: italic;
                color: #aaa;
                margin-bottom: .6em;

                span {
                    text-transform: capitalize;
                }
            }

            .author {
                margin-right: 1em;

                &::after {
                    content: '|';
                    margin-left: 1em;
                }
            }
        }

        .lead {
            font-size: 1.2em;
            margin-bottom: 2em;
            line-height: 1.5em;
            letter-spacing: .6px;
        }

        .read-more {
            color: #888;
        }
    }

    @media(max-width: 1300px) {
        .thumbnail {
            /* height: 300px; */
        }
    }

    @media(max-width: 1100px) {
        .thumbnail {
            /* height: 250px; */
        }

        .front-article {

            h2 {
                font-size: 1.5em;
                margin-bottom: .2em;
            }

            .byline {
                flex-direction: column;
                margin-bottom: 1em;

                .date {
                    display: none;
                }

                .author {
                    &::after {
                        display: none;
                    }
                }
            }

            .lead {
                font-size: 1em;
                margin-bottom: 1em;
            }
        }
    }

    @media(max-width: 1000px) {
        grid-template-columns: 1fr;
        grid-gap: 1em;

        .thumbnail {
            height: 400px;
        }

        .front-article {

            h2 {
                font-size: 1.8em;
            }

        }
    }

    @media(max-width: 700px) {
        .thumbnail {
            height: 300px;
        }
    }


    @media(max-width: 600px) {
        .thumbnail {
            height: 250px;
        }
    }


    @media(max-width: 500px) {
        grid-gap: .5em;

        .thumbnail {
            height: 50vw;
        }

        .front-article {
            h2 {
                font-size: 5vw;
            }

            .byline {
                margin-bottom: .1em;

                .author {
                    font-size: 2.8vw;
                }
            }

            .lead {
                font-size: 3vw;
            }

            .read-more {
                font-size: 3.1vw;
                margin-bottom: .2em;
            }

        }

    }
`;


/***** INTERFACES *****/
interface IArticleItemProps extends IBaseProps {
    article: IArticle,
}


/***** COMPONENT-FUNCTION *****/
const ArticleItem = ({article, className}: IArticleItemProps) => {

    /*** Return-statement ***/
    return(
        <ArticleItemStyle className={className} >
            <Link to={`/news/${article.slug}`}>
                <ResponsiveEmbed aspectRatio="16by9">
                    {article?.image
                        ? <img
                                className='thumbnail'
                                src={article?.image} 
                                alt={article?.caption || article.title}
                            />
                        : <div className='thumbnail' />
                    }
                </ResponsiveEmbed>
            </Link>
            <div className='front-article'>
                <div>
                    <Link to={`/news/${article.slug}/`}>
                        <h2>{article.title}</h2>
                    </Link>
                    <div className='byline'>
                        <p className='author'>Skrevet av: <span>
                                {article.author || 'Styret'}
                            </span>
                        </p>
                        <p className='date'>{formatDate(+article.created)}</p>
                    </div>
                
                    <p className='lead'>{article.lead}</p>
                </div>
                <Link className='read-more' to={`/news/${article.slug}/`}>Les mer...</Link>
            </div>
        </ArticleItemStyle>
    );
}


/***** EXPORTS *****/
export default ArticleItem;
