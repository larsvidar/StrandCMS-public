/***** IMPORTS *****/
import React, { useEffect, useState } from 'react';
import styles from './ArticleItem.module.scss';
import { genObject, IBaseProps } from '../../../../../interfaces/IGeneral';
import { formatDate } from '../../../../../Handler/actions/actions';
import {Link} from 'react-router-dom';
import {ResponsiveEmbed} from 'react-bootstrap';


/***** INTERFACES *****/
interface IArticleItemProps extends IBaseProps {
    article: any,
}


/***** COMPONENT-FUNCTION *****/
const ArticleItem = ({article, className}: IArticleItemProps) => {

    const articleItemClass = className
        ? styles.ArticleItem + ' ' + className
        : styles.ArticleItem;


    const [title, setTitle] = useState('');
    const [lead, setLead] = useState('');
    const [thumbnail, setThumbnail] = useState<genObject>({});

    //Runs when 
    // -
    useEffect(() => {
        if(article) {
            const modules = article.modules || [];
            modules.forEach((thisModule: any) => {
                switch(thisModule.title) {
                    case 'Title': {
                        setTitle(thisModule.value);
                        break;
                    }
                    case 'Lead': {
                        setLead(thisModule.value);
                        break;
                    }
                    case 'Image': {
                        setThumbnail(thisModule.value);
                        break;
                    }
                }
            });
        }
    }, [article]);


    /*** Return-statement ***/
    return(
        <div className={articleItemClass} >
            <Link to={`/news/${article.slug}`}>
                <ResponsiveEmbed aspectRatio="16by9">
                    {thumbnail.file
                        ?   <img
                                className={styles.thumbnail}
                                src={thumbnail?.file} 
                                alt={thumbnail?.caption || article.title}
                            />
                        :   <div className={styles.thumbnail} />
                    }
                </ResponsiveEmbed>
            </Link>
            <div className={styles.frontArticle}>
                <div>
                    <Link to={`/news/${article.slug}/`}>
                        <h2>{title}</h2>
                    </Link>
                    <div className={styles.byline}>
                        <p className={styles.author}>Skrevet av: <span>
                                {article.author || 'Styret'}
                            </span>
                        </p>
                        <p className={styles.date}>{formatDate(+article.created)}</p>
                    </div>
                
                    <p className={styles.lead}>{lead}</p>
                </div>
                <Link className={styles.readMore} to={`/news/${article.slug}/`}>Les mer...</Link>
            </div>
        </div>
    );
};


/***** EXPORTS *****/
export default ArticleItem;
