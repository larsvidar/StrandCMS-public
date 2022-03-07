/***** IMPORTS *****/
import React, {SyntheticEvent, useContext, useEffect, useRef, useState} from 'react';
import {updateArticle, handleDeleteArticle} from '../../../Handler/actions/articlesActions';
import {genObject, IArticle} from '../../../interfaces/IGeneral';
import {handleDeletePage} from '../../../Handler/actions/pagesAction';
import {isError, formatDate} from '../../../Handler/actions/actions';
import {AdminContext} from '../AdminWrapper/AdminProvider';
import KebabMenu from '../../utils/KebabMenu/KebabMenu';
import {AppContext} from '../../../Handler/Handler';
import {Link, useNavigate} from 'react-router-dom';
import styles from './ItemsAdmin.module.scss';
import {setTheme} from '../../../Handler/actions/sActions';


/***** INTERFACES *****/
interface IItemsAdminProps {
    articleMode?: boolean,
}


/***** COMPONENT-FUNCTION *****/
const ItemsAdmin = ({articleMode = true}: IItemsAdminProps) => {

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
    const itemsAdminRef = useRef(null);
	const navigate = useNavigate();

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {setMessage} = actions || {};

    /* Admin-context */
    const adminContext = useContext(AdminContext);
    const {adminState, adminActions} = adminContext || {};
    const {allArticles, allPages} = adminState || {};
    const {setAllArticles, setAllPages} = adminActions || {};

    
    /*** State ***/
    //Array of id of marked articles.
    const [checkedItems, setCheckedItems] = useState<any[]>([]);


    /*** Effects ***/
    //Runs when theme-context updates
    // -Sets theme-values to css.
    useEffect(() => {
        if(theme) setTheme(theme, itemsAdminRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * EVENT: Handle click on article-checkbox.
     * @param {Event} event Event-object.
     * @param {string} articleId The id of checked article.
     * @return {void} Push or remove article-id from state.
     */
    const handleCheckedItem = (event: SyntheticEvent, itemId: string) => {
        event.persist();
        const target = event.target as genObject;
        //Check if checkbox was checked or unchecked.
        const isChecked = target.checked;

        //If it was checked, push article-id to checkedItems...
        if(isChecked) {
            setCheckedItems([...checkedItems, [itemId, event.target]]);
        
        //...else remove article-id form checkedItems-array. 
        } else {
            const newCheckedItems = checkedItems
                .filter((item) => {
                    return item[0] !== itemId;
                });
            
            setCheckedItems(newCheckedItems);
        }
    };


    /**
     * EVENT: Handles click on action-menu-items.
     * @param {number} index Index-number of chosen menu-item.
     * @param {string} id Article-id who menu belongs to.
     * @return {Promise<void>} 
     *  - Promise (because async) that resolves to nothing.
     */
    const handleActionClick = (index: number, id: string[]) => {

        //Make array of ids
        const idArray = id.map((item) => item[0]);

        //Find selected article.
        const selectedArticles = allArticles
            .filter((article) => idArray.includes(article.id));

        const selectedPages = allPages
            .filter((page) => idArray.includes(page.id));
        
  
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

        doAllCheck();
    };


    /**
     * Function for sending user to correct url if they have clicked on edit-article.
     * @param {Array<genObject>} selectedArticles Array of articles that has been marked for edit.
     *  - This function only uses the first article in the array, as it cant send user to multiple edit-pages at once.
     *  - TODO: Consider open edit-pages in new tabs if several articles are marked...
     * @return {void}
     */
    const editArticle = (selectedArticles: IArticle[]) => {
        navigate('edit-article/' + selectedArticles[0].slug);
    };


    /**
     * Delet article based on article-id.
     * @param {string} articleId Id of article to delete.
     * @return {void}
     */
    const deleteArticle = async (articleArray: Array<IArticle>) => {

        for await (const article of articleArray) {
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
    };


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

        for await (const article of articleArray) {
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
            const updateResponse = 
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
    };


    /**
     * Function for sending user to right url when the have chosen to edit page.
     * TODO: Refactor editArticle to handle both articles and pages...
     * @param {Array<genObject>} selectedPages Array of selected pages. Only opens first item in array for edit.
     */
    const editPage = (selectedPages: genObject[]) => {
        navigate('edit-page/' + selectedPages[0].slug);
    };

    
    /**
     * Delet page based on page-id.
     * @param {string} articleId Id of article to delete.
     */
    const deletePage = async (pageArray: genObject[]) => {

        for await (const page of pageArray) {
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
    };


    /**
     * Resets all checkboxes.
     * @return {void}
     */
    const doAllCheck = () => {
        checkedItems.forEach((item) => {
            if(item[1]) item[1].checked = false;
        });

        setCheckedItems([]);
    };


    /*** Return-statement ***/
    return(
        // Wrappers
        <div className={styles.itemsAdmin} ref={itemsAdminRef}>
            {articleMode
                ?   <h2>Artikler</h2>
                :   <h2>Sider</h2>
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
                    (article, index) => {
                        return <li key={index}>
                                
                                {/* Checkbox */}
                                <input 
                                    type='checkbox'
                                    onChange={(event) => handleCheckedItem(event, article.id)} 
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
                            </li>;
                    })
                }

                {/* pages-list */}
                {!articleMode && allPages && allPages.map(
                    (page, index) => {
                        return <li key={index}  className='page-li'>
                                
                                {/* Checkbox */}
                                <input 
                                    type='checkbox'
                                    onChange={(event) => handleCheckedItem(event, page.id)} 
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
                            </li>;
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
        </div>
    );
};


/***** EXPORTS *****/
export default ItemsAdmin;
