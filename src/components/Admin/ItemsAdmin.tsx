/***** IMPORTS *****/
import React, {useContext, useState} from 'react';
import {updateArticle, handleDeleteArticle} from '../../Handler/actions/articlesActions';
import {genObject, IArticle, IHistory} from '../../interfaces/IGeneral';
import {handleDeletePage} from '../../Handler/actions/pagesAction';
import {isError, formatDate} from '../../Handler/actions/actions';
import {AdminContext} from './AdminWrapper/AdminProvider';
import KebabMenu from '../utils/KebabMenu/KebabMenu';
import {AppContext} from '../../Handler/Handler';
import {withRouter, Link} from 'react-router-dom';
import {Title2 } from '../../styles/general';
import styled from 'styled-components';


/***** STYLES *****/
const ItemsAdminStyle = styled.div`
    padding: 1em 0 1em 4em;
    max-width: 1060px;

    ${Title2} {
        margin-bottom: 1em;
    }

    .checkbox-menu {
        display: flex;
        list-style: none;
        margin-bottom: .5em;
        text-decoration: underline;

        li {
            margin-right: .5em;
            cursor: pointer;
        }
    }

    .article-list {
        list-style: none;
        border: solid 1px #aaa;
        margin-bottom: 1.5em;

        .legends {
            padding: 1em 1em;
            color: white;
            background: ${props => props.theme.secondaryColor};
        }

        li {
            display: grid;
            grid-template-columns: 1fr 8fr 3fr 4fr 3fr 1fr;
            align-content: center;
            justify-items: start;
            padding: 1em;
            border-bottom: solid 1px #aaa;

            input[type='checkbox'] {
                margin-right: 1em;
                align-self: center;
            }

            a {
                display: grid;
                
                .article-title {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    font-weight: 100;
                    align-self: center;
                    max-width: 100%;
                    padding-right: .5em;
                }
            }

            p {
                align-self: center;
                color: #888;
                font-size: .9em;
            }
        }

        .page-li {
            grid-template-columns: 2fr 20fr 1fr;
        }
    }

    .new-button {
        border: solid 1px #aaa;
        border-radius: 5px;
        background: #5566aa;
        color: white;
        padding: 10px 15px;
        cursor: pointer;
        
        &:hover {
            background: #7788cc;
        }
    }
`;


/***** INTERFACES *****/
interface IItemsAdminProps extends IHistory {
    articleMode?: boolean,
};


/***** COMPONENT-FUNCTION *****/
const ItemsAdmin = ({articleMode=true, history}: IItemsAdminProps) => {

    /*** Variables ***/
    const actionMenu: Array<string> = articleMode
        ?   [
                'Rediger',
                'Slett',
                'Publiser',
                'Avpubliser',
            ]
        :   [
                'Rediger',
                'Slett',
            ];

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state;
    const {setMessage} = actions;

    /* Admin-context */
    const adminContext = useContext(AdminContext);
    const {adminState, adminActions} = adminContext || {};
    const {allArticles, allPages} = adminState || {};
    const {setAllArticles, setAllPages} = adminActions || {};

    
    /*** State ***/
    //Array of id of marked articles.
    const [checkedItems, setCheckedItems]: any = useState([]);


    /*** Functions ***/

    /**
     * EVENT: Handle click on article-checkbox.
     * @param {Event} event Event-object.
     * @param {string} articleId The id of checked article.
     * @return {void} Push or remove article-id from state.
     */
    const handleCheckedItem = (event: any, itemId: string) => {
        event.persist();
        //Check if checkbox was checked or unchecked.
        const isChecked = event.target.checked;

        //If it was checked, push article-id to checkedItems...
        if(isChecked) {
            setCheckedItems([...checkedItems, [itemId, event.target]]);
        
        //...else remove article-id form checkedItems-array. 
        } else {
            const newCheckedItems: Array<any> = checkedItems
                .filter((item: Array<any>) => {
                    return item[0] !== itemId;
                });
            
            setCheckedItems(newCheckedItems);
        }
    }


    /**
     * EVENT: Handles click on action-menu-items.
     * @param {number} index Index-number of chosen menu-item.
     * @param {string} id Article-id who menu belongs to.
     * @return {Promise<void>} 
     *  - Promise (because async) theat resolves to nothing.
     */
    const handleActionClick = async (
        index: number, id: Array<any>
    ): Promise<void> => {

        //Make array of ids
        const idArray = id.map((item: Array<any>) => item[0]);

        //Find selected article.
        const selectedArticles = allArticles
            .filter((article: genObject) => idArray.includes(article.id));

        const selectedPages = allPages
            .filter((page: genObject) => idArray.includes(page.id));
        
  
        //Utfør handling
        switch(index) {
            default: articleMode ? editArticle(selectedArticles) : editPage(selectedPages);
                break;
            case 1: articleMode ? deleteArticle(selectedArticles) : deletePage(selectedPages);
                break;
            case 2: publishArticle(selectedArticles, true);
                break;  
            case 3: publishArticle(selectedArticles, false);
                break;
        }

        doAllCheck(false);
    }


    /**
     * Function for sending user to correct url if they have clicke on edit-article.
     * @param {Array<genObject>} selectedArticles Array of articles that has been marked for edit.
     *  - This function only uses the frst article in the array, as it cant send user to multiple edit-pages at once.
     *  - TODO: Consider open edit-pages in new tabs if several articles are marked...
     * @return {void}
     */
    const editArticle = (selectedArticles: Array<any>) => {
        history.push('edit-article/' + selectedArticles[0].slug);
    }


    /**
     * Delet article based on article-id.
     * @param {string} articleId Id of article to delete.
     */
    const deleteArticle = async (articleArray: Array<IArticle>) => {

        for await (let article of articleArray) {
            //Deletes article in back-end.
            const response = await handleDeleteArticle(article.id, setAllArticles);

            //Check for errors.
            if(isError(response)) {
                setMessage(`En feil oppstod ved sletting av artikkel med ` + 
                    `navn "${article.title}".`);
                return;
            } 

            //Alert user that article is deleted.
            setMessage(`Artikkelen med navn "${article.title}" ble slettet.`);
        }
    }


    /**
     * Updates publish-field of article to true or false.
     * @param {IArticle} article IArticle-object.
     * @param {boolean} publish State to set publish-field to.
     * @return {Promise<void>}
     */
    const publishArticle = async (
        articleArray: Array<IArticle>, 
        publish: boolean
    ): Promise<void> => {

        for await (let article of articleArray) {
            //Check if article already has set status.
            if(article.publish && publish) {
                setMessage(`Artikkel "${
                    article.title}" er allerede publisert...`);
                continue;
            } else if (!article.publish && !publish) {
                setMessage(`Artikkel "${
                    article.title}" er allerede satt som kladd...`);
                continue;
            }

            //Update articles status in back-end.
            const updateResponse: any = 
                await updateArticle(
                    article.id, 
                    {publish: publish}, 
                    setAllArticles
                );

            //Check for errors.
            if(isError(updateResponse)) {
                setMessage(`Det oppstod en feil ved endring av ` +
                    `artikkel: ${updateResponse.message}`);
                continue;
            }

            //Notify user that article was updated.
            setMessage(`Artikkel med tittel "${
                article.title}" har blitt oppdatert.`);
        }
    }


    /**
     * Function for sending user to right url when the have chosen to edit page.
     * TODO: Refactor editArticle to handle both articles and pages...
     * @param {Array<genObject>} selectedPages Array of selected pages. Only opens first item in array for edit.
     */
    const editPage = (selectedPages: Array<any>) => {
        history.push('edit-page/' + selectedPages[0].slug);
    }

    
    /**
     * Delet page based on page-id.
     * @param {string} articleId Id of article to delete.
     */
    const deletePage = async (pageArray: genObject[]) => {

        for await (let page of pageArray) {
            //Deletes article in back-end.
            const response = await handleDeletePage(page.id, setAllPages);

            //Check for errors.
            if(isError(response)) {
                setMessage(`En feil oppstod ved sletting av side med ` + 
                    `navn "${page.title}".`);
                return;
            } 

            //Alert user that article is deleted.
            setMessage(`Side med navn "${page.title}" ble slettet.`);
        }
    }


    /**
     * Resets all checkboxes.
     * @return {void}
     */
    const doAllCheck = (value: boolean) => {
        checkedItems.forEach((item: any) => {
            if(item[1]) item[1].checked = false;
        });
        
        // if(value) {
            setCheckedItems([]);
        // } else {
        //     const tharticleMode: any = [];
        //     for(let article of allArticles) {
        //         tharticleMode.push([article.id]);
        //     }
        //     setCheckedItems(tharticleMode);
        // }
    }


    /*** Return-statement ***/
    return(
        // Wrappers
        <ItemsAdminStyle theme={settings && settings.theme}>
            {articleMode
                ?   <Title2>Artikler</Title2>
                :   <Title2>Sider</Title2>
            }
            
            {/* Show actions-menu if there are any checked articles. */}
            {checkedItems.length
                ?   <ul className='checkbox-menu'>
                        {actionMenu.map((item: string, index: number) =>
                            <li 
                                key={index}
                                onClick={() => handleActionClick(
                                    index, checkedItems
                                )}
                            >
                                {item}
                            </li>
                        )}
                    </ul>
                :   null}

            {/* List of articles */}
            <ul className='article-list'>
                
                {/* Tittel-line */}
                <li className={'legends' + (articleMode ? '' : ' page-li')}>
                    
                    {/* <input 
                        type='checkbox'
                        onChange={
                            (event: any) => doAllCheck(event.target.checked)
                        }
                    /> */}<div />

                    {!articleMode 
                        ?   <h3>Sidenavn</h3>
                        :   <>
                                <h3>Artikkelnavn</h3>
                                <h3>Publisert</h3>
                                <h3>Forfatter</h3>
                                <h3>Dato</h3>
                            </>
                    }
                    <div />
                </li>

                {/* Article-list */}
                {!articleMode && !allPages.length && <li><p /><p>Ingen sider funnet...</p></li>}
                {articleMode && !allArticles.length && <li><p /><p>Ingen artikler funnet...</p></li>}
                {articleMode && allArticles && allArticles.map(
                    (article: any, index: number) => {
                        return <li key={index}>
                                
                                {/* Checkbox */}
                                <input 
                                    type='checkbox'
                                    onChange={
                                        (event: any) => 
                                            handleCheckedItem(
                                                event, article.id
                                            )
                                    } 
                                />

                                {/* Article-title */}
                                <Link to={'edit-article/' + article.slug}>
                                    <h3 
                                        className='article-title' 
                                        title={article.title}
                                    >
                                        {article.title}
                                    </h3>
                                </Link>

                                {/* Publish-status */}
                                <p>{article.publish 
                                    ? 'Publisert' 
                                    : 'Kladd'}
                                </p>

                                {/* Article-author */}
                                <p>{article.author}</p>

                                {/* Date */}
                                <p>{formatDate(article.created)}</p>
                                
                                {/* Kebab-menu */}
                                <KebabMenu 
                                    menu={actionMenu}
                                    id={article.id} 
                                    onClick={handleActionClick} 
                                />
                            </li>
                    })
                }

                {/* pages-list */}
                {!articleMode && allPages && allPages.map(
                    (page: any, index: number) => {
                        return <li key={index}  className='page-li'>
                                
                                {/* Checkbox */}
                                <input 
                                    type='checkbox'
                                    onChange={(event: any) => handleCheckedItem(event, page.id)} 
                                />

                                {/* Article-title */}
                                <Link to={'edit-page/' + page.slug}>
                                    <h3 
                                        className='article-title' 
                                        title={page.title}
                                    >
                                        {page.title}
                                    </h3>
                                </Link>
                                
                                {/* Kebab-menu */}
                                <KebabMenu 
                                    menu={actionMenu}
                                    id={page.id} 
                                    onClick={handleActionClick} 
                                />
                            </li>
                    })
                }
            </ul>

            {/* New article/page-button */}
            <Link
                className='new-button'
                to={articleMode ? '/admin/make-article' : '/admin/make-pages'}
            >
                {articleMode ? 'Lag ny artikkel' : 'Lag ny side'}
            </Link>
        </ItemsAdminStyle>
    );
}


/***** EXPORTS *****/
export default withRouter(ItemsAdmin);
