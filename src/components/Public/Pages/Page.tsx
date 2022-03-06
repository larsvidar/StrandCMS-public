/***** IMPORTS *****/
import React, {useEffect, useState, useContext} from 'react';
import {IHistory, genObject} from '../../../interfaces/IGeneral';
import {AppContext} from '../../../Handler/Handler';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import ContactForm from '../../utils/ContactForm/ContactForm';


/***** STYLES *****/
const PageStyles = styled.div`
        
    margin: 1em;

    h1 {
        margin-bottom: .7em;
    }

    .article {
        margin-bottom: 1em;

        p {
            margin-bottom: 1em
        }

        a {
            color: ${props => props.theme.linkColor};
            text-decoration: ${props => props.theme.linkUnderline ? 'underline' : 'none'};
        }
    }


    ul {
        margin: 0 0 1.2em .6em;

        li {
            margin-bottom: .3em;
        }
    }

    table {

        td {
            padding: 10px 15px;
            vertical-align: top;

            img {

            }
        }

    }
`;


/***** COMPONENT-FUNCTION *****/
const Page = ({match}: IHistory) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {pages, settings} = state || {};
    const {theme} = settings || {};
    const {linkColor, linkUnderline} = theme || {};
    

    /*** State ***/
    const [page, setPage] = useState<genObject>({});
    const [thisHtml, setThisHtml] = useState({__html: ''});
    const [slug, setSlug] = useState<string>(match.params.page);


    /*** Effects ***/
    useEffect(() => {
        if(match.params.page) setSlug(match.params.page);
    }, [match.params.page]);


    useEffect(() => {
        //Get pages from back-end.
        if(pages) {
            const thisPage: genObject = pages.filter((page: genObject) => page.slug === slug)[0];
            if(thisPage) setPage(thisPage);
        }
    //eslint-disable-next-line
    }, [slug, pages]);


    useEffect(() => {
        if(page && page.article) {
            setThisHtml({__html: page.article});
        }
    }, [page]);


    /*** Return-statement ***/
    if(!page || !page.title) return <p>No page found...</p>;
    return(
        <PageStyles theme={{linkColor, linkUnderline}}>
            <h1>{page.title}</h1>
            <div className='article' dangerouslySetInnerHTML={thisHtml} />
            {page.contact && page.contact !== 'none' &&
                <ContactForm test={false} mode={page.contact} />
            }
            
        </PageStyles>
    );
};


/***** EXPORTS *****/
export default withRouter(Page);
