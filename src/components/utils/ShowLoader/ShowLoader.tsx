/***** IMPORTS *****/
import {FC, useContext, useEffect} from 'react';
import {AppContext} from '../../../Handler/Handler';


/***** COMPONENT-FUNCTION *****/
const ShowLoader: FC = (): null => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {showLoader} = state || {};
    const {setShowLoader} = actions || {};


    /*** Effects ***/

    //If showLoader is false or undefined, set showLoader to true.
    useEffect(() => {
        if(!showLoader && setShowLoader) {
            //setShowLoader(true);
        }

    //eslint-disable-next-line
    }, [showLoader]);


    //Cleanup. When component demounts, set showLoader to false.
    useEffect(() => {
        
        return () => {
            if(setShowLoader) setShowLoader(false);
        };
    //eslint-disable-next-line
    }, []);
    

    /*** Return-statement ***/
    return null;
};


/***** EXPORTS *****/
export default ShowLoader;
