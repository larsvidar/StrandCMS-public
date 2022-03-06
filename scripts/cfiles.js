/**************************************************
 *   Cfiles is a script for creating all files    *
 *   that is required for making a component      *
 *   in a React project with typescript and sass. *
 *                                                *
 *   Based of the name of the component given as  *
 *   an argument on the command-line, the script  *
 *   will create a folder, and place a component  *
 *   tsx-file, an interface tsx-file, and a       *
 *   scss style-file.                             *
 *                                                *
 **************************************************/

 
/***** IMPORTS *****/
const fs = require('fs');


/***** VARIABLES *****/
const args = process.argv.slice(2);  //Places all commandline arguments in an array (cutting away the two first default items).
const folder = './src/components'; //Folder where the new component should be placed.


/***** FUNCTIONS *****/

/**
 * Function for generate content for the .tsx file.
 * @param {string} baseFilename - The base name to create all filenames from.
 * @return {string} - The content to fill the file with. 
 */
function generateTSXContent(baseFilename) {
    const IProps = `I${baseFilename}Props`
    const SCSSModule = `${baseFilename}.module.scss`

    return (
`/***** IMPORTS *****/
import React, {FC, useContext, useEffect, useRef} from 'react';
import styles from './${SCSSModule}';
import {AppContext} from '../../Handler/Handler';
import {setTheme} from '../../Handler/actions/sActions';


/***** INTERFACES *****/
interface ${IProps} {}


/***** COMPONENT-FUNCTION *****/
const ${baseFilename}: FC<${IProps}> = (): JSX.Element => {

    /*** Context ***/
    const context = useContext(AppContext);
    const {state, actions} = context || {};
    const {settings} = state || {};
    const {theme} = settings || {};
    const {getLoc} = actions || {};


    /*** Variables ***/
    const ${baseFilename.toLowerCase()}Ref = useRef<any | null>(null);
    const loc = getLoc('${baseFilename.toLowerCase()}');


    /*** Efects ***/

    //Runs when theme-context update.
    // -Sets value from theme to SCSS-file.
    useEffect(() => {
        if(theme) setTheme(theme, ${baseFilename.toLowerCase()}Ref)
    }, [theme]);

    
    /*** Return-statement ***/
    return(
        <div className={styles.${baseFilename}} ref={${baseFilename.toLowerCase()}Ref} >
            <p>Content of this new component goes here!</p>
        </div>
    );
}


/***** EXPORTS *****/
export default ${baseFilename};
`
);}


function generateTestFile(baseFilename) {
    return `import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import ${baseFilename} from './${baseFilename}';
import {BrowserRouter, Route} from 'react-router-dom';

let container: any = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});
    
afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('Renders ${baseFilename} without crashing', () => {
    render(<BrowserRouter>
        <Route render={() => <${baseFilename} />} />
    </BrowserRouter>, container);
});`
}


/**
 * Function for generate content for the SCSS-module.
 * @param {string} baseFilename - The base name to create all filenames from.
 * @return {string} - The content to fill the file with. 
 */
function generateSCSSModule(baseFilename) {
    return (
`@import '../../styles/general.scss';

.${baseFilename} {
    --primaryColor: white;
    --primaryText: black;
}`
    );}


/**
 * Function for handeling errors in fs-operations
 * @param {object} error - The error-object returned from the operation.
 * @param {string} errorMessage (optional) - Message to display in case of error.
 * @param {string} successMessage (optional) - Message to display if operation is successfull.
 * @return {void} (Prints out to console directly).
 */
function fsStatus(error, errorMessage = "Error executing operation.", successMessage = "Operation executed successfully") {
    if(error) {
        console.log(errorMessage);
    } else {
        console.log(successMessage);
    }
}


/***** PROGRAM *****/

//Making a folder for the component
fs.mkdir(`${folder}/${args[0]}`, (error) => {
    fsStatus(error, error);
});

//Make .tsx file in folder
fs.writeFile(`${folder}/${args[0]}/${args[0]}.tsx`, generateTSXContent(args[0]), (error) => {
    fsStatus(error);
});

//Make SCSS-module file in folder
fs.writeFile(`${folder}/${args[0]}/${args[0]}.module.scss`, generateSCSSModule(args[0]), (error) => {
    fsStatus(error);
});

//Make test file in folder
fs.writeFile(`${folder}/${args[0]}/${args[0]}.test.tsx`, generateTestFile(args[0]), (error) => {
    fsStatus(error);
});
