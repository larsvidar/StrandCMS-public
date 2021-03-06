/***** IMPORTS *****/
import React, {useContext, useState, useEffect, SyntheticEvent, useRef} from 'react';
import styles from './SiteSettings.module.scss';
import {AppContext} from '../../../Handler/Handler';
import {isError} from '../../../Handler/actions/actions';
import {updateSettings} from '../../../Handler/actions/settingsActions';
import {Link} from 'react-router-dom';


/***** COMPONENT-FUNCTION *****/
const SiteSettings = () => {

    /*** Variables ***/
    const fallbackColors = {
        background: '#fff',
        text: '#000',
    };
    const siteSettingsRef = useRef(null);

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {setSettings, setShowLoader, setMessage} = actions || {};
    const {site, theme} = settings || {};

    /*** State ***/
    const [primaryColor, setPrimaryColor] = useState<string>(fallbackColors.background);
    const [primaryText, setPrimaryText] = useState<string>(fallbackColors.text);
    const [secondaryColor, setSecondaryColor] = useState<string>(fallbackColors.background);
    const [secondaryText, setSecondaryText] = useState<string>(fallbackColors.text);
    const [linkColor, setLinkColor] = useState<string>(fallbackColors.text);
    const [linkUnderline, setLinkUnderline] = useState<boolean>(true);


    useEffect(() => {
        if(theme) {
            setPrimaryColor(theme?.primaryColor || fallbackColors.background);
            setPrimaryText(theme?.primaryText || fallbackColors.text);
            setSecondaryColor(theme?.secondaryColor || fallbackColors.background);
            setSecondaryText(theme?.secondaryText || fallbackColors.text);
            setLinkColor(theme?.linkColor || '#00f');
            setLinkUnderline(theme?.linkUnderline === true);
        }
    //eslint-disable-next-line
    }, [theme]);


    /*** Functions ***/
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;

        const data = new FormData(target);

        const newSite = {
            siteTitle: data.get('title'),
            footer: data.get('footer'),
        };

        const newTheme = {
            primaryColor: data.get('primaryColor'),
            primaryText: data.get('primaryText'),
            secondaryColor: data.get('secondaryColor'),
            secondaryText: data.get('secondaryText'),
            linkColor: data.get('linkColor'),
            linkUnderline: linkUnderline,
        };

        setShowLoader(true);
        const update1 = await updateSettings('site', newSite);

        const update2 = await updateSettings('theme', newTheme);

        if(!isError(update1) && !isError(update2)) {
            setMessage('Innstillingene er lagret...');
            setSettings({theme: {...theme, ...newTheme}, site: {...site, ...newSite}});
        } else {
            setMessage('Feil ved lagring av innstillinger. Pr??v igjen...');
        }

        setShowLoader(false);
    };


    /*** Return-statement ***/
    return(
        <div className={styles.SiteSettings} ref={siteSettingsRef} >
            <h2>Sideinnstillinger</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex-column width-800'>
                    <fieldset className='mb1'>
                        <legend>Verdier</legend>

                        <div className='flex-column'>
                            <label className='mb-3' htmlFor='title'>
                                Sidetittel
                            </label>
                            <input 
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Tittelen p?? siden...'
                                defaultValue={site?.siteTitle || 'StrandCMS'}
                                className='mb1'
                            />
                        </div>

                        <div className='flex-column'>
                            <label className='mb-3' htmlFor='footer'>
                                Bunntekst
                            </label>
                            <input 
                                type='text'
                                id='footer'
                                name='footer'
                                placeholder='Bunnteksten p?? siden...'
                                defaultValue={site?.footer || 'Made with StrandCMS'}
                            />
                        </div>
                    </fieldset>

                    <fieldset className='mb1'>
                        <legend>Tema</legend>

                        <div className='flex-row mb1'>
                            <div className='flex-column mr1'>
                                <label className='mb-3' htmlFor='title'>
                                    Prim??rfarge
                                </label>

                                <div className='flex-row mb1'>
                                    <input 
                                        className='mr-5'
                                        type='color'
                                        id='primaryColor'
                                        name='primaryColor'
                                        value={primaryColor}
                                        onChange={(event) => setPrimaryColor(event.target.value)}
                                    />
                                    <input 
                                        type='text'
                                        id='primaryColorCode'
                                        name='primaryColorCode'
                                        value={primaryColor}
                                        onChange={(event) => setPrimaryColor(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='flex-column'>
                                <label className='mb-3' htmlFor='title'>
                                    Prim??r tekstfarge
                                </label>

                                <div className='flex-row mb1'>
                                    <input 
                                        className='mr-5'
                                        type='color'
                                        id='primaryText'
                                        name='primaryText'
                                        value={primaryText}
                                        onChange={(event) => setPrimaryText(event.target.value)}
                                    />
                                    <input 
                                        type='text'
                                        id='primaryTextCode'
                                        name='primaryTextCode'
                                        value={primaryText}
                                        onChange={(event) => setPrimaryText(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex-row'>
                            <div className='flex-column mr1'>
                                <label className='mb-3' htmlFor='title'>
                                    Sekund??rfarge
                                </label>

                                <div className='flex-row mb1'>
                                    <input 
                                        className='mr-5'
                                        type='color'
                                        id='secondaryColor'
                                        name='secondaryColor'
                                        value={secondaryColor}
                                        onChange={(event) => setSecondaryColor(event.target.value)}
                                    />
                                    <input 
                                        type='text'
                                        id='secondaryColorCode'
                                        name='scondaryColorCode'
                                        value={secondaryColor}
                                        onChange={(event) => setSecondaryColor(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='flex-column'>
                                <label className='mb-3' htmlFor='title'>
                                    Sekund??r tekstfarge
                                </label>

                                <div className='flex-row mb1'>
                                    <input 
                                        className='mr-5'
                                        type='color'
                                        id='secondaryText'
                                        name='secondaryText'
                                        value={secondaryText}
                                        onChange={(event) => setSecondaryText(event.target.value)}
                                    />
                                    <input 
                                        type='text'
                                        id='secondaryColorCode'
                                        name='secondaryColorCode'
                                        value={secondaryText}
                                        onChange={(event) => setSecondaryText(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex-row'>

                            <div className='flex-column mr1'>
                                <label className='mb-3' htmlFor='linkColor'>
                                    Link-farge
                                </label>

                                <div className='flex-row mb1'>
                                    <input 
                                        className='mr-5'
                                        type='color'
                                        id='linkColor'
                                        name='linkColor'
                                        value={linkColor}
                                        onChange={(event) => setLinkColor(event.target.value)}
                                    />
                                    <input 
                                        type='text'
                                        id='linkColorCode'
                                        name='linkColorCode'
                                        value={linkColor}
                                        onChange={(event) => setLinkColor(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='flex-column'>
                                <label htmlFor='linkUnderline'>
                                    Link-understreking
                                </label>
                                
                                <div className='flex-row mb1'>
                                    <input 
                                        id='linkUnderline'
                                        type='checkbox'
                                        checked={linkUnderline}
                                        onChange={(event) => setLinkUnderline(event.target.checked)}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <Link 
                        to='/admin/email-settings'
                        className={styles.mailButton}
                    >
                        E-post instillinger
                    </Link>


                    <input type='submit' value='Lagre endringer' />
                </div>
            </form>
        </div>
    );
};


/***** EXPORTS *****/
export default SiteSettings;
