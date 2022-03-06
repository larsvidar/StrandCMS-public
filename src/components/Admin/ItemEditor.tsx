/***** IMPORTS *****/
import React, {useContext, useState, useEffect} from 'react';
import {isError, stringifyLink, sortObjectArray} from '../../Handler/actions/actions';
import {uploadeFile, articlesObj} from '../../Handler/FireBase/firebaseHandler';
import {updatePage, handleCreatePage} from '../../Handler/actions/pagesAction';
import {genObject, IHistory, IArticle} from '../../interfaces/IGeneral';
import {updateArticle} from '../../Handler/actions/articlesActions';
import {styleValues, Form, BaseClass} from '../../styles/general';
import {AdminContext} from './AdminWrapper/AdminProvider';
import Loader from '../utils/ShowLoader/Loader/Loader';
import {withRouter, Link} from 'react-router-dom';
import {AppContext} from '../../Handler/Handler';
import * as base from '../../Handler/values';
import {locale} from '../../locales/locale';
import styled from 'styled-components';
import {Editor} from "@tinymce/tinymce-react";


/***** GLOBAL VARIABLES *****/
const values = styleValues;
const varb = values.makeArticle;
const loc: genObject = locale('ItemEditor');


/***** STYLES *****/
const ItemEditorStyle = styled(BaseClass)`
    margin: 2em;
    padding-bottom: 2em;

    h2 {
        margin-bottom: ${varb.formGap};
    }

    .image {
        width: 100px;
    }

    .contact {
        
        label {
            margin-right: 1em;
        }

        select {
            padding: .3em .5em;
        }
    }


    .item-url {
        display: flex;
        margin: 1em 0;
        font-size: 1.1em;


        .item-url-title {
            font-weight: 600;
            margin-right: .5em;
        }

        .item-url-string {
            font-style: italic;

            :hover {
                text-decoration: underline;
            }
        }
    }
    
    .grayed-out {

        input, label {
            color: #888;
        }

        input {
            background: #ddd; 
        }

    }

`;


/***** INTERFACES *****/
interface IItemEditorProps extends IHistory {
    editMode?: boolean,
    articleMode?: boolean,
}


/***** COMPONENT-FUNCTION *****/
const ItemEditor = ({editMode = false, articleMode=true, match, history}: IItemEditorProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {setMessage, setShowLoader, setArticles} = actions || {};
    
    
    /* Admin-Context */
    const adminContext = useContext(AdminContext);
    const {adminState, adminActions} = adminContext || {};
    const {allArticles, allPages} = adminState || {};
    const {setAllArticles, setAllPages} = adminActions || {};


    /*** State ***/
    const [editItem, setEditItem]: any = useState({});
    const [createdDate, setCreatedDate]: any = useState(0);
    const [textContent, setTextContent] = useState('');
    const [contactValue, setContactValue] = useState('none');
    const [show, setShow] = useState(false);


    /*** Variables ***/
    const url = `${base.values.baseUrl}/${articleMode ? 'news' : 'page'}/${editItem.slug}`;
    const toUrl = `/${articleMode ? 'news' : 'page'}/${editItem.slug}`;


    /*** Effects ***/
    
    //Show loader and cleanup
    useEffect(() => {
        //Set showLoader when app is loaded.
        if(setShowLoader) setShowLoader(true);

        //Remove showLoader when component unloads.
        return () => {
            if(setShowLoader) setShowLoader(false);
        }
    //eslint-disable-next-line
    }, []);

    
    //Find right article or page from url-slug
    useEffect(() => {
        //Checking that functions are available
        if(setShowLoader) {
            //If this is an article, check allArticles-state...
            if(articleMode) {
                if(editMode && allArticles?.length) {
                    const slug = match.params.article;
                    const slugArticle = allArticles.filter((article: any) => {
                        return article.slug === slug;
                    })[0];

                    setEditItem(() => {
                        setShowLoader(false);
                        return slugArticle;
                    });
                }

            //...else this is a page, so check allPages-state.
            } else {
                if(editMode && allPages?.length) {
                    const slug = match.params.page;
                    const slugPage = allPages.filter((page: any) => {
                        return page.slug === slug;
                    })[0];
        
                    setEditItem(slugPage);
                    setShowLoader(false);
                }
            }
        }
    //eslint-disable-next-line
    }, [allArticles, allPages]);


    //If this is an article and it is in edit-mode, get date and richtext-html.
    useEffect(() => {
        if(editItem && editItem.created) {
            if(articleMode) {
                const articleDate = new Date(editItem.created);
                const inputDate = articleDate.toISOString().slice(0,10);
                setCreatedDate(inputDate);
            }
            setTextContent(editItem.article);
            setContactValue(editItem.contact);
        }
    //eslint-disable-next-line
    }, [editItem]);


    /*** Functions ***/

    /**
     * Function for saving files uploaded from TinyMCE
     * @param {Function} callback Callback-funtion which delivers info about saved image to TinyMCE
     * @return {void} Sets image-info to local state, where it is picked up by callback-funtion. 
     */
    const filePicker: Function = async (callback: any) => {

        //Checking that required functions are available.
        if(!setMessage) return;
        
        const fileInput = document.createElement('INPUT');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('name', 'image');
        fileInput.setAttribute('multiple', 'true');

        const resultArray: Array<any> = [];

        const getFile = async (event: any) => {
            
            const files = event.target.files;

            for(let file of files) {
                if(file.size) {
                    const fileResponse: any = articleMode
                            ? await uploadeFile(file, 'article/' + file.name)
                            : await uploadeFile(file, 'page/' + file.name);

                    if(isError(fileResponse)) {
                        setMessage('Error while saving file: ', fileResponse);
                        return;
                    }

                    resultArray.push(fileResponse);
                }
            }

            callback(resultArray[0], {alt: 'imagetext'});
            setShow(false);
        }

        fileInput.addEventListener('change', getFile);

        setShow(true);
        fileInput.click(); 
    }


    /**
     * 
     */
    const handleTextChange = (event: any) => {
        setTextContent(event.target.getContent());
    }

    
    /**
     * EVENT: Handles submitting the article.
     * @param {Event} event Form event-object.
     * @return {void} Saves article to back-end.
     */
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        event.persist();

        //Checking that required functions are available from Context.
        if(setMessage && setAllArticles && setAllPages && setArticles) {

            //Make new FormDate-object.
            const data = new FormData(event.target);

            const slug = data.get('slug')
                ? data.get('slug')
                : !articleMode
                    ? stringifyLink(data.get('title') as string)
                    : stringifyLink(data.get('title') as string) + '-' + Date.now();

            //Make a postData-object with form-data.
            const postData: any = {
                title: data.get('title'),
                article: textContent,
                contact: data.get('contact'),
                slug: slug,
            };

            if(articleMode) {
                postData.lead = data.get('lead');
                postData.author = data.get('author');
                postData.publish = !!data.get('publish');
            }

            if(data.get('menuParent')) postData.menuParent = data.get('menuParent');
            if(data.get('menuTitle')) postData.menuTitle = data.get('menuTitle');

            if(!postData.title) {
                setMessage('Tittel må fylles ut...');
            }

            const newDate = new Date(data.get('date') as string);

            if(newDate && articleMode) postData.created = newDate.valueOf();


            //Save article to back-end.
            const response: any = articleMode
                ?   editMode 
                        ? await updateArticle(editItem.id, postData, setAllArticles)
                        : articlesObj.create(postData)
                            .then((thisArticle: IArticle) => {
                                setArticles((prevArticles: IArticle[]) => { 
                                    sortObjectArray([...prevArticles, thisArticle], 'created', 'desc')
                                })
                            })
                :   editMode 
                        ? await updatePage(editItem.id, postData, setAllPages)
                        : await handleCreatePage(postData, setAllPages);


            //Check for error.
            if(!response || isError(response)) {
                console.log('Det oppstod en feil: ', response && response.message);
                return;
            }
        
            //Notify user that image was successfully saved.
            editMode
                ? setMessage('Artikkel med id: "' + editItem.id + '" er oppdatert.')
                : setMessage('Artikkelen er lagret med id: "' + response.id + '".')
            
            //Reset form.
            if(!editMode) {
                event.target.reset();
            }

            history.push(articleMode ? '/admin/article-list/' : '/admin/pages-list/');
        }
    }



    /*** Program ***/

    //TinuMCE-config
    const tinyKey = 'thb5nl0qm94e2u045el0g5u04xg9jqm7ziah3w5fyxxc558q';
    const tinyConfig = {
        //selector: 'textarea',
        height: 500,
        menubar: false,
        plugins: [
            'advlist autolink lists link image imagetools', 
            'charmap print preview anchor help',
            'searchreplace visualblocks code autosave',
            'insertdatetime media table paste wordcount'
        ],
        toolbar:
        //eslint-disable-next-line
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist table outdent indent | image | preview',
        autosave_interval: "10s",
        autosave_restore_when_empty: true,
        autosave_retention: "3600m",
        autosave_ask_before_unload: true,
        autosave_prefix: "tinymce-autosave-{path}{query}-{id}-",
        //file_picker_callback: filePicker as Function,
        image_caption: true,
    }


    /*** Return-statement ***/
    if(!setShowLoader) return null;
    return(
        <ItemEditorStyle theme={theme}>
            {show && <Loader />}
            <h2>
                {articleMode
                    ? editMode 
                        ? 'Rediger artikkel'
                        : loc.title
                    : editMode
                        ? 'Rediger side'
                        : 'Ny Side'
                }
            </h2>
            <Form theme={theme}><form onSubmit={handleSubmit}>
                
                {articleMode && 
                    <div className='flex-row justify-between align-center mb1'>
                        
                        {/* Publish-checkbox (for article-mode) */} 
                        <div className='flex-row align-center'>
                            <input
                                className='mr1'
                                type='checkbox' 
                                id='publish' 
                                name='publish'
                                defaultChecked={editMode ? editItem?.publish : false}
                            />
                            <label htmlFor='publish' >
                                {loc.labels.publish}
                            </label>
                        </div>

                        {/* Author-field (for article-mode) */} 
                        <div >
                            <label className='mr1' htmlFor='author' >
                                {loc.labels.author}
                            </label>
                            <input 
                                type='text' 
                                id='author' 
                                name='author'
                                defaultValue={editMode ? editItem && editItem.author : ''}  
                            /> 
                        </div>
                    </div>
                }

                {/* Created-field (for edit-articles) */} 
                {createdDate && articleMode
                    ?   <div>
                            <label htmlFor='date' >{loc.labels.date}</label>
                            <input 
                                type='date' 
                                id='date' 
                                name='date'
                                defaultValue={createdDate}  
                            /> 
                        </div>
                    :   null
                }

                {/* Title-field */} 
                <div className='flex-column' >
                    <label className='mb-3' htmlFor='title' >
                        {loc.labels.title}
                    </label>
                    <input 
                        className='mb1'
                        type='text' 
                        id='title' 
                        name='title' 
                        required
                        defaultValue={editMode ? editItem && editItem.title : ''} 
                    />

                    {/* Lead-field (for articles) */} 
                    {articleMode && <>
                        <label className='mb-3' htmlFor='lead' >
                            {loc.labels.lead}
                        </label>
                        <textarea
                            className='height-100 mb1' 
                            id='lead' 
                            name='lead'
                            defaultValue={editMode ? editItem && editItem.lead : ''}  
                        />
                    </>}

                    {/* TinyMCE-Editor */}
                    <div className='mb2'>
                        <label className='mb-3' htmlFor='article' >
                            {articleMode ? loc.labels.article : 'Tekst'}
                        </label>

                        <Editor
                            apiKey={tinyKey}
                            value={textContent}
                            init={tinyConfig}
                            onChange={handleTextChange}
                        />
                    </div>

                    {/* Menu for adding contact-form */}
                    <div className='contact mb2'>
                        <label htmlFor='contact' >Legg til kontaktskjema: </label>
                            <select 
                                id="contact" 
                                name='contact' 
                                value={contactValue}
                                onChange={(event: any) => setContactValue(event.target.value)}
                            >
                                <option value="none" style={{color: 'gray'}}>Ingen</option>
                                <option value="member" >Medlem</option>
                                <option value="contact" >Kontakt</option>
                                <option value="info" >Info</option>
                            </select>                          
                    </div>

                    {/* Add to menu */
                    !articleMode &&
                        <div>
                            <label htmlFor='menuParent' >Legg til på meny: </label>
                            <input
                                className='m1'
                                type='text' 
                                id='menuParent' 
                                name='menuParent'
                                defaultValue={editItem?.menuParent}
                                placeholder='Skriv inn meny-seksjon...'
                            />

                            <input
                                type='text' 
                                id='menuTitle' 
                                name='menuTitle'
                                defaultValue={editItem.menuTitle ? editItem.menuTitle : editItem.title}
                                placeholder='Navn i meny (legges til automatisk...)'
                            /> 
                        </div>
                    }

                    {/* Slug-field (only shows for articles) */}
                    <div className='flex-column mb1 grayed-out' >
                        <label htmlFor='slug' >{loc.labels.slug}</label>
                        <input
                            type='text' 
                            id='slug' 
                            name='slug'
                            defaultValue={editMode ? editItem && editItem.slug : ''}
                        />  
                    </div>

                    {editMode &&
                        <div className='item-url'>
                            <p className='item-url-title'>Nettadresse: </p>
                            <Link className='item-url-string' to={toUrl} target='_blank' >{url}</Link>                            
                        </div>
                    }
                    
                    {/* Submit-button */}
                    <input 
                        type='submit' 
                        className='submit' 
                        value={loc.labels.submit}
                    />

                </div>
            </form></Form>       
            {!editMode && setShowLoader(false)}       
        </ItemEditorStyle>
    );
}


/***** EXPORTS *****/
export default withRouter(ItemEditor);
