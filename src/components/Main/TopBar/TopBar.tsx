///***** IMPORTS *****/
import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import {AppContext} from '../../../Handler/Handler';
import Menu from './Menu/Menu';
import logo from '../../../images/logo.png'
import {Link} from 'react-router-dom';
import {IBaseProps} from '../../../interfaces/IGeneral';
import ShowLoader from '../../utils/ShowLoader/ShowLoader';
import Simg from '../../utils/Simg/Simg';
import {FaBars} from 'react-icons/fa'
import {BaseClass} from '../../../styles/general';


/***** STYLES *****/
const TopBarStyle = styled(BaseClass)` 
    width: 100%;
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryText};

    .dark-gradient {
        & > * {
            margin: 0 auto;
        }
    }

    .bar {
        position: relative;
        height: 80px;
        padding: 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        z-index: 1000;
    }

    .logo {
        display: flex;
        align-items: flex-end;
        height: 80%;
        z-index: 100;
        max-width: 77%;
        margin-bottom: 1em;

        img {
            height: 40px;
            width: 40px;
            filter: brightness(.8);
            mix-blend-mode: screen;
            margin: 0 1em 0 0;
        }
        

        a {
            max-width: 100%;

            .title {
                color: white;
                font-size: 1.5em;
                margin: 0 1em -3px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

            }
        }
    }

    .hamburger {
        display: none;
        color: white;
        font-size: 2em;
    }

    .expand-menu {
        position: absolute;
        top: 80px;
        right: 0;
        padding-right: 1em;
        background: ${props => props.theme.secondaryColor};
        flex-direction: column;
        z-index: 10;

        .menu-link {
  
        }

        .sub-menu {
            background: ${props => props.theme.secondaryColor};
            width: 110%;
            top: 0;
            left: -150px;
            border-radius: 3px;
            padding-right: 10px;

            .sub-menu-item {
                
            }
        }
    }

    @media(max-width: 1000px) {
        .menu {
            display: none;
        }

        .hamburger {
            display: block;
            margin-bottom: 16px;
            cursor: pointer;
        }
    }

    @media(max-width: 900px) {
        .bar {
            margin-left: 4em;
            margin-right: 4em;
        }
    }

    @media(max-width: 550px) {
        .logo {
            a {
                .title {
                    font-size: 6vw;
                }
            }
        }
    }

    @media(max-width: 360px) {
        .logo {
            max-width: 68%;
        }
    }


    @media(max-width: 300px) {
        .logo {
            a {
                .title {
                    display: none;
                }
            }
        }
    }
`;


/***** INTERFACES *****/
interface ITopBarProps extends IBaseProps {}


/***** COMPONENT-FUNCTION *****/
const TopBar = ({className}: ITopBarProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme, site} = settings || {};
    //const site = settings && settings.site;


    /*** State ***/
    const [showMenu, setShowMenu] = useState(false);


    const handleBurgerClick = () => {
        setShowMenu((prevState: boolean) => !prevState);
        let num = 0;
        window.onclick = () => {
            num++
            if(num > 1) {
                setShowMenu(false);
                window.onclick = null;
            }
        }
    }


    if(!settings) return <ShowLoader />;

    /*** Return-statement ***/
    return(
        <TopBarStyle className={className} theme={theme} >
            <div className='dark-gradient'>
                <div className='container'>
                    <div className='bar'>
                        <div className='logo'>
                            <Simg src={logo} alt='logo'/>
                            <Link to='/'>
                                <h1 className='title'>{site?.siteTitle}</h1>
                            </Link>
                        </div>

                        <Menu className='menu' />
                        <FaBars className='hamburger' onClick={handleBurgerClick} />
                        {showMenu && <Menu className='expand-menu' />}
                    </div>
                </div>
            </div>
        </TopBarStyle>
    );
}


/***** EXPORTS *****/
export default TopBar;
