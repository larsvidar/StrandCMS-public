/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { genObject } from '../../../../interfaces/IGeneral';
import { MdExpandMore } from 'react-icons/md';


/***** STYLES *****/
const SubMenuStyle = styled.div`
    display: inline-flex;
    align-content: center;
    padding: 1em;
    position: relative;
    align-items: flex-end;

    &:hover {
        backdrop-filter: brightness(1.5);
        z-index: 100;
    }

    &:hover > .sub-menu {
        display: flex;
    }

    .sub-menu-link {
        margin: 0 .5em 0;
        color: ${props => props.theme.primaryText};
    }
    
    .sub-menu {
        display: none;  /* Flex when hover; */
        flex-direction: column;
        position: absolute;
        top: 50px;
        left: 0;
        z-index: 100;
        background: ${props => props.theme.primaryColor};
        border-radius: 0 0 5px 5px;
        border-right: solid 1px #888;
        border-bottom: solid 1px #888;
        border-left: solid 1px #888;

        .sub-menu-item {
            color: ${props => props.theme.primaryText};
            padding: 1em;

            &:hover {
                backdrop-filter: brightness(1.5);
            }
        }

    }
`;


/***** INTERFACES *****/
interface ISubMenuProps {
    baseUrl: string,
    menu: Array<any>,
    theme: genObject,
}


/***** COMPONENT-FUNCTION *****/
const SubMenu = ({baseUrl, menu, theme}: ISubMenuProps) => {

    /*** Return-statement ***/
    return(
        <SubMenuStyle theme={theme}>
            <p className='sub-menu-link' >{menu[0]}</p>
            <MdExpandMore />
            <div className='sub-menu'>
                {menu[1].map((subItem: genObject, index: number) => {
                    return (
                        <Link 
                            key={index} 
                            to={subItem.url} 
                            className='sub-menu-item'
                        >
                            {subItem.title}
                        </Link>
                    );
                })}
            </div>
        </SubMenuStyle>
    );
}


/***** EXPORTS *****/
export default SubMenu;
