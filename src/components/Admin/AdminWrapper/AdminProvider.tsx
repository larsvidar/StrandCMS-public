/***** IMPORTS *****/
import React, {useState, useEffect, useContext} from 'react';
import {IArticle} from '../../../interfaces/IGeneral';
import {AppContext} from '../../../Handler/Handler';
import {IAdminContext, IAdminState, IAdminActions} from '../../../interfaces/IAdmin';
import {articlesHandler} from '../../../Handler/collectionActions/articlesHandler';


/***** CONTEXT *****/
export const AdminContext = React.createContext<IAdminContext>({} as IAdminContext);


/***** INTERFACES *****/
interface IAdminProviderProps {
    children: any,
}


/***** COMPONENT-FUNCTION *****/
const AdminProvider = (props: IAdminProviderProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {pages} = state || {};
    const {setPages} = actions || {};

    /*** State ***/
    const [allArticles, setAllArticles] = useState<IArticle[]>([]);

    //Make state-object.
    const adminState: IAdminState = {
        allArticles,
        allPages: pages || [],
    };

    //Make actions-object.
    const adminActions: IAdminActions = {
        setAllArticles,
        setAllPages: setPages || function(){/*Empty*/},
    };

    
    /*** Effects ***/

    //Get all articles and set them to state.
    useEffect(() => {
        articlesHandler.read().then((thisArticles: IArticle[]) => setAllArticles(thisArticles));
    }, []);


    /*** Return-statement ***/
    return(
        <AdminContext.Provider value={{
            adminState, adminActions
        }} >
            {props.children}  
        </AdminContext.Provider>
    );
};


/***** EXPORTS *****/
export default AdminProvider;
