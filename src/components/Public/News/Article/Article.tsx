/***** IMPORTS *****/
import React, {useContext, useEffect, useRef, useState} from 'react';
import {IArticle, IHistory} from '../../../../interfaces/IGeneral';
import {formatDate} from '../../../../Handler/actions/actions';
import ShowLoader from '../../../utils/ShowLoader/ShowLoader';
import {AppContext} from '../../../../Handler/Handler';
import styles from './Article.module.scss';
import ContactForm from '../../../utils/ContactForm/ContactForm';
import {setTheme} from '../../../../Handler/actions/sActions';


/***** COMPONENT-FUNCTION *****/
const Article = ({match}: IHistory) => {

    /*** Variables ***/
    const articleRef = useRef(null);

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings, articles} = state || {};
    const {theme} = settings || {};

    
    /*** State ***/
    const [article, setArticle] = useState({} as IArticle);
    //const [image, setImage] = useState('');
    const [doShowLoader, setDoShowLoader] = useState(true);
    const [slug, setSlug] = useState(match.params.article);


    /*** Effects ***/
    useEffect(() => {
        if(match.params.article) setSlug(match.params.article);
    }, [match.params.article]);


    useEffect(() => {
        if(articles) {
            const slugArticle = articles.filter((item) => item.slug === slug);
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


    useEffect(() => {
        if(theme && article?.title) {
            setTheme(theme, articleRef);
        }
    //eslint-disable-next-line
    }, [theme, article]);


    const articleText = article ? {__html: article.article} : null;

    /*** Return-statement ***/
    if(doShowLoader) return <ShowLoader />;
    return article?.title
        ?   <div className={styles.Article} ref={articleRef}>
                <h2>{article.title}</h2>
                <h3>{article.lead}</h3>
                <div className={styles.byline}>
                    <p className={styles.author}>Skrevet av: 
                        <span> {article.author ? article.author : 'Admin'}</span>
                    </p>
                    <p className={styles.date}>{formatDate(+article.created)}</p>
                </div>
                
                {/* image && <FixedImage src={image} className='image' /> */}
                {articleText && <div className={styles.text} dangerouslySetInnerHTML={articleText} />}
                {article?.contact !== 'none' &&
                    <ContactForm test={false} mode={article.contact} />
                }
            </div>
        :   <p>Ingen artikler funnet...</p>;
 
};


/***** EXPORTS *****/
export default Article;
