/***** IMPORTS *****/
import { useContext, useEffect } from 'react';
import { AppContext } from '../../../Handler/Handler';


/***** INTERFACES *****/
interface IShowLoaderProps {};


/***** COMPONENT-FUNCTION *****/
const ShowLoader = () => {

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


    //Cleanup. When compnent demounts, set showLoader to false.
    useEffect(() => {
        
        return () => {
            if(setShowLoader) setShowLoader(false)
        };
    //eslint-disable-next-line
    }, []);
    

    /*** Return-statement ***/
    return null;
}


/***** EXPORTS *****/
export default ShowLoader;
