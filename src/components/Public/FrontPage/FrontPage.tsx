/***** IMPORTS *****/
import React, {useEffect, useRef} from 'react';
import styles from './FrontPage.module.scss';
import FixedImage from '../../utils/FixedImage/FixedImage';
import LastPosts from '../News/LastPosts/LastPosts';
import ArticleList from '../News/ArticleList/ArticleList';
import { setTheme } from '../../../Handler/actions/sActions';



/***** COMPONENT-FUNCTION *****/
const FrontPage = () => {

    /*** Variables ***/
    const HERO_HEIGHT = '350px';
    const frontPageRef = useRef(null);

    const image = 'https://firebasestorage.googleapis.com/v0/b/strandcms.appspot.com/o/hero.jpg?alt=media&token=24884f57-b5cf-41ba-aa74-bf0d2809b507';


    /*** Effects ***/
    useEffect(() => {
        const thisTheme = {heroHeight: HERO_HEIGHT};
        if(frontPageRef.current) setTheme(thisTheme, frontPageRef);
    }, []);


    /*** Return-statement ***/
    return(
        <div className={styles.FrontPage} ref={frontPageRef} >
            <FixedImage className={styles.hero} src={image} height={HERO_HEIGHT} />
            <div className={styles.content}>
                <ArticleList />
                <LastPosts className={styles.latestPosts} />
            </div>
        </div>
    );
};



/***** EXPORTS *****/
export default FrontPage;
