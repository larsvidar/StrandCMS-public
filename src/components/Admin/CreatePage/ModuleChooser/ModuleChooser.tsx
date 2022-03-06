/***** IMPORTS *****/
import React, {SyntheticEvent, useContext, useEffect, useRef} from 'react';
import styles from './ModuleChooser.module.scss';
import {AppContext} from '../../../../Handler/Handler';
import {genUid, isError} from '../../../../Handler/actions/actions';
import PullDownMenu from '../../../utils/PullDownMenu/PullDownMenu';
import {getModule, setTheme} from '../../../../Handler/actions/sActions';
import {genObject, IBaseProps} from '../../../../interfaces/IGeneral';
import {ISModule} from '../CreatePage';


/***** INTERFACES *****/
interface IModuleChooserProps extends IBaseProps {
    getComponent: FGetComponent,
}

export type FGetComponent = (newModule: ISModule | Error) => void;


/***** COMPONENT-FUNCTION *****/
const ModuleChooser = ({getComponent, className}: IModuleChooserProps) => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};


    /*** Variables ***/
    const moduleChooserRef = useRef(null);
    const nativeComponents = [
        'Title',
        'Lead',
        'Byline',
        'Text',
        'MediumTitle',
        'Image',
        'Contact-form',
    ];
    const moduleIndex = useRef(0);
    const moduleChooserClass = className
        ? styles.ModuleChooser + ' ' + className
        : styles.ModuleChooser;


    /*** Effects ***/

    //Runs each time theme-context updates.
    // -Sets values from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, moduleChooserRef);
    }, [theme]);


    /*** Functions ***/

    /**
     * Gets selected module and sends it to parent with getComponent-function
     * @param {Event} event Event-object from PullDownMenu
     * @return {void} Sends IModule-object back to parent.
     */
    const handleModuleSelect = async (event: SyntheticEvent) => {
        const target = event.target as genObject;
        const title: string = target.value;
        const Module = await getModule(title);
        if(!Module) return getComponent(Error('No component found'));
        if(isError(Module)) return getComponent(Error('No component found'));
        
        const id = genUid(5);
        const index = moduleIndex.current++;
        const sModule: ISModule = {id, index, title, Module};
        getComponent(sModule);
    };

    
    /*** Return-statement ***/
    return(
        <div className={moduleChooserClass} ref={moduleChooserRef}>
            <div className={styles.selector}>
                <p className={styles.add}>+</p>
                <PullDownMenu items={nativeComponents} onChange={handleModuleSelect} />
            </div>
        </div>
    );
};


/***** EXPORTS *****/
export default ModuleChooser;
