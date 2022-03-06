/***** IMPORTS *****/
import React, { useContext, useEffect, useState } from 'react';
import { genObject, IHistory } from '../../interfaces/IGeneral';
import { formatDate } from '../../Handler/actions/actions';
import ShowLoader from '../utils/ShowLoader/ShowLoader';
import { AppContext } from '../../Handler/Handler';
import { withRouter } from 'react-router-dom';
import {Title2} from '../../styles/general';
import styled from 'styled-components';
import ContactForm from '../utils/ContactForm/ContactForm';


/***** STYLES *****/
const ArticleStyle = styled.div`
    
    .article {
        display: flex;
        flex-direction: column;
        margin: 1em 1em 1em 0;

        h2 {
            margin-bottom: 1em;
        }

        h3 {
            margin-bottom: 1em;
        }

        .byline {
            display: flex;

            .author, .date {
                font-size: .9em;
                font-style: italic;
                color: #888;
                margin-bottom: .5em;

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

        img {
            margin: 1.5em auto;
            object-fit: cover;
            width: 100%;
            height: 30vw;
            border: solid 3px #888;
            border-radius: 5px;
        }

        ul {
            list-style-position: inside;
        }

        .text {
            display: grid;

            p {
                margin-bottom: 1em;
                font-size: 1.1em;
            }

            a {
                color: ${props => props.theme.linkColor};
                text-decoration: ${props => props.theme.linkUnderline ? 'underline' : 'none'};
            }

        }
    }
`;


/***** INTERFACES *****/
interface IArticleProps extends IHistory {};


/***** COMPONENT-FUNCTION *****/
const Article = ({match}: IArticleProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {articles, settings} = state || {};
    const {theme} = settings || {};
    const {linkColor, linkUnderline} = theme || {};

    
    /*** State ***/
    const [article, setArticle]: any = useState({});
    //const [image, setImage] = useState('');
    const [doShowLoader, setDoShowLoader] = useState(true);
    const [slug, setSlug] = useState(match.params.article);


    /*** Effects ***/
    useEffect(() => {
        if(match.params.article) setSlug(match.params.article);
    }, [match.params.article]);


    useEffect(() => {
        if(articles) {
            const slugArticle = articles.filter((item: genObject) => item.slug === slug);
            setArticle(slugArticle[0]);
            setDoShowLoader(false);
        }
    //eslint-disable-next-line
    }, [articles, slug]);

    useEffect(() => {
        if(article && article.image) {
            //setImage(article.image);
        }
    }, [article]);


    const articleText = article ? {__html: article.article} : null;

    /*** Return-statement ***/
    if(doShowLoader) return <ShowLoader />
    return article?.title
        ?   <ArticleStyle theme={{linkColor, linkUnderline}}>
                <div className='article'>
                    <Title2>{article.title}</Title2>
                    <h3>{article.lead}</h3>
                    <div className='byline'>
                        <p className='author'>Skrevet av: 
                            <span>{article.author ? article.author : 'Styret'}</span>
                        </p>
                        <p className='date'>{formatDate(+article.created)}</p>
                    </div>
                    
                    {/* image && <FixedImage src={image} className='image' /> */}
                    {articleText && <div className='text' dangerouslySetInnerHTML={articleText} />}
                </div>
                {article.contact && article.contact !== 'none' &&
                    <ContactForm test={false} mode={article.contact} />
                }
            </ArticleStyle>
        :   <p>Ingen artikler funnet...</p>
 
}


/***** EXPORTS *****/
export default withRouter(Article);
