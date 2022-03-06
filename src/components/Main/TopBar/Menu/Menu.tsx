/***** IMPORTS *****/
import React, {useContext, FC} from 'react';
import {genObject, IBaseProps} from '../../../../interfaces/IGeneral';
import {AppContext} from '../../../../Handler/Handler';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import SubMenu from './SubMenu';


/***** STYLES *****/
const MenuStyle = styled.div`
    display: flex;
    margin: 0;
    align-items: flex-end;

    .menu-link {
        color: ${props => props.theme.primaryText};
        padding: 1em;
        margin: 0;
        align-self: flex-end;

        &:hover {
            backdrop-filter: brightness(1.5);
        }
    }
`;


/***** INTERFACES *****/
interface IMenuProps extends IBaseProps {
    baseUrl?: string,
};


/***** COMPONENT-FUNCTION *****/
const Menu: FC<IMenuProps> = ({baseUrl = '/', className}: IMenuProps): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings, menu} = state || {};
    const {theme} = settings || {};


    /*** Program ***/
    //Mapping out menu
    const menuObject: genObject = {};
    
    menu?.forEach((thisItem: genObject) => {
        if(thisItem.menuParent) {
            menuObject[thisItem.menuParent] = menuObject[thisItem.menuParent] 
                ? [...menuObject[thisItem.menuParent], thisItem] 
                : [thisItem];
        } else {
            menuObject[thisItem.title] = thisItem;
        }
    });

    const mapMenu = Object.entries(menuObject);


    /*** Return-statement ***/
    return(
        <MenuStyle theme={theme} className={className}>
            
            {/* Mapping out LI-elements */}
            {mapMenu.map((menuEntry: Array<any>, index: number) => {

                if(!Array.isArray(menuEntry[1])) { 
                    return  <Link key={index} className='menu-link' to={menuEntry[1].url}>
                        {menuEntry[1].title}
                    </Link>
                } else {
                    return <SubMenu
                        key={index}
                        baseUrl={baseUrl}
                        menu={menuEntry}
                        theme={theme}
                    />

                }
            })}
        </MenuStyle>
    );
}


/***** EXPORTS *****/
export default Menu;
